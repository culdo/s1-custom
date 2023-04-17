<script setup>
import InfiniteLoading from "v3-infinite-loading";
let allThreads = ref([]);

const config = useRuntimeConfig()

let page = 1;
let threadOrigUrl;

const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`

const load = async $state => {
  console.log("loading...");

  try {
    threadOrigUrl = getApiThreadList(6, page);
    
    const response = await fetch(threadOrigUrl);
    const data = await response.json();
    console.log(data);

    allThreads.value.push(...data.Variables.forum_threadlist);

    // There are 50 threads in one page if it's not end
    if (data.Variables.forum_threadlist < 50) {
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
  <div class="m-4 text-slate-600">
    <div class="flex justify-center" v-for="thread in allThreads">
      <a :href="getThreadLink(thread)">{{ thread.subject }}&nbsp;&nbsp;<b>{{ thread.replies }}</b></a>
    </div>
    <InfiniteLoading @infinite="load" />
  </div>
  
</template>