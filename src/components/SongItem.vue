<script lang="ts">
import type { StoredSong } from '@/utils/types';
import { RouterLink } from 'vue-router';

export default {
  props: {
    song: {
      type: Object as () => StoredSong,
      required: true,
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <RouterLink :to="`/song/${song.docId}`" class="font-bold block text-gray-600">{{
        song.modifiedName
      }}</RouterLink>
      <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        {{ song.commentCount }}
      </span>
    </div>
  </li>
</template>

<style scoped></style>
