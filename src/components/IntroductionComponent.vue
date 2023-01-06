<script lang="ts">
import image from '@/assets/images/header.png';
import intromusic from '@/assets/images/introduction-music.png';

export default {
  computed: {
    banner: () => image,
    intromusic: () => intromusic,
  },
};
</script>

<template>
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      :style="{ backgroundImage: `url(${banner})` }"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue
          augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" :src="intromusic" />
  </section>
</template>

<style scoped></style>
