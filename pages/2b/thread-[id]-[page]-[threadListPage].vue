<script setup>
import { parseHTML } from 'linkedom'
import InfiniteLoading from "v3-infinite-loading";
let allPosts = ref([]);

const route = useRoute();
const isShowImg = ref(false);


let page = route.params.page;
let threadOrigUrl;

const load = async $state => {
  console.log("loading...");

  try {
    threadOrigUrl = getApiPostList(route.params.id, page);

    const response = await fetch(threadOrigUrl, {
      credentials: 'include'
    });
    const data = await response.json();

    allPosts.value.push(...data.Variables.postlist);

    // There are 30 posts in one page
    if (data.Variables.postlist.length < 30) {
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
const instance = getCurrentInstance();

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
  console.log(allPosts.value);
  allPosts.value.forEach(post => {
    post.message.querySelectorAll("img[id^=aimg_]").forEach((img) => {
      if (isShowImg.value) {
        img.style.display = "inline";
      } else {
        img.style.display = "none";
      }
    })
  });
  instance?.proxy?.$forceUpdate();
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
        <div>{{ post.dateline }}</div>
        <div class="ml-auto">#{{ post.number }}</div>
      </div>
      <div v-html="post.message">
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
</style>