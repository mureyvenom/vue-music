<script lang="ts">
import AppHeader from '@/components/HeaderComponent.vue';
import { RouterView } from 'vue-router';
import { auth } from '@/utils/firebase';
import { useUserStore } from '@/stores/user';
import { mapWritableState } from 'pinia';
import Player from '@/components/PlayerComponent.vue';
import AuthModal from './components/AuthModalComponent.vue';

export default {
  components: {
    AppHeader,
    RouterView,
    Player,
    AuthModal,
  },
  computed: {
    ...mapWritableState(useUserStore, ['loggedIn']),
  },
  created() {
    if (auth.currentUser) {
      this.loggedIn = true;
    }
  },
};
</script>

<template>
  <AppHeader />
  <RouterView />
  <Player />
  <AuthModal />
</template>
