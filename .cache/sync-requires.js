
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/src/pages/404.js")),
  "component---src-pages-about-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/src/pages/about.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/src/pages/index.js")),
  "component---src-templates-blog-template-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/src/templates/blog-template.js")),
  "component---src-templates-category-template-js": preferDefault(require("/Users/gyuwonlee/Desktop/gyutato.github.io/src/templates/category-template.js"))
}

