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
    threadOrigUrl = `https://www.saraba1st.com/2b/thread-${route.params.id}-${page}-${route.params.subpage}.html`

    const response = await fetch(threadOrigUrl, {
      credentials: 'include'
    });
    const text = await response.text();
    const dom = parseHTML(text);
    const posts = dom.window.document.querySelectorAll("div[id^=post_]");

    let procedPosts = [];
    posts.forEach((post) => {
      if (post.hasChildNodes()) {
        let postMsg = post.querySelector("[id^=postmessage_]");
        let author = post.querySelector(".authi").textContent
        let postOn = post.querySelector("em[id^=authorposton]").textContent.split("发表于 ")[1]
        let quote = post.querySelector(".quote")
        if (quote) {
          quote.style.margin = "10px"
          quote.style.fontSize = "14px"
          quote.style.borderStyle = "dashed";
          quote.style.borderWidth = "thin";
          quote.style.borderColor = "DimGrey";
        }

        // Is post blocked?
        if (postMsg) {
          // fill src by file url
          postMsg.querySelectorAll("img[id^=aimg_]").forEach((img) => {
            img.src = img.getAttribute("file");
            img.style.display = "none";
          })
        } else {
          postMsg = post.querySelector(".pcb");
        }
        procedPosts.push({ msg: postMsg, author, postOn });
      }
    });
    console.log(procedPosts);

    allPosts.value.push(...procedPosts);

    // There are 30 posts in one page
    if (procedPosts.length < 30) {
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
    post.msg.querySelectorAll("img[id^=aimg_]").forEach((img) => {
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
    <div class="flex justify-end sticky top-0 z-50 gap-4">
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
    </div>
    <div class="my-6" v-for="(post, index) in allPosts">
      <div class="my-1 flex gap-2 font-medium">
        <div>{{ post.author }}</div>
        <div>{{ post.postOn }}</div>
        <div class="ml-auto">#{{ index + 1 }}</div>
      </div>
      <div v-html="post.msg.innerHTML">
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