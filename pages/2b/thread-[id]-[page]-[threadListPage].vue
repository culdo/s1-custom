<script setup>
import InfiniteLoading from "v3-infinite-loading";

if(localStorage.getItem("sid") === undefined) {
  navigateTo("/login")
}

let allPosts = ref([]);

const route = useRoute();
const isShowImg = ref(false);


let page = route.params.page;
let threadOrigUrl;

const load = async $state => {
  console.log("loading...");

  try {
    threadOrigUrl = getApiPostList();

    let formData = new FormData();
    formData.append('sid', localStorage.getItem("sid"));
    formData.append('tid', route.params.id);
    formData.append('pageNo', page);

    const response = await fetch(threadOrigUrl, {
      method: "POST",
      credentials: 'include',
      body:formData,
    });
    const data = await response.json();
    
    if(data.code == 501) {
      navigateTo("/login")
    }

    console.log(data)

    allPosts.value.push(...data.data.list);

    // There are 30 posts in one page if it's not end
    if (data.data.list < 30) {
      $state.complete();
    } else {
      $state.loaded();
    }
    page++;
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
      <a :href="threadOrigUrl" target="_blank" class="
                    block
                    px-4
                    py-2
                    text-sm
                    hover:bg-blue-400 hover:text-blue-100">Original Post</a>
      <button @click="toggleShowImg" class="
            block
            px-4
            py-2
            text-sm
            hover:bg-blue-400 hover:text-blue-100">{{ isShowImg ? "Hide" : "Show" }} Img</button>
    </Menu>
    <div class="my-6" v-for="(post) in allPosts">
      <div class="my-1 flex gap-2 font-medium">
        <a :href="apiBaseUrl + post.authorid" target="_blank">{{ post.author }}</a>
        <div>{{ getPostDate(post.dateline) }}</div>
        <div class="ml-auto">#{{ post.position }}</div>
      </div>
      <div class="post" :class="[isShowImg ? '' : 'hideImg']" v-html="post.message">
      </div>
    </div>
    <InfiniteLoading @infinite="load" />
  </div>
</template>

<style>
img {
  display: inline;
}

img[id^=aimg_] {
  width: 800px;
}

.hideImg img[id^=aimg_], .hideImg img[src^="https://img.saraba1st.com/"]{
  display: none;
}

</style>