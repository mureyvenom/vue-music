<script lang="ts">
import { ref, uploadBytesResumable, getDownloadURL, type UploadTask } from 'firebase/storage';
import { storage, auth, db } from '@/utils/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default {
  data() {
    return {
      isDragOver: false,
      uploads: [] as {
        name: string;
        progress: string;
        variant: string;
        error?: string;
        task: UploadTask;
      }[],
    };
  },
  methods: {
    dragOver() {
      this.isDragOver = true;
    },
    dragAway() {
      this.isDragOver = false;
    },
    upload(event: DragEvent | Event) {
      this.isDragOver = false;
      const files = (event as DragEvent).dataTransfer?.files
        ? [...(event as DragEvent).dataTransfer!.files]
        : [...(event.target as HTMLInputElement).files!];

      files.forEach((file) => {
        if (!file.type.includes('audio/')) {
          return;
        }

        // Create a reference to 'song'
        const songRef = ref(storage, `songs/${file.name}`);
        const uploadTask = uploadBytesResumable(songRef, file);
        const uploadInProgress =
          this.uploads.findIndex((u) => u.name === file.name) > -1
            ? this.uploads.findIndex((u) => u.name === file.name)
            : this.uploads.push({
                name: file.name,
                progress: '0%',
                variant: 'bg-blue-400',
                task: uploadTask,
              }) - 1;

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress < 100) {
              this.uploads[uploadInProgress] = {
                ...this.uploads[uploadInProgress],
                progress: `${progress}%`,
              };
            } else {
              this.uploads[uploadInProgress] = {
                ...this.uploads[uploadInProgress],
                progress: `${progress}%`,
                variant: 'bg-green-400',
              };
            }
          },
          (error) => {
            console.log(error);
            this.uploads[uploadInProgress] = {
              ...this.uploads[uploadInProgress],
              variant: 'bg-red-400',
              error: error.message,
            };
          },
          async () => {
            const song = {
              uid: auth.currentUser?.uid,
              displayName: auth.currentUser?.displayName,
              originalName: uploadTask.snapshot.ref.name,
              modifiedName: uploadTask.snapshot.ref.name,
              genre: '',
              commentCount: 0,
              url: '',
            };
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            song.url = downloadUrl;
            await addDoc(collection(db, 'songs'), song);
            this.$emit('songadded');
          }
        );
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((u) => {
      u.task.cancel();
    });
  },
  emits: ['songadded'],
};
</script>

<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{ 'text-white bg-green-400 border-green-400 border-solid': isDragOver }"
          @drag.prevent.stop=""
          @dragend.prevent.stop="dragAway"
          @dragenter.prevent.stop="dragOver"
          @dragexit.prevent.stop="dragAway"
          @dragleave.prevent.stop="dragAway"
          @dragover.prevent.stop="dragOver"
          @dragstart.prevent.stop="dragOver"
          @drop.prevent.stop="upload"
        >
          <h5>Drop your files here</h5>
        </div>
        <input type="file" multiple @change="upload" />
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="item in uploads" :key="item.name">
          <!-- File Name -->
          <div class="font-bold text-sm">
            {{ item.name }} <span class="text-red-400">{{ item.error }}</span>
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              :style="{ width: item.progress }"
              :class="item.variant"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
