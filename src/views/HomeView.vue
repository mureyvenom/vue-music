<script lang="ts">
import Introduction from '@/components/IntroductionComponent.vue';
import MainContent from '@/components/MainContentComponent.vue';
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import type { StoredSong } from '@/utils/types';
import { db } from '@/utils/firebase';

export default {
  components: {
    Introduction,
    MainContent,
  },
  async created() {
    await this.getSongs();
    window.addEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      songs: [] as StoredSong[],
      lastVisible: {} as QueryDocumentSnapshot<DocumentData>,
      pendingRequest: false,
    };
  },
  methods: {
    async getSongs() {
      try {
        if (this.pendingRequest) {
          return;
        }
        this.pendingRequest = true;
        const firstFetch = query(collection(db, 'songs'), limit(5));
        const querySnapshot = await getDocs(firstFetch);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const loadedSongs: StoredSong[] = [];
        querySnapshot.forEach((doc) => {
          const song = {
            ...doc.data(),
            docId: doc.id,
          };
          loadedSongs.push(song as StoredSong);
        });
        this.songs = loadedSongs;
        this.lastVisible = lastVisible;
        this.pendingRequest = false;
      } catch (error) {
        console.log(error);
        this.pendingRequest = false;
      }
    },
    async getMoreSongs() {
      try {
        if (!this.lastVisible?.ref || this.pendingRequest) {
          return;
        }
        this.pendingRequest = true;
        const next = query(collection(db, 'songs'), startAfter(this.lastVisible), limit(5));
        const querySnapshot = await getDocs(next);
        if (!querySnapshot.docs.length) {
          this.lastVisible = {} as any;
          return;
        }
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const loadedSongs: StoredSong[] = [];
        querySnapshot.forEach((doc) => {
          const song = {
            ...doc.data(),
            docId: doc.id,
          };
          loadedSongs.push(song as StoredSong);
        });
        this.songs.push(...loadedSongs);
        this.lastVisible = lastVisible;
        this.pendingRequest = false;
      } catch (error) {
        console.log(error);
        this.pendingRequest = false;
      }
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 100;
      if (bottomOfWindow) {
        this.getMoreSongs();
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', () => {});
  },
};
</script>

<template>
  <main>
    <Introduction />
    <MainContent :songs="songs" />
  </main>
</template>
