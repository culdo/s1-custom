<script setup>
const JSDOM = require('jsdom').JSDOM; 

const { data, pending, refresh } = await useAsyncData(
  async () => {
    const res = await fetch(
      'https://www.saraba1st.com/2b/forum-6-1.html'
    )
    const text = await res.text()
    const dom = new JSDOM(text);
    const content = dom.window.document.body.innerHTML;
    console.log(content)
    return content
  }
)

</script>

<template>
  <div v-html="data">
  </div>
</template>