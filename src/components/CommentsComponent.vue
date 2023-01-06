<script lang="ts">
import type { Comment } from '@/utils/types';
import CommentComponent from './CommentComponent.vue';
export default {
  components: {
    CommentComponent,
  },
  props: {
    comments: {
      type: Array<Comment>,
      required: true,
      default: [],
    },
  },
};
</script>

<template>
  <ul class="container mx-auto">
    <CommentComponent v-for="comment in comments" :key="comment.docId" :comment="comment" />
  </ul>
</template>

<style scoped></style>
