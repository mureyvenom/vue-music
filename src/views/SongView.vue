<script lang="ts">
import MusicHeaderComponent from '@/components/MusicHeaderComponent.vue';
import CommentForm from '@/components/CommentForm.vue';
import CommentsComponent from '@/components/CommentsComponent.vue';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/utils/firebase';
import type { StoredSong, Comment } from '@/utils/types';

export default {
  components: {
    MusicHeaderComponent,
    CommentForm,
    CommentsComponent,
  },
  data() {
    return {
      song: {} as StoredSong,
      loading: false,
      comments: [] as Comment[],
    };
  },
  computed: {
    auth: () => auth,
  },
  methods: {
    async getSong() {
      try {
        this.loading = true;
        const songRef = doc(db, 'songs', this.$route.params.id as string);
        const docSnap = await getDoc(songRef);
        if (!docSnap.exists()) {
          this.$router.replace('/');
          return;
        }
        const s = {
          ...docSnap.data(),
          docId: docSnap.id,
        };
        this.song = s as StoredSong;
        await this.fetchComments();
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComments() {
      try {
        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('songId', '==', this.song.docId));
        const querySnapshot = await getDocs(q);
        const fetchedComments: Comment[] = [];
        querySnapshot.forEach((doc) => {
          const comment = {
            ...doc.data(),
            docId: doc.id,
          };
          fetchedComments.push(comment as Comment);
        });
        this.comments = fetchedComments;
      } catch (error) {
        console.log(error);
      }
    },
    async updateComments() {
      try {
        await this.fetchComments();
        await this.getSong();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      await this.getSong();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<template>
  <MusicHeaderComponent :song="song" />
  <CommentForm :song="song" @commentadded="updateComments" v-if="auth.currentUser?.uid" />
  <div
    class="container mx-auto mt-6 bg-blue-400 p-4 rounded mb-4 text-white font-bold text-xl"
    v-else
  >
    Sign in to comment
  </div>
  <CommentsComponent
    :comments="
      comments?.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    "
  />
</template>

<style scoped></style>
