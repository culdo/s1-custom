<script setup>
const JSDOM = require('jsdom').JSDOM; 
const route = useRoute();

const { data, pending, refresh } = await useAsyncData(
  async () => {
    const res = await fetch(
      `https://www.saraba1st.com/2b/thread-${route.params.id}-${route.params.page}-1.html`
    )
    const text = await res.text()
    const dom = new JSDOM(text);
    const posts = dom.window.document.querySelectorAll("[id^=post_]");
    
    let data = [];
    // posts.forEach(post => {
    //   if(post.hasChildNodes()) {
    //     console.log(post.innerText);
    //     data.push({
    //       content: post.querySelector("[id^=postmessage_]").innerText,
    //     })
    //   }
    // });
    console.log(data);
    return posts
  }
)

</script>

<template>
  <div class="m-4 text-slate-600 text-center">
    <div class="flex" v-for="post in data">
      <!-- {{ post.content }} -->
      <div v-html="post.innerHTML">
      </div>
    </div>
  </div>
  
</template>