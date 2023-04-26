<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const { localStorgeKey, itemPerPage, fetcher } = defineProps({
    localStorgeKey: String,
    itemPerPage: Number,
    fetcher: Function,
})
let allItemList = ref([]);

const route = useRoute();
const pageNum = ref(parseInt(localStorage.getItem(localStorgeKey) || route.params.page || 1));

let scrollTopPage = pageNum.value - 1;
let scrollBottomPage = pageNum.value;
let loading = true;
let itemList, totalItems;

const load = async ($state, isTop=false) => {
    console.log("loading...");
    loading = true;
    
    if(isTop){
        pageNum.value = scrollTopPage;
    }else{
        pageNum.value = scrollBottomPage;
    }
    try {
        localStorage.setItem(localStorgeKey, pageNum.value);
        [itemList, totalItems] = await fetcher(pageNum.value);
    
        if(isTop){
            allItemList.value.unshift(itemList);
            scrollTopPage = pageNum.value - 1;
        }else{
            allItemList.value.push(itemList);
            scrollBottomPage = pageNum.value + 1;
        }
    
        // There are 50 threads in one page if it's not end
        if (totalItems - (pageNum.value * itemPerPage) <= 0 ) {
            $state.complete();
        } else {
            $state.loaded();
        }
        loading = false;
    } catch (error) {
        $state.error();
    }
}

function jumpToPage(e) {
    pageNum.value = parseInt(e.target.value);
    scrollTopPage = pageNum.value - 1;
    scrollBottomPage = pageNum.value;
    allItemList.value = [];
}

</script>

<template>
    <div class="m-4 text-slate-600">
        <Menu>
            <input :value="pageNum" @input="jumpToPage" type="range" class="slider menu-item" min="1" :max="Math.ceil(totalItems/itemPerPage)" />
            <input :value="pageNum" @input="jumpToPage" type="number" class="menu-item"/>
            <slot name="menu" :pageNum="pageNum"></slot>
        </Menu>
        <InfiniteLoading v-if="allItemList.length > 0 && scrollTopPage > 0 && !loading" top=true @infinite="load($event, true)" />
        <slot name="content" :allItemList="allItemList"></slot>
        <InfiniteLoading @infinite="load" />
    </div>
</template>