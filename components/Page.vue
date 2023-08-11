<script setup>
import { vIntersectionObserver } from '@vueuse/components'

const route = useRoute()

const { ilp, pageNum } = defineProps(["ilp", "pageNum"])
console.log(`setup pageNum: ${pageNum}`)

function onIntersection(entries, opts) {
    entries.forEach(({target, isIntersecting}) => {
        if(isIntersecting) {
            console.log(target)
            console.log(`target.id: ${target.id}`)
            console.log(`ilp.pageNum: ${ilp.pageNum}`)
            localStorage.setItem(ilp.localStorgeKey, target.id)
            ilp.pageNum = Number(target.id)
        }
    }
    )

}


</script>
<template>
    <div :id="pageNum" v-intersection-observer="[onIntersection]">
    </div>
    <slot></slot>
</template>