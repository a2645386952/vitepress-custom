---
layout: custom
aside: false

hero:
  name: Vitepress-Custom
  text: Custom
  tagline: Simple and Customizable
  image:
    src: /static/logo.svg
    alt: myLogo
  actions:
    - theme: brand
      text: Example
      link: https://huyikai.xyz
features:
  - icon: ⚙️
    title: Auto
    details: 根据目录自动生成导航栏和侧边栏(支持多级目录)
  - icon: 🖋
    title: Focus
    details: 专注于内容创作&整理
  - icon: 🛠
    title: Custom
    details: 如果你还是想花点时间定制
---

## Usage
```shell
npm install vitepress-custom
```

<script setup>
  import {useData} from 'vitepress';
  import test from "@theme"
</script>