<script setup>

if(localStorage.getItem("sid") === undefined) {
  navigateTo("/login")
}

const route = useRoute();
const imgToggler = ref(null);

async function fetcher(pageNum) {
  let formData = new FormData();
  formData.append('sid', localStorage.getItem("sid"));
  formData.append('tid', route.params.id);
  formData.append('pageNo', pageNum);

  const response = await fetch(apiPostList, {
    method: "POST",
    credentials: 'include',
    body:formData,
  });
  const data = await response.json();
  if(data.code == 501) {
      navigateTo("/login")
  }
  return [data.data.list, parseInt(data.data.totalCount)];
}

</script>

<template>
  <InfLoadingPage :localStorgeKey="`thread-${route.params.id}-page`" :fetcher="fetcher" :itemPerPage=30 >
    <template v-slot:menu="menuProps">
      <a :href="getThreadOrigUrl(route, menuProps.pageNum)" target="_blank" class="
                    menu-item
                    hover:bg-blue-400
                    hover:text-blue-100">Original Post</a>
      <ImgToggler class="menu-item" ref="imgToggler" />
    </template>
    <template v-slot:content="props">
      <div class="border-b-2 w-full" v-for="page in props.allItemList">
        <div class="my-6" v-for="post in page">
          <div class="my-1 flex gap-2 font-medium">
            <a :href="apiBaseUrl + post.authorid" target="_blank">{{ post.author }}</a>
            <div>{{ getPostDate(post.dateline) }}</div>
            <div class="ml-auto">#{{ post.position }}</div>
          </div>
          <div class="post" :class="[imgToggler.isShowImg ? '' : 'hideImg']" v-html="post.message">
          </div>
        </div>
      </div>
    </template>
  </InfLoadingPage>
</template>

<style>
img {
  display: inline;
}

img[id^=aimg_] {
  width: 800px;
}

.hideImg img[id^=aimg_], .hideImg img[src^="https://img.saraba1st.com/"]{
  display: none;
}

</style>