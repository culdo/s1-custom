<script setup>
import {parseHTML} from 'linkedom'

const route = useRoute();
const isShowImg = ref(false);

const postOrigUrl = `https://www.saraba1st.com/2b/thread-${route.params.id}-${route.params.page}-1.html`;
const { data, pending, refresh } = await useAsyncData(
  async () => {
    const res = await fetch(postOrigUrl);
    const text = await res.text();
    const dom = parseHTML(text);
    const posts = dom.window.document.querySelectorAll("[id^=post_]");
    
    let preprcPosts = [];
    posts.forEach((post) => {
      if(post.hasChildNodes()) {
        let postMsg = post.querySelector("[id^=postmessage_]");
        if(postMsg) {
          // fill src by file url
          postMsg.querySelectorAll("img[id^=aimg_]").forEach((img) => {
            img.src = img.getAttribute("file");
            img.style.display = "none";
          })
          preprcPosts.push(postMsg);
        }
      }
    });
    return preprcPosts
  }
)

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
  data.value.forEach(postMsg => {
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
    <div class="border-2 my-2" v-for="post in data">
      <!-- {{ post.content }} -->
      <div v-html="post.innerHTML"> 
      </div>
    </div>
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