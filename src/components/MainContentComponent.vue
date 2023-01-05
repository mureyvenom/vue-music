<script lang="ts">
import type { StoredSong } from '@/utils/types';
import SongItem from './SongItem.vue';

export default {
  props: {
    songs: {
      type: Array<StoredSong>,
      required: true,
      default: [],
    },
  },
  components: {
    SongItem,
  },
};
</script>
<template>
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docId" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<style scoped></style>
