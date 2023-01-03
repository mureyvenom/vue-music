<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      login_schema: {
        email: 'required',
        password: 'required',
      },
      login_loading: false,
      login_alert: false,
      login_alert_color: 'bg-blue-500',
      login_alert_message: 'Loggin in...',
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      authenticateUser: 'login',
    }),
    async login(values: any) {
      try {
        this.login_loading = true;
        this.login_alert = true;
        this.login_alert_color = 'bg-blue-500';
        this.login_alert_message = 'Logging in...';

        await this.authenticateUser(values);

        this.login_alert_color = 'bg-green-500';
        this.login_alert_message = 'Successfully logged in';
        this.login_loading = false;
      } catch (error) {
        console.log(JSON.stringify(error));
        const err = error as { message: string; code: string | number };
        console.log(JSON.stringify(err));
        this.login_loading = false;
        this.login_alert = true;
        this.login_alert_color = 'bg-red-500';
        this.login_alert_message = err?.message || 'Something went wrong';
      }
    },
  },
};
</script>

<template>
  <div>
    <div
      class="text-white text-center font-bold rounded p-4 mb-4"
      :class="login_alert_color"
      v-show="login_alert"
    >
      {{ login_alert_message }}
    </div>
    <VeeForm :validation-schema="login_schema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <VeeField
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
          name="email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <VeeField
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          name="password"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      >
        Submit
      </button>
    </VeeForm>
  </div>
</template>
