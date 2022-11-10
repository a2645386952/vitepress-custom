---
layout: home

hero:
  name: vitepress-custom
  text: vitepress-custom
  tagline: vitepress-custom
  image:
    src: /static/logo.svg
    alt: myLogo
  actions:
    - theme: brand
      text: About Me
      link: about.md
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


<script setup>
  import {useData} from 'vitepress';
  console.log(useData())
</script>