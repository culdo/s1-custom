<script setup>
const usernameRef = ref("")
const passwordRef = ref("")
const loginRef = ref(null)

const updateConfig = async () => {

    const response = await fetch('https://app.saraba1st.com/2b/api/app/user/login', {
      method: "POST",
      body: new FormData(loginRef.value)
    });
    
    const data = await response.json()

    console.log(data)
    localStorage.setItem("sid", data.data.sid)
    console.log(localStorage.getItem("sid"))
    
    await navigateTo('/')
}
</script>
<template>
    <div class="flex items-center justify-center mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form class="space-y-4 md:space-y-6" ref="loginRef" @submit.prevent="updateConfig">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">用戶名</label>
                      <input type="username" name="username" id="username" v-model="usernameRef" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密碼</label>
                      <input type="password" name="password" id="password" v-model="passwordRef" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">記住我</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
              </form>
          </div>
      </div>
  </div>
</template>