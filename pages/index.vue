<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
let allThreads = ref([]);

const config = useRuntimeConfig()

let page = localStorage.getItem("thread-list-page") || 1;
let threadOrigUrl;

const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`

const load = async ($state, isTop) => {
  console.log("loading...");

  try {
    threadOrigUrl = getApiThreadList(6, page);
    
    const response = await fetch(threadOrigUrl);
    const data = await response.json();
    console.log(data);


    if(isTop){
      if(page > 0 || allThreads.value.length > 0 ) {
        allThreads.value.unshift(...data.Variables.forum_threadlist);
        page--;
      }
    }else{
      allThreads.value.push(...data.Variables.forum_threadlist);
      page++;
    }
    // There are 50 threads in one page if it's not end
    if (data.Variables.forum_threadlist < 50 || page < 1) {
      $state.complete();
    } else {
      $state.loaded();
      localStorage.setItem("thread-list-page", page);
    }
  } catch (error) {
    $state.error();
  }
}


</script>

<template>
  <div class="m-4 text-slate-600 flex flex-col items-center" >
    <InfiniteLoading top=true @infinite="load($event, true)" />
    <div v-for="thread in allThreads">
      <a :href="getThreadLink(thread)">{{ thread.subject }}&nbsp;&nbsp;<b>{{ thread.replies }}</b></a>
    </div>
    <InfiniteLoading @infinite="load($event, false)" />
  </div>
  
</template>