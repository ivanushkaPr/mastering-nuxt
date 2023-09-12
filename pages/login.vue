<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1> Log in to {{ title }}</h1>
    <button
        @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
        type="button"
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Log in with github
    </button>

    <UserCard/>

  </div>
</template>

<script setup lang="ts">
const { title } = useCourse();

const user = useSupabaseUser()
const { auth } = useSupabaseClient()
debugger;
const redirectTo = `http://localhost:3000/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/course')
  }
})
</script>