<script setup>

if(localStorage.getItem("sid") === undefined) {
  navigateTo("/login")
}

const route = useRoute();
const imgToggler = ref(null);

async function fetcher(pageNum) {
  let formData = new FormData();
  let tid = route.params.id;
  formData.append('sid', localStorage.getItem("sid"));
  formData.append('tid', tid);
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
  const totalReplies = data.data.totalCount - 1
  localStorage.setItem(`${tid}-replies`, totalReplies)
  
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
          <Post :data="post" :imgToggler="imgToggler"></Post>
        </div>
      </div>
    </template>
  </InfLoadingPage>
</template>