<script setup>
import InfiniteLoading from "v3-infinite-loading";

if(localStorage.getItem("sid") === undefined) {
  navigateTo("/login")
}

let allPosts = ref([]);

const route = useRoute();
const isShowImg = ref(false);

const threadKey = `thread-${route.params.id}-page`;

const pageNum = ref(parseInt(localStorage.getItem(threadKey) || route.params.page));

let scrollTopPage = pageNum.value - 1;
let scrollBottomPage = pageNum.value;
let loading = true;
let totalReplies;

let threadOrigUrl = apiWebUrl + `thread-${route.params.id}-${pageNum.value}-${route.params.threadListPage}.html`

const load = async ($state, isTop=false) => {
  console.log("loading...");
  
  if(isTop){
    pageNum.value = scrollTopPage;
  }else{
    pageNum.value = scrollBottomPage;
  }
  try {
    localStorage.setItem(threadKey, pageNum.value);

    let formData = new FormData();
    formData.append('sid', localStorage.getItem("sid"));
    formData.append('tid', route.params.id);
    formData.append('pageNo', pageNum.value);

    const response = await fetch(apiPostList, {
      method: "POST",
      credentials: 'include',
      body:formData,
    });
    const data = await response.json();
    totalReplies = data.data.totalCount;
    
    if(data.code == 501) {
      navigateTo("/login")
    }

    console.log(data)
    if(isTop){
      allPosts.value.unshift(data.data.list);
      scrollTopPage = pageNum.value - 1;
    }else{
      allPosts.value.push(data.data.list);
      scrollBottomPage = pageNum.value + 1;
    }

    // There are 30 posts in one page if it's not end
    if (data.data.list.length < 30) {
      $state.complete();
    } else {
      $state.loaded();
    }

    loading = false;

  } catch (error) {
    console.log(error);
    $state.error();
  }
}

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
}

</script>

<template>
  <div class="m-4 text-slate-600">
    <Menu>
      <input v-model="pageNum" type="range" class="slider menu-item" min="1" :max="Math.floor(totalReplies/30)+1" />
      <input v-model="pageNum" type="number" class="menu-item"/>
      <a :href="threadOrigUrl" target="_blank" class="
                    menu-item
                    hover:bg-blue-400
                    hover:text-blue-100">Original Post</a>
      <button @click="toggleShowImg" class="
            menu-item
            hover:bg-blue-400
            hover:text-blue-100">{{ isShowImg ? "Hide" : "Show" }} Img</button>
    </Menu>
    <InfiniteLoading v-if="scrollTopPage > 0 && !loading" top=true @infinite="load($event, true)" />
    <div class="border-b-2 w-full" v-for="page in allPosts">
      <div class="my-6" v-for="post in page">
        <div class="my-1 flex gap-2 font-medium">
          <a :href="apiBaseUrl + post.authorid" target="_blank">{{ post.author }}</a>
          <div>{{ getPostDate(post.dateline) }}</div>
          <div class="ml-auto">#{{ post.position }}</div>
        </div>
        <div class="post" :class="[isShowImg ? '' : 'hideImg']" v-html="post.message">
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="load" />
  </div>
</template>

<style>
img {
  display: inline;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 0.5rem 1.0rem;
  text-align: left;
}

img[id^=aimg_] {
  width: 800px;
}

.hideImg img[id^=aimg_], .hideImg img[src^="https://img.saraba1st.com/"]{
  display: none;
}

</style>