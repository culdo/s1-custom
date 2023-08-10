<script setup>
import { vIntersectionObserver } from '@vueuse/components'

const route = useRoute()

const { ilp, data, pageNo } = defineProps(["ilp", "data", "pageNo"])

function onIntersection(entries, opts) {
    entries.forEach(entry => {
        console.log(entry.target)
        localStorage.setItem(`thread-${route.params.id}-page`, pageNo)
        console.log(`scrollto page ${pageNo}`)
        if (ilp) {
            console.log(ilp.pageNum)
            ilp.pageNum = Number(pageNo)
        }
    }
    )
}


</script>
<template>
    <div v-intersection-observer="[onIntersection]">
    </div>
        <div class="my-6" v-for="post in data">
            <Post :data="post"></Post>
        </div>
</template>