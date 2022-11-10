# vitepress-plugin-nav

## Brief

Automatic generate the navigation bar based on the file directory

## Dependence

Need dependence on `vitepress-plugin-fetch-docs` library. `vitepress-plugin-fetch-docs ` used to get all documents.

## Usage

```shell
npm install vitepress-plugin-fetch-docs vitepress-plugin-nav
```

```js
// docs/.vitepress/config.js
import docsData from 'vitepress-plugin-fetch-docs' // return promise
import nav from 'vitepress-plugin-nav'
async ()=>{
  let docs = await docsData()
  themeConfig:{
    // Pass docs as parameter to the nav method.and pass root directory of documents.
    // Assume the document directory is 'docs/contents/example/xxxx.md'
    nav: nav(docs,'contents')
  }
}
```

