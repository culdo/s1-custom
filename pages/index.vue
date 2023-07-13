<script setup>

const response = await fetch(apiGetForums);
const data = await response.json();
const totalThreads = parseInt(data.Variables.forumlist[1].threads);

const setReplies = (thread) => {
  thread.clicked = true
}

const getPrevReplies = (thread) => {
  return parseInt(localStorage.getItem(`${thread.tid}-replies`))
}

const showRepliesDiff = (thread) => {
  const replies = getPrevReplies(thread);
  if(replies) {
    const diff = parseInt(thread.replies) - replies
    if(diff < 0) {
      return `(${diff})`
    }else {
      return `(+${diff})`
    }
  }
}

async function fetcher(pageNum) {
  const threadListUrl = getApiThreadList(6, pageNum);

  const response = await fetch(threadListUrl);
  const data = await response.json();
  return [data.Variables.forum_threadlist, totalThreads];
}

</script>

<template>
  <InfLoadingPage localStorgeKey="thread-list-page" :fetcher="fetcher" :itemPerPage=50 >
    <template v-slot:content="props">
      <div class="flex flex-col items-center border-b-2 w-full" v-for="page in props.allItemList">
        <div v-for="thread in page">
          <a target="_blank" :href="getThreadLink(thread)" @click="setReplies(thread)" :class="(showRepliesDiff(thread)||thread.clicked ? 'text-slate-400' : '')" >
            {{ thread.subject }}&nbsp;&nbsp;<b class="text-emerald-800">{{ thread.replies }} {{ thread.clicked ? "(+0)" : showRepliesDiff(thread) }}</b>
          </a>
        </div>
        <hr>
      </div>
    </template>
  </InfLoadingPage>
</template>

<style>
.thread-title:visited {
  color: rgb(148 163 184);
}
</style>