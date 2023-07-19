<script setup>
const isShowImg = ref(false);

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
  const allImgs = document.querySelectorAll(".post-img")
  allImgs.forEach(img => {
    swapSrcTemp(img)
  });
}

defineExpose({ isShowImg });
</script>

<template>
  <button @click="toggleShowImg" class="
            hover:bg-blue-400
            hover:text-blue-100">{{ isShowImg ? "Hide" : "Show" }} Img</button>
</template>
