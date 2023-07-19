<script setup>
const { data, imgToggler } = defineProps({
    data: Object,
    imgToggler: Object,
})

function filterImgAttr(msg) {
  let el = document.createElement( 'html' );
  el.innerHTML = msg;
  let imgs = el.getElementsByTagName( 'img' );
  Array.from(imgs).forEach(img => {
    if(img.hasAttribute("id")) {
      img.removeAttribute("onclick");
      img.removeAttribute("onmouseover");
      img.removeAttribute("onload");
    }
  });
  return el.innerHTML;
}

</script>

<template>
    <div class="my-1 flex gap-2 font-medium">
        <a :href="apiBaseUrl + data.authorid" target="_blank">{{ data.author }}</a>
        <div>{{ getPostDate(data.dateline) }}</div>
        <div class="ml-auto">#{{ data.position }}</div>
    </div>
    <div class="post" :class="[imgToggler.isShowImg ? '' : 'hideImg']" v-html="filterImgAttr(data.message)">
    </div>
</template>