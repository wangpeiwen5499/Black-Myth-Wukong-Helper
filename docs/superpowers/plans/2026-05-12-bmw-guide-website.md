# 黑神话：悟空攻略站 MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal：** 构建黑神话悟空攻略站 MVP，包含首页、第一章攻略页、Boss 列表页、3 个 Boss 详情页、404 页，中英双语，暗黑东方美学。

**Architecture：** 多页纯静态站点，所有页面共享一套 CSS 和 JS。导航栏、页脚作为 HTML 片段嵌入各页。语言切换通过 `data-lang` 属性 + JS 显隐实现。无构建工具，双击即可预览。

**Tech Stack：** HTML5, CSS3 (Flexbox + Grid), 原生 JavaScript, Google Fonts CDN

**设计文档：** `docs/superpowers/specs/2026-05-12-bmw-guide-website-design.md`

---

## 文件结构

```
D:\code\Black myth Wukong\
├── index.html                    # 首页
├── 404.html                      # 404 错误页
├── css/
│   └── style.css                 # 全局样式（配色、排版、组件、响应式）
├── js/
│   └── main.js                   # 公共逻辑（导航、语言切换、移动端菜单）
├── walkthrough/
│   └── chapter-1.html            # 第一章：火照黑云
├── bosses/
│   ├── index.html                # Boss 列表页
│   ├── wandering-wight.html      # 游僧
│   ├── elder-jinchi.html         # 金池长老
│   └── black-bear-spirit.html   # 黑熊精
└── images/
    └── (占位图，通过 CSS gradient/SVG 生成)
```

---

## Task 1：全局样式基础（CSS Reset + 配色 + 排版）

**Files:**
- Create: `css/style.css`

- [ ] **Step 1：创建 CSS 基础文件**

创建 `css/style.css`，包含以下内容：

```css
/* ============================================
   CSS Reset & Base
   ============================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', 'Noto Sans SC', -apple-system, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', Helvetica, sans-serif;
  background-color: #0a0a0a;
  color: #e8e0d0;
  line-height: 1.7;
  min-height: 100vh;
}

/* Skip to main content (a11y) */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: #c9a84c;
  color: #0a0a0a;
  padding: 0.5rem 1rem;
  z-index: 1000;
  font-weight: 600;
}
.skip-link:focus {
  top: 0;
}

/* ============================================
   Typography
   ============================================ */
h1, h2, h3, h4 {
  font-family: 'Cinzel', 'Noto Serif SC', 'Georgia', 'SimSun', 'Times New Roman', 'STSong', serif;
  color: #e8e0d0;
  line-height: 1.3;
}

h1 { font-size: 2.5rem; letter-spacing: 0.02em; }
h2 { font-size: 1.8rem; }
h3 { font-size: 1.3rem; }
h4 { font-size: 1.1rem; }

p { margin-bottom: 1rem; }
a {
  color: #c9a84c;
  text-decoration: none;
  transition: color 0.2s;
}
a:hover { color: #e0c06a; }

ul, ol { padding-left: 1.5rem; }
li { margin-bottom: 0.4rem; }

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ============================================
   CSS Variables
   ============================================ */
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --accent-gold: #c9a84c;
  --accent-red: #8b2500;
  --text-primary: #e8e0d0;
  --text-secondary: #9a9080;
  --border-color: #2a2520;
  --gold-glow: 0 0 20px rgba(201, 168, 76, 0.15);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

- [ ] **Step 2：验证 CSS 文件语法正确**

在浏览器中打开一个引用该 CSS 的 HTML 文件，检查 DevTools Console 无 CSS 解析错误。

---

## Task 2：导航栏组件（HTML 结构 + CSS 样式）

**Files:**
- Modify: `css/style.css`（追加导航栏样式）
- Reference: 后续所有 HTML 页面复用此结构

- [ ] **Step 1：在 `css/style.css` 末尾追加导航栏样式**

```css
/* ============================================
   Navigation Bar
   ============================================ */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.95);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  font-family: 'Cinzel', 'Georgia', serif;
  font-size: 1.3rem;
  color: var(--accent-gold);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.navbar__links {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.navbar__links a {
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: color var(--transition-fast);
}
.navbar__links a:hover {
  color: var(--accent-gold);
}

/* Language Toggle */
.lang-toggle {
  display: flex;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.lang-toggle__btn {
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}
.lang-toggle__btn.active {
  background: var(--accent-gold);
  color: var(--bg-primary);
  font-weight: 600;
}
.lang-toggle__btn:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: -2px;
}

/* Hamburger (mobile) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-fast);
}

/* Mobile nav */
@media (max-width: 768px) {
  .hamburger { display: flex; }

  .navbar__links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.98);
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  .navbar__links.open {
    display: flex;
  }
}
```

---

## Task 3：页脚组件（CSS 样式）

**Files:**
- Modify: `css/style.css`（追加页脚样式）

- [ ] **Step 1：在 `css/style.css` 末尾追加页脚样式**

```css
/* ============================================
   Footer
   ============================================ */
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 4rem;
}

.footer__disclaimer {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
```

---

## Task 4：公共卡片与组件样式

**Files:**
- Modify: `css/style.css`（追加卡片、星级、提示框等通用组件样式）

- [ ] **Step 1：在 `css/style.css` 末尾追加组件样式**

```css
/* ============================================
   Shared Components
   ============================================ */

/* Gold Divider */
.divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  margin: 2rem 0;
}

/* Card Base */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-gold);
  box-shadow: var(--gold-glow);
}

.card__title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-gold);
}

.card__desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Star Rating */
.stars {
  color: var(--accent-gold);
  letter-spacing: 2px;
  font-size: 0.9rem;
}
.stars .empty { opacity: 0.3; }

/* Tip Box */
.tip-box {
  background: rgba(201, 168, 76, 0.08);
  border-left: 3px solid var(--accent-gold);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 6px 6px 0;
}
.tip-box__title {
  font-weight: 600;
  color: var(--accent-gold);
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

/* Section Container */
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section__title {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}
.section__title::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  background: var(--accent-gold);
  margin: 0.8rem auto 0;
}

/* Breadcrumb */
.breadcrumb {
  padding: 1rem 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.breadcrumb a { color: var(--text-secondary); }
.breadcrumb a:hover { color: var(--accent-gold); }
.breadcrumb span { margin: 0 0.5rem; }

/* Content spacing below fixed navbar */
main {
  padding-top: 64px;
}
```

---

## Task 5：公共 JavaScript（导航 + 语言切换 + 移动端菜单）

**Files:**
- Create: `js/main.js`

- [ ] **Step 1：创建 `js/main.js`**

```javascript
/**
 * main.js - Public logic: language toggle, mobile menu, navbar behavior
 */

(function () {
  'use strict';

  // ---- Language Toggle ----
  function initLanguageToggle() {
    const savedLang = localStorage.getItem('bmw-lang');
    const browserLang = navigator.language.startsWith('zh') ? 'zh-CN' : 'en';
    const defaultLang = savedLang || browserLang;
    setLanguage(defaultLang);

    document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.dataset.lang;
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    localStorage.setItem('bmw-lang', lang);
    document.documentElement.lang = lang;

    // Toggle visibility of language elements
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      if (el.dataset.lang === lang) {
        el.style.display = '';
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Update toggle button states
    document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // ---- Mobile Hamburger Menu ----
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.navbar__links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var expanded = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Navbar scroll shadow ----
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    initLanguageToggle();
    initMobileMenu();
    initNavbarScroll();
  });
})();
```

- [ ] **Step 2：在浏览器控制台检查无报错**

创建一个最小 HTML 测试文件 `test-js.html` 验证 JS 加载无语法错误：

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>JS Test</title></head>
<body>
  <nav class="navbar">
    <div class="navbar__logo">BMW Guide</div>
    <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    <ul class="navbar__links">
      <li><a href="#">Walkthrough</a></li>
      <li>
        <div class="lang-toggle">
          <button class="lang-toggle__btn active" data-lang="en">EN</button>
          <button class="lang-toggle__btn" data-lang="zh-CN">中文</button>
        </div>
      </li>
    </ul>
  </nav>
  <div data-lang="en">English content</div>
  <div data-lang="zh-CN">中文内容</div>
  <script src="js/main.js"></script>
</body>
</html>
```

在浏览器中打开，验证：语言切换按钮工作正常、汉堡按钮在窄屏下显示并可展开。

- [ ] **Step 3：删除测试文件，提交**

```bash
rm test-js.html
git add css/style.css js/main.js
git commit -m "feat: add global CSS styles and shared JavaScript (nav, language toggle)"
```

---

## Task 6：首页（index.html）

**Files:**
- Create: `index.html`

- [ ] **Step 1：创建首页 HTML**

`index.html` 包含：导航栏、Hero 区域、章节导航（6 张卡片）、Boss 快查（3 张卡片）、新手提示横幅、页脚。所有文案均为双语（`data-lang` 标记）。

HTML 结构骨架（完整代码见实现时展开）：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Black Myth: Wukong Guide / 黑神话：悟空攻略</title>
  <meta name="description" content="Complete guide for Black Myth: Wukong...">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;600&family=Noto+Sans+SC:wght@400;600&family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- Navbar -->
  <nav class="navbar">
    <a href="index.html" class="navbar__logo">Wukong Guide</a>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="navbar__links">
      <li><a href="walkthrough/chapter-1.html"><span data-lang="en" lang="en">Walkthrough</span><span data-lang="zh-CN" lang="zh-CN" style="display:none">流程攻略</span></a></li>
      <li><a href="bosses/index.html"><span data-lang="en" lang="en">Bosses</span><span data-lang="zh-CN" lang="zh-CN" style="display:none">Boss 列表</span></a></li>
      <li>
        <div class="lang-toggle">
          <button class="lang-toggle__btn active" data-lang="en">EN</button>
          <button class="lang-toggle__btn" data-lang="zh-CN">中文</button>
        </div>
      </li>
    </ul>
  </nav>

  <main id="main">
    <!-- Hero Section -->
    <section class="hero">...</section>
    <!-- Chapter Navigation -->
    <section class="section">...</section>
    <!-- Boss Quick-Access -->
    <section class="section">...</section>
    <!-- New Player Banner -->
    <section class="section">...</section>
  </main>

  <footer class="footer">...</footer>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2：追加首页专属样式到 `css/style.css`**

```css
/* ============================================
   Homepage
   ============================================ */
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, rgba(139,37,0,0.15) 0%, rgba(10,10,10,1) 100%);
  padding: 2rem;
  position: relative;
}
.hero__title {
  font-size: 3.5rem;
  color: var(--accent-gold);
  margin-bottom: 1rem;
}
.hero__subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2rem;
}

/* Chapter Cards Grid */
.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Boss Quick-Access Grid */
.bosses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* New Player Banner */
.newbie-banner {
  background: linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(139,37,0,0.1) 100%);
  border: 1px solid var(--accent-gold);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}
```

- [ ] **Step 3：浏览器打开 `index.html` 验证**

验证项：
- 暗色背景，金色标题
- 6 张章节卡片网格排列
- 3 张 Boss 卡片
- 语言切换 EN / 中文工作正常
- 缩小窗口至手机宽度，汉堡菜单出现并可展开

- [ ] **Step 4：提交**

```bash
git add index.html css/style.css
git commit -m "feat: add homepage with hero, chapter nav, boss quick-access, bilingual"
```

---

## Task 7：第一章攻略页（walkthrough/chapter-1.html）

**Files:**
- Create: `walkthrough/chapter-1.html`
- Modify: `css/style.css`（追加攻略页样式）

- [ ] **Step 1：追加攻略页样式到 `css/style.css`**

```css
/* ============================================
   Walkthrough Page
   ============================================ */
.walkthrough-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.walkthrough-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.walkthrough-content h3 {
  margin-top: 1.5rem;
  color: var(--accent-gold);
}

/* Sidebar TOC */
.toc-sidebar {
  position: sticky;
  top: 84px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
.toc-sidebar__title {
  font-size: 0.85rem;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.8rem;
}
.toc-sidebar ul {
  list-style: none;
  padding: 0;
}
.toc-sidebar li {
  margin-bottom: 0.4rem;
}
.toc-sidebar a {
  color: var(--text-secondary);
  font-size: 0.85rem;
  display: block;
  padding: 0.2rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.8rem;
  transition: all var(--transition-fast);
}
.toc-sidebar a:hover,
.toc-sidebar a.active {
  color: var(--accent-gold);
  border-left-color: var(--accent-gold);
}

/* Mobile TOC accordion */
@media (max-width: 768px) {
  .walkthrough-layout {
    grid-template-columns: 1fr;
  }
  .toc-sidebar {
    position: static;
    max-height: none;
    display: none;
    margin-bottom: 1.5rem;
  }
  .toc-sidebar.open {
    display: block;
  }
  .toc-toggle {
    display: block;
    width: 100%;
    padding: 0.8rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: left;
    font-family: inherit;
  }
  .toc-toggle:focus-visible {
    outline: 2px solid var(--accent-gold);
  }
}
@media (min-width: 769px) {
  .toc-toggle { display: none; }
}
```

- [ ] **Step 2：创建 `walkthrough/chapter-1.html`**

HTML 结构：
- 导航栏（同首页，链接路径加 `../` 前缀）
- 面包屑：Home > Walkthrough > Chapter 1
- 双栏布局：左侧内容区 + 右侧 TOC 侧边栏
- 内容区：章节概览 → 区域1步骤 → 区域2步骤 → 区域3步骤 → 区域4步骤
- 每个区域含文字指引 + 提示框
- 全部文案双语
- 页脚

- [ ] **Step 3：浏览器验证**

验证项：
- 双栏布局正确（内容 + TOC）
- TOC 链接跳转到对应锚点
- 面包屑显示正确
- 手机端 TOC 折叠为手风琴

- [ ] **Step 4：提交**

```bash
git add walkthrough/chapter-1.html css/style.css
git commit -m "feat: add Chapter 1 walkthrough page with TOC sidebar"
```

---

## Task 8：Boss 列表页（bosses/index.html）

**Files:**
- Create: `bosses/index.html`
- Modify: `css/style.css`（追加 Boss 列表样式）

- [ ] **Step 1：追加 Boss 列表样式到 `css/style.css`**

```css
/* ============================================
   Boss List Page
   ============================================ */
.boss-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.boss-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}
.boss-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-gold);
  box-shadow: var(--gold-glow);
}

.boss-card__header {
  height: 160px;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--border-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--accent-gold);
}

.boss-card__body {
  padding: 1.2rem;
}
.boss-card__name {
  font-size: 1.1rem;
  color: var(--accent-gold);
  margin-bottom: 0.3rem;
}
.boss-card__chapter {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
```

- [ ] **Step 2：创建 `bosses/index.html`**

列出 3 个 MVP Boss（游僧、金池长老、黑熊精），每张卡片含头像占位、双语名称、所属章节、难度星级。点击跳转详情页。

- [ ] **Step 3：验证并提交**

```bash
git add bosses/index.html css/style.css
git commit -m "feat: add boss list page with 3 MVP bosses"
```

---

## Task 9：Boss 详情页模板 × 3

**Files:**
- Create: `bosses/wandering-wight.html`
- Create: `bosses/elder-jinchi.html`
- Create: `bosses/black-bear-spirit.html`
- Modify: `css/style.css`（追加 Boss 详情页样式）

- [ ] **Step 1：追加 Boss 详情页样式到 `css/style.css`**

```css
/* ============================================
   Boss Detail Page
   ============================================ */
.boss-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.boss-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.boss-header__portrait {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--border-color) 100%);
  border: 2px solid var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  flex-shrink: 0;
}
.boss-header__info h1 {
  color: var(--accent-gold);
  font-size: 2rem;
}
.boss-header__info .boss-name-cn {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: 0.3rem;
}

/* Stats Card */
.stats-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.stats-card__item {
  text-align: center;
}
.stats-card__label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stats-card__value {
  font-size: 1.1rem;
  color: var(--accent-gold);
  font-weight: 600;
  margin-top: 0.2rem;
}
.stats-card__version {
  grid-column: 1 / -1;
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-align: right;
  opacity: 0.7;
}

/* Strategy sections */
.strategy-section {
  margin-bottom: 2rem;
}
.strategy-section h2 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.phase-block {
  background: var(--bg-secondary);
  border-left: 3px solid var(--accent-gold);
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 0 6px 6px 0;
}
.phase-block__title {
  color: var(--accent-gold);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.quick-tips {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
}
.quick-tips h3 {
  color: var(--accent-gold);
  margin-bottom: 1rem;
}
.quick-tips ul {
  list-style: none;
  padding: 0;
}
.quick-tips li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}
.quick-tips li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--accent-gold);
}
```

- [ ] **Step 2：创建 `bosses/wandering-wight.html`**

Boss 详情页结构：
- 导航栏（路径前缀 `../`）
- 面包屑：Home > Bosses > Wandering Wight
- Boss 头部：头像占位 + 英文名 + 中文名
- 属性卡片：HP / 弱点 / 抗性 / 章节 / 版本标注
- 打法策略：推荐装备 + Phase 1 分析 + Phase 2 分析
- 实用技巧列表
- 全部双语
- 页脚

- [ ] **Step 3：浏览器验证 Wandering Wight 页面**

- [ ] **Step 4：复制模板创建 `bosses/elder-jinchi.html`（替换内容为金池长老数据）**

- [ ] **Step 5：复制模板创建 `bosses/black-bear-spirit.html`（替换内容为黑熊精数据）**

- [ ] **Step 6：提交**

```bash
git add bosses/ css/style.css
git commit -m "feat: add 3 boss detail pages (Wandering Wight, Elder Jinchi, Black Bear Spirit)"
```

---

## Task 10：404 错误页

**Files:**
- Create: `404.html`

- [ ] **Step 1：创建 `404.html`**

简洁错误页：导航栏 + 居中双语 404 提示 + 返回首页链接 + 页脚。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found / 页面未找到</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;600&family=Noto+Sans+SC:wght@400;600&family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- Navbar (same structure as other pages) -->
  <nav class="navbar">
    <a href="index.html" class="navbar__logo">Wukong Guide</a>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="navbar__links">
      <li><a href="walkthrough/chapter-1.html"><span data-lang="en" lang="en">Walkthrough</span><span data-lang="zh-CN" lang="zh-CN" style="display:none">流程攻略</span></a></li>
      <li><a href="bosses/index.html"><span data-lang="en" lang="en">Bosses</span><span data-lang="zh-CN" lang="zh-CN" style="display:none">Boss 列表</span></a></li>
      <li>
        <div class="lang-toggle">
          <button class="lang-toggle__btn active" data-lang="en">EN</button>
          <button class="lang-toggle__btn" data-lang="zh-CN">中文</button>
        </div>
      </li>
    </ul>
  </nav>

  <main id="main" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:2rem;">
    <h1 style="font-size:5rem;color:var(--accent-gold);margin-bottom:0.5rem;">404</h1>
    <p data-lang="en" lang="en" style="font-size:1.2rem;color:var(--text-secondary);">Page not found</p>
    <p data-lang="zh-CN" lang="zh-CN" style="font-size:1.2rem;color:var(--text-secondary);display:none;">页面未找到</p>
    <a href="index.html" style="margin-top:2rem;display:inline-block;padding:0.8rem 2rem;background:var(--accent-gold);color:var(--bg-primary);border-radius:6px;font-weight:600;">
      <span data-lang="en" lang="en">Back to Home</span><span data-lang="zh-CN" lang="zh-CN" style="display:none">返回首页</span>
    </a>
  </main>

  <footer class="footer">
    <p>Black Myth: Wukong Guide &copy; 2026</p>
    <p class="footer__disclaimer">Not affiliated with Game Science. All trademarks belong to their respective owners.</p>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2：提交**

```bash
git add 404.html
git commit -m "feat: add 404 error page"
```

---

## Task 11：全站集成测试

**Files:**
- 无新文件

- [ ] **Step 1：桌面端全页面检查（1200px+）**

验证项清单：
- [ ] 首页：Hero 显示正常、6 张章节卡片网格、3 张 Boss 卡片
- [ ] 章节卡片链接到 `walkthrough/chapter-1.html`（其余章节可暂时无链接）
- [ ] Boss 卡片链接到对应详情页
- [ ] 第一章攻略页：TOC 侧边栏 sticky、锚点跳转正确
- [ ] Boss 列表页：3 张卡片正确显示
- [ ] 3 个 Boss 详情页：属性卡片、打法策略、技巧列表正常
- [ ] 404 页面正常显示
- [ ] 所有页面语言切换 EN / 中文 正常
- [ ] 所有页面导航栏、页脚正常

- [ ] **Step 2：手机端检查（< 768px）**

验证项：
- [ ] 汉堡菜单展开/收起
- [ ] 章节卡片单列显示
- [ ] Boss 卡片单列显示
- [ ] 攻略页 TOC 折叠为手风琴
- [ ] Boss 详情页头像缩小适配

- [ ] **Step 3：键盘无障碍检查**

验证项：
- [ ] Tab 键可遍历所有导航链接和按钮
- [ ] 语言切换按钮可通过 Tab + Enter 操作
- [ ] 汉堡菜单可通过 Enter 展开/收起
- [ ] Skip-to-content 链接在首次 Tab 时出现

- [ ] **Step 4：最终提交**

```bash
git add -A
git commit -m "chore: MVP complete — full integration verified"
```

---

## 执行顺序总览

| Task | 产出 | 依赖 |
|------|------|------|
| 1 | CSS 基础 | 无 |
| 2 | 导航栏 CSS | Task 1 |
| 3 | 页脚 CSS | Task 1 |
| 4 | 通用组件 CSS | Task 1 |
| 5 | 公共 JS | 无 |
| 6 | 首页 | Task 1-5 |
| 7 | 第一章攻略页 | Task 1-5 |
| 8 | Boss 列表页 | Task 1-5 |
| 9 | 3 个 Boss 详情页 | Task 1-5 |
| 10 | 404 页 | Task 1-5 |
| 11 | 全站集成测试 | Task 6-10 |

**Task 1-5 可并行执行**（CSS 与 JS 无互相依赖，但 Task 5 的 JS 测试仅验证逻辑，不验证视觉样式）。**Task 6-10 可并行执行**（各页面独立）。

**说明：**
- **平板断点（768-1199px）**：通过 `auto-fill` / `minmax()` 的 Grid 布局自然适配平板尺寸，无需额外媒体查询。
- **SVG 云纹分隔线**：MVP 阶段使用 CSS 渐变金色分隔线（`.divider`）作为占位，云纹 SVG 在后续迭代中添加。
- **Task 6-10 HTML 完整代码**：Task 6 首页提供了骨架 HTML（导航栏、页脚完整），Hero/章节/Boss 区域的具体双语内容在实现时根据设计文档 3.1 节填充。其余页面同理，使用首页导航栏/页脚模板，按设计文档 3.2-3.4 节填充内容。
