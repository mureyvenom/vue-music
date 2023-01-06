<script lang="ts">
import { db, auth } from '@/utils/firebase';
import type { StoredSong } from '@/utils/types';
import { addDoc, collection, updateDoc, increment, doc } from 'firebase/firestore';
import type { FormContext } from 'vee-validate';

export default {
  props: {
    song: {
      type: Object as () => StoredSong,
      required: true,
    },
  },
  data() {
    return {
      schema: {
        comment: 'required|min:3|max:1000',
      },
      loading: false,
      alert: false,
      alert_color: 'bg-blue-500',
      alert_message: 'Comment is being added',
    };
  },
  methods: {
    async submit(values: any, context: FormContext) {
      try {
        this.loading = true;
        this.alert = true;
        this.alert_color = 'bg-blue-500';
        this.alert_message = 'Comment is being added...';
        const { comment } = values;
        const c = {
          songId: this.song.docId,
          comment,
          userId: auth.currentUser?.uid!,
          displayName: auth.currentUser?.displayName,
          dateAdded: new Date().toISOString(),
        };

        await addDoc(collection(db, 'comments'), c);

        const songRef = doc(db, 'songs', this.song.docId);
        await updateDoc(songRef, {
          commentCount: increment(1),
        });
        this.$emit('commentadded');
        this.loading = false;
        this.alert = true;
        this.alert_color = 'bg-green-500';
        this.alert_message = 'Comment added';
        context.resetForm();
        setTimeout(() => {
          this.alert = false;
        }, 2000);
      } catch (error) {
        console.log(error);
        const err = error as { message: string };
        this.loading = false;
        this.alert = true;
        this.alert_color = 'bg-red-500';
        this.alert_message = err?.message || 'Something went wrong';
      }
    },
  },
  emits: ['commentadded'],
};
</script>

<template>
  <section class="container mx-auto my-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">{{
          $t('song.comment_count', {
            count: song.commentCount,
          })
        }}</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <VeeForm :validation-schema="schema" @submit="submit">
          <div
            class="text-white text-center font-bold rounded p-4 mb-4"
            :class="alert_color"
            v-show="alert"
          >
            {{ alert_message }}
          </div>
          <VeeField
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></VeeField>
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            :disabled="loading"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
