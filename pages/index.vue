<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
let allThreads = ref([]);

let page = parseInt(localStorage.getItem("thread-list-page")) || 1;
let topPage = page - 1;
let bottomPage = page;
let threadOrigUrl;

const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`
let loading = true;

const load = async ($state, isTop) => {
  console.log("loading...");

  if(isTop){
    page = topPage;
  }else{
    page = bottomPage;
  }
  try {
    localStorage.setItem("thread-list-page", page);
    threadOrigUrl = getApiThreadList(6, page);

    const response = await fetch(threadOrigUrl);
    const data = await response.json();
    console.log(data);

    // There are 50 threads in one page if it's not end
    if (data.Variables.forum_threadlist < 50 ) {
      $state.complete();
    } else {
      if(isTop){
        allThreads.value.unshift(data.Variables.forum_threadlist);
        topPage = page - 1;
      }else{
        allThreads.value.push(data.Variables.forum_threadlist);
        bottomPage = page + 1;
      }
      $state.loaded();
      loading = false;
    }
  } catch (error) {
    $state.error();
  }
}


</script>

<template>
  <div class="m-4 text-slate-600 flex flex-col items-center" >
    <InfiniteLoading v-if="topPage > 0 && !loading" top=true @infinite="load($event, true)" />
    <div class="flex flex-col items-center border-b-2 w-full" v-for="block in allThreads">
      <div v-for="thread in block">
        <a :href="getThreadLink(thread)">{{ thread.subject }}&nbsp;&nbsp;<b>{{ thread.replies }}</b></a>
      </div>
      <hr>
    </div>
    <InfiniteLoading @infinite="load($event, false)" />
  </div>
  
</template>