// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
  }),
  // actions: {
  //   toggleModal() {
  //     this.isOpen = !this.isOpen;
  //   },
  // },
  getters: {
    hiddenClass(state): string {
      return !state.isOpen ? 'hidden' : '';
    },
  },
});
