<script lang="ts">
import { RouterLink } from 'vue-router';
// export default {
//   name: 'HeaderComponent',
// };
import { mapWritableState, mapState, mapActions } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

export default {
  computed: {
    ...mapWritableState(useModalStore, ['isOpen']),
    ...mapState(useUserStore, ['loggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
    toggleAuthModal() {
      this.isOpen = !this.isOpen;
    },
    async logUserOut() {
      await this.signOut();
      if (this.$route.meta?.requiresAuth) {
        this.$router.replace('/');
      }
    },
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        exact-active-class="no-active"
        class="text-white font-bold uppercase text-2xl mr-4"
        to="/"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-show="loggedIn">
            <RouterLink class="px-2 text-white" to="/manage">Manage</RouterLink>
          </li>
          <li v-if="!loggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li v-else>
            <a class="px-2 text-white" href="#" @click.prevent="logUserOut">Sign Out</a>
          </li>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale() }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
