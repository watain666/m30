.PHONY: update-version build

# Get current version and bump it
update-version:
	@echo "Bumping version..."
	@CURRENT_VERSION=$$(git describe --tags --abbrev=0 2>/dev/null); \
	if [ -z "$$CURRENT_VERSION" ]; then \
		echo "Error: No version tag found"; \
		exit 1; \
	fi; \
	if [[ $$CURRENT_VERSION =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$$ ]]; then \
		MAJOR=$${BASH_REMATCH[1]}; \
		MINOR=$${BASH_REMATCH[2]}; \
		PATCH=$${BASH_REMATCH[3]}; \
		NEW_PATCH=$$((PATCH + 1)); \
		NEW_VERSION="v$${MAJOR}.$${MINOR}.$${NEW_PATCH}"; \
		echo "Current version: $$CURRENT_VERSION"; \
		echo "New version: $$NEW_VERSION"; \
		sed -i.bak "s/Version = '.*'/Version = '$$NEW_VERSION'/" hugo.toml; \
		rm -f hugo.toml.bak; \
		git add hugo.toml; \
		git commit -m "Bump version to $$NEW_VERSION"; \
		git push origin master; \
		git tag $$NEW_VERSION; \
		git push origin $$NEW_VERSION; \
		echo "Version updated to: $$NEW_VERSION"; \
		echo "Changes committed and tag created"; \
	else \
		echo "Error: Invalid version format, expected format: v0.1.1"; \
		exit 1; \
	fi

# build website
build: update-version
	hugo --minify

# develop server
dev: update-version
	hugo server --disableFastRender

# clean build files
clean:
	rm -rf public/
	rm -rf resources/_gen/
