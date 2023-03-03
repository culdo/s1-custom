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
        link: thread.querySelector("a.s.xst").href.split(".html")[0],
        repliesNum: thread.querySelector(".xi2").textContent,
      })
    });
    // console.log(data);
    return data
  }
)

</script>

<template>
  <div class="m-4 text-slate-600 text-center">
    <div class="flex" v-for="thread in data">
      <a class="w-4/5" :href="'/2b/'+thread.link">{{ thread.title }}</a>
      <div class="w-1/5">{{ thread.repliesNum }}</div>
    </div>
  </div>
  
</template>