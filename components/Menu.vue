<script setup>
const showMenu = ref(false);

</script>

<template>
    <div>
        <div class="relative">
            <!-- Dropdown toggle button -->
            <button @click="showMenu = !showMenu" class="flex items-center p-2 bg-white rounded-md">
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
                <slot></slot>
            </div>
        </div>
    </div>
</template>
