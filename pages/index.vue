<script setup>
import {parseHTML} from 'linkedom'
import InfiniteLoading from "v3-infinite-loading";
let allThreads = ref([]);

const config = useRuntimeConfig()

let page = 1;
let threadOrigUrl;

const load = async $state => {
  console.log("loading...");

  try {
    threadOrigUrl = `https://www.saraba1st.com/2b/forum-6-${page}.html`
    
    const response = await fetch(threadOrigUrl);
    const text = await response.text();
    const dom = parseHTML(text);
    
    const threads = dom.window.document.querySelectorAll("[id^=normalthread]")
    console.log(threads)
    let procedThreads = []
    threads.forEach(thread => {
      procedThreads.push({
        title: thread.querySelector("a.s.xst").textContent,
        link: thread.querySelector("a.s.xst").href.split(".html")[0],
        repliesNum: thread.querySelector(".xi2").textContent,
      })
    })
    allThreads.value.push(...procedThreads);

    // one page has 50 threads - 2 pinned threads
    if (procedThreads.length < 48) {
      $state.complete();
    } else {
      $state.loaded();
    }
    page++;
  } catch (error) {
    $state.error();
  }
}


</script>

<template>
  <div class="m-4 text-slate-600 text-center">
    <div class="flex" v-for="thread in allThreads">
      <a class="w-4/5" :href="config.urlBase + '2b/'+thread.link">{{ thread.title }}</a>
      <div class="w-1/5">{{ thread.repliesNum }}</div>
    </div>
    <InfiniteLoading @infinite="load" />
  </div>
  
</template>