<script setup>
import {parseHTML} from 'linkedom'
import InfiniteLoading from "v3-infinite-loading";
let allPosts = ref([]);

const route = useRoute();
const isShowImg = ref(false);

const postOrigUrl = `https://www.saraba1st.com/2b/thread-${route.params.id}-${route.params.page}-1.html`;

let page = 1;
const load = async $state => {
  console.log("loading...");

  try {
    const response = await fetch(
      `https://www.saraba1st.com/2b/thread-${route.params.id}-${page}-1.html`
    );
    const text = await response.text();
    const dom = parseHTML(text);
    const posts = dom.window.document.querySelectorAll("[id^=post_]");
    
    let procedPosts = [];
    posts.forEach((post) => {
      if(post.hasChildNodes()) {
        let postMsg = post.querySelector(".plc");
        if(postMsg) {
          // fill src by file url
          postMsg.querySelectorAll("img[id^=aimg_]").forEach((img) => {
            img.src = img.getAttribute("file");
            img.style.display = "none";
          })
        }else{
          postMsg = post.querySelector(".plc");
          console.log(post);
        }
        procedPosts.push(postMsg);
      }
    });
    console.log(procedPosts);

    if (procedPosts.length < 30) {
      $state.complete();
    } else {
      allPosts.value.push(...procedPosts);
      $state.loaded();
    }
    page++;
  } catch (error) {
    $state.error();
  }
}

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
  allPosts.value.forEach(postMsg => {
    postMsg.querySelectorAll("img[id^=aimg_]").forEach((img) => {
      if(isShowImg.value){
        img.style.display = "inline";
      }else{
        img.style.display = "none";
      }
    })
  });
}

</script>

<template>
  <div class="m-4 text-slate-600">
    <div class="flex gap-4">
      <a :href="postOrigUrl" target="_blank" >Orignal Post</a>
      <button @click="toggleShowImg">{{ isShowImg ? "Hide" : "Show" }} Img</button>
    </div>
    <div class="border-2 my-2" v-for="post in allPosts">
      <!-- {{ post.content }} -->
      <div v-html="post.innerHTML"> 
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