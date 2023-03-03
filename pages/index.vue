<script setup>
const JSDOM = require('jsdom').JSDOM; 

const { data, pending, refresh } = await useAsyncData(
  async () => {
    const res = await fetch(
      'https://www.saraba1st.com/2b/forum-6-1.html'
    )
    const text = await res.text()
    const dom = new JSDOM(text);
    const threads = dom.window.document.querySelectorAll("[id^=normalthread]");
    
    let data = [];
    threads.forEach(thread => {
      data.push({
        title: thread.querySelector("a.s.xst").textContent,
        link: thread.querySelector("a.s.xst").href,
        repliesNum: thread.querySelector(".xi2").textContent,
      })
    });
    console.log(data);
    return data
  }
)

</script>

<template>
  <div v-for="thread in data">
    <div class="flex">
      <a :href="thread.link">{{ thread.title }}</a>
      <div>{{ thread.repliesNum }}</div>
    </div>
    <!-- <div v-html="thread.innerHTML"> -->
    <!-- </div> -->
  </div>
</template>