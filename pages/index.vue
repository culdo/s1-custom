<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
let allThreads = ref([]);

const pageNum = ref(parseInt(localStorage.getItem("thread-list-page")) || 1);
let scrollTopPage = pageNum.value - 1;
let scrollBottomPage = pageNum.value;
let threadListUrl;

const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`
let loading = true;

const response = await fetch(apiGetForums);
const data = await response.json();
const totalThreads = parseInt(data.Variables.forumlist[1].threads);

const threadsPerPage = 50;

const load = async ($state, isTop=false) => {
  console.log("loading...");
  loading = true;

  if(isTop){
    pageNum.value = scrollTopPage;
  }else{
    pageNum.value = scrollBottomPage;
  }
  try {
    localStorage.setItem("thread-list-page", pageNum.value);
    threadListUrl = getApiThreadList(6, pageNum.value);

    const response = await fetch(threadListUrl);
    const data = await response.json();

    if(isTop){
      allThreads.value.unshift(data.Variables.forum_threadlist);
      scrollTopPage = pageNum.value - 1;
    }else{
      allThreads.value.push(data.Variables.forum_threadlist);
      scrollBottomPage = pageNum.value + 1;
    }

    // There are 50 threads in one page if it's not end
    if (data.Variables.forum_threadlist < threadsPerPage ) {
      $state.complete();
    } else {
      $state.loaded();
    }
    loading = false;
  } catch (error) {
    $state.error();
  }
}

function jumpToPage(e) {
  pageNum.value = parseInt(e.target.value);
  scrollTopPage = pageNum.value - 1;
  scrollBottomPage = pageNum.value;
  allThreads.value = [];
}

</script>

<template>
  <div class="m-4 text-slate-600">
    <Menu>
      <input :value="pageNum" @input="jumpToPage" type="range" class="slider menu-item" min="1" :max="Math.ceil(totalThreads/threadsPerPage)" />
      <input :value="pageNum" @input="jumpToPage" type="number" class="menu-item"/>
    </Menu>
    <div class="m-4 text-slate-600 flex flex-col items-center" >
      <InfiniteLoading v-if="allThreads.length > 0 && scrollTopPage > 0 && !loading" top=true @infinite="load($event, true)" />
      <div class="flex flex-col items-center border-b-2 w-full" v-for="page in allThreads">
        <div v-for="thread in page">
          <a :href="getThreadLink(thread)">{{ thread.subject }}&nbsp;&nbsp;<b>{{ thread.replies }}</b></a>
        </div>
        <hr>
      </div>
      <InfiniteLoading @infinite="load($event)" />
    </div>
  </div>
  
</template>