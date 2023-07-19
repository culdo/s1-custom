<script setup>
const showMenu = ref(false);
const toggleBt = ref(null);

document.addEventListener('click', e => {
    const isClickInside = toggleBt.value.contains(e.target)

  if (!isClickInside) {
    showMenu.value = false;
  }
})
</script>

<template>
    <div class="inline-block sticky top-0 z-50 float-right">
        <!-- Dropdown toggle button -->
        <button ref="toggleBt" @click="showMenu = !showMenu" class="flex items-center p-2 bg-white rounded-md">
            <svg class="w-5 h-5 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
                </path>
            </svg>
        </button>

        <!-- Dropdown menu -->
        <div v-show="showMenu" class="
                absolute
                right-0
                py-2
                mt-2
                bg-white
                rounded-md
                shadow-xl
                w-44
                ">
            <slot class="menu-item"></slot>
        </div>
    </div>
</template>

<style>

.menu-item {
  display: block;
  width: 100%;
  padding: 0.5rem 1.0rem;
  text-align: left;
}

</style>