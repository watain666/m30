# GitHub Release Notes Template

Use this template for every GitHub Release in this repository. The canonical
format is the existing `v0.1.14` Release.

## Required format

- Set the Release title to the exact tag only, for example `v0.1.26`.
- Write the Release body in English.
- Start the body with a `What's New` heading.
- Determine the heading range from the previous published GitHub Release, not
  merely the previous Git tag:
  - Use `## What's New in vX.Y.Z` when the preceding tag also has a published
    GitHub Release.
  - Use `## What's New in vA.B.C - vX.Y.Z` when intermediate tags do not have
    published GitHub Releases, and include the full cumulative change set.
- Use sections in this order: `Added`, `Changed`, `Fixed`, `Removed`.
- Omit empty sections.
- Start each bullet with an action verb and do not add a trailing period.
- Keep technical literals, paths, versions, and product names exact.
- Do not add verification, deployment, test-result, or internal process
  sections to the public Release note.
- Editing a Release title or body must not move or recreate its existing tag.

## Body template

For one version:

```markdown
## What's New in vX.Y.Z

### Added
- Describe an added user-facing capability

### Changed
- Describe a changed behavior or maintained dependency

### Fixed
- Describe a corrected defect or content issue

### Removed
- Describe a removed capability or obsolete configuration
```

For a cumulative Release, replace the first heading with:

```markdown
## What's New in vA.B.C - vX.Y.Z
```

## Source checklist

Before writing the note:

1. Find the previous published GitHub Release with `gh release list`.
2. Review `CHANGELOG.md` for every included version.
3. Review the actual range with `git log <previous-release-tag>..<release-tag>`.
4. Add notable changes missing from `CHANGELOG.md`, then remove duplicate items.
5. Confirm the title is the exact tag and the body follows the section order
   above.
6. Validate the completed note before publishing:

   ```bash
   make release-notes-check \
     RELEASE_TAG=vX.Y.Z \
     PREVIOUS_RELEASE_TAG=vA.B.C \
     RELEASE_TITLE=vX.Y.Z \
     RELEASE_NOTES_FILE=/path/to/completed-release-notes.md
   ```

   `PREVIOUS_RELEASE_TAG` must be the preceding published GitHub Release.
   `RELEASE_TITLE` must exactly match `RELEASE_TAG`. The checker derives the
   expected single-version or cumulative heading from the Git tags in that
   range. Both tags must exist locally; fetch tags before checking when needed.
   Use `RELEASE_NOTES_FILE=-` to read the note from standard input.

   The checker enforces metadata, range, headings, section order, bullet shape,
   placeholders, and punctuation. English wording, action verbs, and change-set
   accuracy remain review requirements.

## Publish or edit

Create a Release from an existing tag:

```bash
gh release create vX.Y.Z \
  --verify-tag \
  --title vX.Y.Z \
  --notes-file /path/to/completed-release-notes.md
```

Edit an existing Release without changing its tag:

```bash
gh release edit vX.Y.Z \
  --title vX.Y.Z \
  --notes-file /path/to/completed-release-notes.md
```

Verify the published result:

```bash
gh release view vX.Y.Z \
  --json tagName,name,body,isDraft,isPrerelease,url
```
