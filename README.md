# 奇蹟 30

> 30 天心靈轉化之旅：從覺察、寬恕到豐盛，轉換知見擁抱奇蹟

🌐 **網站**: [miracle30.live](https://miracle30.live/)

## 📖 專案介紹

「奇蹟 30」是一個基於《奇蹟30》書籍內容的心靈成長網站，提供 30 天的心靈轉化課程。每天一個主題，透過覺察、實踐和音檔導讀，幫助使用者在日常生活中體驗心靈的轉化與成長。

## ✨ 主要功能

### 🎯 核心功能
- **30 天完整課程** - 每日一個心靈成長主題
- **🎙️ 音檔導讀** - 每課程配有 2-3 個錄音檔
- **🎧 自動播放** - 音檔自動連續播放功能
- **📱 自動導航** - 首頁自動跳轉到當日課程

### 📱 PWA 支援
- **離線瀏覽** - 支援離線存取已瀏覽內容
- **原生體驗** - 可安裝到主螢幕，如原生 App 般使用
- **跨平台支援** - Android、iOS、macOS 完整支援
- **自動更新** - 背景自動更新到最新版本

### 🎨 使用者體驗
- **響應式設計** - 完美支援手機、平板、電腦
- **深色/淺色主題** - 自動根據系統偏好切換
- **中文字型優化** - 使用 jf-openhuninn 字型提升閱讀體驗
- **直覺式導航** - 清晰的課程目錄和導航結構

## 📚 內容結構

### 課程內容
```
day/
├── 1/          # 第 1 天：我覺察我所說的一切
├── 2/          # 第 2 天：我留意我所聽到的一切
├── 3/          # 第 3 天：我覺察我所看見的一切
├── ...
├── 30/         # 第 30 天：著眼於你所擁有的
└── guide/      # 使用說明
```

### 每日課程包含
- **主題課文** - 當日的心靈成長主題
- **今日功課** - 實際的練習和觀照重點
- **肯定語意** - 正面的自我肯定句
- **導讀文章** - 深度的概念解析和案例分享
- **音檔內容** - 2-3 個相關音檔

## 🛠️ 本地開發

### 環境需求
- Hugo
- Git

### 安裝步驟
```bash
git clone https://github.com/watain666/m30 --recursive 
cd m30
hugo server -D
```

## 🎨 自訂功能

### Shortcodes
- `{{< audio "path/to/audio.m4a" >}}` - 嵌入音檔播放器
- `{{< site-url >}}` - 動態顯示網站 URL

### 樣式自訂
- 針對中文內容優化的字型和行距
- 深色模式適配
- 響應式斷點設計
- 音檔播放器樣式自訂

### JavaScript 功能
- 自動跳轉到當日課程
- 音檔自動播放邏輯
- 主題切換功能
- PWA 安裝提示

## 📄 版權與聲明

### 使用條款
- **性質**: 非營利性質網站
- **內容來源**: 引用自《奇蹟30》相關資料，版權歸原作者所有
- **用途**: 僅供學術交流與個人學習使用
- **商業使用**: 請勿用於任何商業用途

### 致謝
- **內容提供**: 《奇蹟30》原作者
- **音檔錄製**: 特別感謝枝枝的錄音貢獻
- **技術支援**: Hugo 社群和相關開源專案

### 支持原作
若您喜歡這些課程內容，請支持購買《奇蹟30》書籍，以支持作者與相關單位的持續推廣。

## 📞 聯絡資訊

如有任何問題、建議或技術支援需求，歡迎直接發 issue

## 🛠️ Development

### Requirements
- Hugo
- Git

### Installation Steps
```bash
git clone https://github.com/watain666/m30 --recursive 
cd m30
hugo server -D
```

## 🏗️ Tech Stack

### Framework & Themes
- [Hugo](https://gohugo.io/) - Static site generator
- [hugo-book](https://github.com/alex-shpak/hugo-book) - Main layout and styling theme
- [hugo-shortcode-roneo-collection](https://github.com/RoneoOrg/hugo-shortcode-roneo-collection) - Icon and component support

### Frontend Technologies
- [SCSS](https://sass-lang.com/) - CSS preprocessor for modular CSS management
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Interactive features and PWA support
- [Plyr.js](https://plyr.io) - High-quality video/audio player
- Service Worker - Caching strategy and offline support
