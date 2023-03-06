<script setup>
import {parseHTML} from 'linkedom'

const route = useRoute();
const isShowImg = ref(false);
function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
}

const postOrigUrl = `https://www.saraba1st.com/2b/thread-${route.params.id}-${route.params.page}-1.html`;
const { data, pending, refresh } = await useAsyncData(
  async () => {
    const res = await fetch(postOrigUrl);
    const text = await res.text();
    const dom = parseHTML(text);
    const posts = dom.window.document.querySelectorAll("[id^=post_]");
    
    let data = [];
    posts.forEach((post, i) => {
      if(post.hasChildNodes()) {
        let postMsg = post.querySelector("[id^=postmessage_]");
        post.querySelectorAll("img[id^=aimg_]").forEach((img) => {
          img.src = img.getAttribute("file");
        })
        if(postMsg) {
          data.push(postMsg)
        }
      }
    });
    return data
  }
)

</script>

<template>
  <div class="m-4 text-slate-600">
    <a :href="postOrigUrl" target="_blank" >Orignal Post</a>
    <button @click="toggleShowImg">{{ isShowImg.value }} Img</button>
    <div class="flex border-2 my-2" v-for="post in data">
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