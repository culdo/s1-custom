<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
let allThreads = ref([]);

let pageNum = parseInt(localStorage.getItem("thread-list-page")) || 1;
let scrollTopPage = pageNum - 1;
let scrollBottomPage = pageNum;
let threadOrigUrl;

const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`
let loading = true;

const load = async ($state, isTop=false) => {
  console.log("loading...");

  if(isTop){
    pageNum = scrollTopPage;
  }else{
    pageNum = scrollBottomPage;
  }
  try {
    localStorage.setItem("thread-list-page", pageNum);
    threadOrigUrl = getApiThreadList(6, pageNum);

    const response = await fetch(threadOrigUrl);
    const data = await response.json();
    console.log(data);

    if(isTop){
      allThreads.value.unshift(data.Variables.forum_threadlist);
      scrollTopPage = pageNum - 1;
    }else{
      allThreads.value.push(data.Variables.forum_threadlist);
      scrollBottomPage = pageNum + 1;
    }

    // There are 50 threads in one page if it's not end
    if (data.Variables.forum_threadlist < 50 ) {
      $state.complete();
    } else {
      $state.loaded();
    }
    loading = false;
  } catch (error) {
    $state.error();
  }
}


</script>

<template>
  <div class="m-4 text-slate-600 flex flex-col items-center" >
    <InfiniteLoading v-if="scrollTopPage > 0 && !loading" top=true @infinite="load($event, true)" />
    <div class="flex flex-col items-center border-b-2 w-full" v-for="page in allThreads">
      <div v-for="thread in page">
        <a :href="getThreadLink(thread)">{{ thread.subject }}&nbsp;&nbsp;<b>{{ thread.replies }}</b></a>
      </div>
      <hr>
    </div>
    <InfiniteLoading @infinite="load($event)" />
  </div>
  
</template>