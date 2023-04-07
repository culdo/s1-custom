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
    threadOrigUrl = apiBaseUrl + `index.php?module=forumdisplay&version=4&filter=typeid&tpp=&fid=6&page=${page}`
    
    const response = await fetch(threadOrigUrl);
    const data = await response.json();
    const dom = parseHTML(text);
    
    const threads = dom.window.document.querySelectorAll("[id^=normalthread_],[id^=stickthread_]")
    let procedThreads = []
    threads.forEach(thread => {
      procedThreads.push({
        title: thread.querySelector("a.s.xst").textContent,
        link: thread.querySelector("a.s.xst").href.split(".html")[0],
        repliesNum: thread.querySelector(".xi2").textContent,
      })
    })
    allThreads.value.push(...procedThreads);

    // There are 50 threads in one page
    if (procedThreads.length < 50) {
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