<script lang="ts">
import UploadComponent from '@/components/UploadComponent.vue';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import type { StoredSong } from '@/utils/types';
import CompositionItem from '@/components/CompositionItem.vue';

export default {
  components: {
    UploadComponent,
    CompositionItem,
  },
  async created() {
    await this.fetchSongs();
  },
  data() {
    return {
      songs: [] as StoredSong[],
    };
  },
  methods: {
    updateSong(values: { index: number; updates: { modifiedName: string; genre: string } }) {
      const { index, updates } = values;
      this.songs[index] = {
        ...this.songs[index],
        ...updates,
      };
    },
    deleteSong(id: string) {
      this.songs = this.songs.filter((s) => s.docId !== id);
    },
    async fetchSongs() {
      try {
        const songsRef = collection(db, 'songs');
        const q = query(songsRef, where('uid', '==', auth.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const fetchedSongs: StoredSong[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const song = {
            ...doc.data(),
            docId: doc.id,
          };
          fetchedSongs.push(song as StoredSong);
        });
        this.songs = fetchedSongs;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <UploadComponent @songadded="fetchSongs" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :index="i"
              @updatesong="updateSong"
              @deletesong="deleteSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
