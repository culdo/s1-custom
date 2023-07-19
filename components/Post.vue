<script setup>
const { data, imgToggler } = defineProps({
  data: Object,
  imgToggler: Object,
})

function filterImgAttr(msg) {
  let el = document.createElement('html');
  el.innerHTML = msg;
  let imgs = el.getElementsByTagName('img');
  Array.from(imgs).forEach(img => {
    if (img.hasAttribute("id") || img.getAttribute('src').startsWith("https://img.saraba1st.com/")) {
      img.setAttribute("class", "post-img")
      img.setAttribute("data-src", img.getAttribute('src'))
      img.setAttribute("src", "placeholder.jpg")
      img.setAttribute("alt", "click to show")
      img.removeAttribute("onclick");
      img.removeAttribute("onmouseover");
      img.removeAttribute("onload");
    }
  });
  return el.innerHTML;
}

const post = ref(null)
onMounted(()=> {
  const imgs = post.value.querySelectorAll(".post-img")
  imgs.forEach(img => {
    img.addEventListener("click", (e)=>{
      swapSrcTemp(img)
    })
  })
})

</script>

<template>
  <div class="my-1 flex gap-2 font-medium">
    <a :href="apiBaseUrl + data.authorid" target="_blank">{{ data.author }}</a>
    <div>{{ getPostDate(data.dateline) }}</div>
    <div class="ml-auto">#{{ data.position }}</div>
  </div>
  <div ref="post" class="post" v-html="filterImgAttr(data.message)">
  </div>
</template>

<style>
.quote {
  color: #7b7b7b
}

img {
  display: inline;
}

.post-img {
  width: 800px;
  cursor: pointer;
}

</style>