# vitepress-plugin-fetch-docs

## Brief

Get all the contents of the vitepresss document.

will return a promise.

## Usage

```shell
npm install vitepress-plugin-fetch-docs
```

```js
// docs/.vitepress/config.js
import docsData from 'vitepress-plugin-fetch-docs'
async ()=>{
  let docs = await docsData()
  // do something with 'docs'
}
```

