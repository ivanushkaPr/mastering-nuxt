<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
          v-if="lesson.sourceUrl"
          class="font-normal text-md text-gray-500"
          :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
          v-if="lesson.downloadUrl"
          class="font-normal text-md text-gray-500"
          :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer
        v-if="lesson.videoId"
        :videoId="lesson.videoId"
    />
    <p class="mb-16 mt-16">{{ lesson.text }}</p>
    <client-only>
      <LessonCompleteButton
          :model-value="isLessonComplete"
          @update:model-value="toggleComplete"
      />
    </client-only>
  </div>
</template>


<script setup>
import LessonCompleteButton from "~/components/LessonCompleteButton.client.vue";

const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find((chapter) => {
    return chapter.slug === route.params.chapterSlug;
  })
});

const lesson = computed(() => {
  return chapter.value.lessons.find((lesson) => {
    return lesson.slug === route.params.lessonSlug;
  })
})

const title = computed(() => {
  return chapter.value.title + ' - ' + lesson.value.title;
})

useHead({
  title,
})

const progress = useLocalStorage('progress', []);

const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }

  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false;
  }

  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
})

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonComplete.value;
}
</script>

<style lang="scss">
.lessons {
  width: 70%;
  background-color: gray;
  height: 100vh;
}
</style>