# vitepress-plugin-sidebar

## Brief

Automatic generate the navigation bar based on the file directory

## Dependence

Need dependence on `vitepress-plugin-fetch-docs` library. `vitepress-plugin-fetch-docs ` used to get all documents.

## Usage

```shell
npm install vitepress-plugin-fetch-docs vitepress-plugin-sidebar
```

```js
// docs/.vitepress/config.js
import docsData from 'vitepress-plugin-fetch-docs' // return promise
import sidebar from 'vitepress-plugin-sidebar'
async ()=>{
  let docs = await docsData()
  themeConfig:{
    // Pass docs as parameter to the nav method
    sidebar: sidebar(docs)
  }
}
```

