<script setup>
const isShowImg = ref(false);

function toggleShowImg() {
  isShowImg.value = !isShowImg.value;
  const allImgs = document.querySelectorAll(".post-img")
  allImgs.forEach(img => {
    if(isShowImg.value) {
      img.setAttribute("src", img.getAttribute("data-src"))
    } else {
      img.setAttribute("data-src", img.getAttribute("src"))
      img.setAttribute("src", "placeholder.jpg")
    }
  });
}

defineExpose({ isShowImg });
</script>

<template>
  <button @click="toggleShowImg" class="
            hover:bg-blue-400
            hover:text-blue-100">{{ isShowImg ? "Hide" : "Show" }} Img</button>
</template>
