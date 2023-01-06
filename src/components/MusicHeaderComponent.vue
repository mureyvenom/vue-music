<script lang="ts">
import type { StoredSong } from '@/utils/types';
import { mapActions, mapState } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import songheader from '@/assets/images/song-header.png';

export default {
  props: {
    song: {
      type: Object as () => StoredSong,
      required: true,
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    currentlyPlaying() {
      console.log('currentSong', this.currentSong);
      return this.currentSong().docId === this.song.docId && this.playing()
        ? 'fa-pause'
        : 'fa-play';
    },
  },
  data() {
    return {
      ...mapState(usePlayerStore, ['playing', 'currentSong']),
    };
  },
  computed: {
    songheader: () => songheader,
  },
};
</script>

<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      :style="{ backgroundImage: `url(${songheader})` }"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        @click.prevent="newSong(song)"
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i
          class="fas"
          :class="currentSong().docId === song.docId && playing() ? 'fa-pause' : 'fa-play'"
        ></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
