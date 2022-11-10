<template>
  <ul>
    <li v-for="(item, index) in catalog" :key="index">
      <template v-if="item.hasOwnProperty('items')">
        <h3>{{ item.text }}</h3>
        <ul>
          <li v-for="(i, n) in item.items" :key="n">
            <a :href="normalizeLink(i.link)">{{ i.text }}</a>
          </li>
        </ul>
      </template>
      <a v-else :href="normalizeLink(item.link)">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js';
import { useData } from 'vitepress';
const data = useData();
const path = data.page.value.relativePath.replace('index.md', '');
const catalog = data.theme.value.sidebar[`/${path}`][0]['items'];
</script>