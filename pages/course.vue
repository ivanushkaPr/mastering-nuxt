<template>
  <div>

    <div class="flex flex-row justify-center flex-grow">
      <div
          class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3>Chapters</h3>
        <div
            class="space-y-1 mb-4 flex flex-col"
            v-for="(chapter, index) in course.chapters"
            :key="chapter.slug"
        >
          <NuxtLink
              v-for="(lesson, index) in chapter.lessons"
              :key="lesson.slug"
              class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
              :to="lesson.path"
              :class="{
              'text-blue-500':
                lesson.path === $route.fullPath,
              'text-gray-600':
                lesson.path !== $route.fullPath,
            }"
          >
            <span class="text-gray-500"
            >{{ index + 1 }}.</span
            >
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[65ch]">
          <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
const course = useCourse();
debugger;
</script>

<style lang="scss" scoped>
.course {
  display: flex;
  justify-content: space-between;
}

.course__sidebar {
  width: 25%;
  height: 100vh;
  background-color: red;
}

.router-link-active {
  color: green;
  font-weight: bold;
}

</style>