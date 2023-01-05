<script lang="ts">
import type { StoredSong } from '@/utils/types';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';
import { db, storage } from '@/utils/firebase';

export default {
  props: {
    song: {
      type: Object as () => StoredSong,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      formVisible: false,
      schema: {
        title: 'required',
        gernre: 'alpha_spaces',
      },
      submitLoading: false,
      submitAlert: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Updating song info',
    };
  },
  methods: {
    toggleForm() {
      this.formVisible = !this.formVisible;
      this.submitAlert = false;
    },
    async updateSong(values: any) {
      try {
        const { title, genre } = values;
        this.submitAlert = true;
        this.submitLoading = true;
        this.alertVariant = 'bg-blue-500';
        this.alertMessage = 'Updating song info';

        const songRef = doc(db, 'songs', this.song.docId);
        await updateDoc(songRef, {
          modifiedName: title,
          genre: genre || '',
        });

        this.submitAlert = true;
        this.submitLoading = false;
        this.alertVariant = 'bg-green-500';
        this.alertMessage = 'Song Updated';

        this.$emit('updatesong', {
          index: this.index,
          updates: {
            modifiedName: title,
            genre,
          },
        });
      } catch (error) {
        console.log(error);
        const err = error as { message: string };
        this.submitAlert = true;
        this.submitLoading = false;
        this.alertVariant = 'bg-red-500';
        this.alertMessage = err.message || 'Something went wrong';
      }
    },
    async deleteSong() {
      try {
        if (!confirm('Are you sure you want to delete this song?')) {
          return;
        }
        const songRef = ref(storage, `songs/${this.song.originalName}`);
        await deleteDoc(doc(db, 'songs', this.song.docId));
        await deleteObject(songRef);
        this.$emit('deletesong', this.song.docId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  emits: ['updatesong', 'deletesong'],
};
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!formVisible">
      <h4 class="inline-block text-xl font-bold">{{ song.modifiedName }}</h4>
      <button
        @click.prevent="deleteSong"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="toggleForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="formVisible">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        :class="alertVariant"
        v-show="submitAlert"
      >
        {{ alertMessage }}
      </div>
      <VeeForm :validation-schema="schema" @submit="updateSong">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.modifiedName }}</label>
          <VeeField
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            :value="song.modifiedName"
            name="title"
          />
          <ErrorMessage class="text-red-600" name="title" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.genre }}</label>
          <VeeField
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            name="genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          :disabled="submitLoading"
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 mr-2"
        >
          Submit
        </button>
        <button
          :disabled="submitLoading"
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="toggleForm"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<style scoped></style>
