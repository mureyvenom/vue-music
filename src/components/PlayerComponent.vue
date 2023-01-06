<script lang="ts">
import { usePlayerStore } from '@/stores/player';
import { mapActions, mapState } from 'pinia';
import { formatTime } from '@/utils/helpers';

export default {
  data() {
    return {
      ...mapState(usePlayerStore, [
        'currentSong',
        'playing',
        'currentPosition',
        'duration',
        'progressBar',
      ]),
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ['togglePlay', 'updateSeek']),
    formatTime,
  },
};
</script>

<template>
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center" v-if="currentSong().docId">
      <span class="song-title font-bold">{{ currentSong().modifiedName }}</span> by
      <span class="song-artist">{{ currentSong().displayName }}</span>
    </div>
    <div class="text-center" v-else>
      <span class="song-artist">No song selected</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="togglePlay">
        <i class="fa text-gray-500 text-xl" :class="playing() ? 'fa-pause' : 'fa-play'"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ formatTime(currentPosition()) }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{
            left: progressBar(),
          }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{
            width: progressBar(),
          }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">
        {{ formatTime(duration()) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
