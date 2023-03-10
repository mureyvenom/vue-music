// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
  }),
  actions: {
    async register(values: any) {
      try {
        const { email, password, age, name, country } = values;

        const user = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.user.uid), {
          email,
          age,
          name,
          country,
        });
        await updateProfile(user.user, { displayName: name });
        this.loggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
    async login(values: any) {
      try {
        const { email, password } = values;
        await signInWithEmailAndPassword(auth, email, password);
        this.loggedIn = true;
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    },
    async signOut() {
      try {
        await signOut(auth);
        this.loggedIn = false;
      } catch (error) {
        console.log(error);
        alert('Something went wrong signing out');
      }
    },
  },
});
