<script lang="ts">
import type { Comment } from '@/utils/types';
import moment from 'moment';

export default {
  props: {
    comment: {
      type: Object as () => Comment,
      required: true,
    },
  },
  data() {
    return {
      time: '',
    };
  },
  created() {
    this.time = moment.duration(moment().diff(moment(this.comment.dateAdded))).humanize({});
  },
};
</script>

<template>
  <li class="p-6 bg-gray-50 border border-gray-200 mb-2">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ comment.displayName }}</div>
      <time>{{ time }} ago</time>
    </div>

    <p>
      {{ comment.comment }}
    </p>
  </li>
</template>

<style scoped></style>
