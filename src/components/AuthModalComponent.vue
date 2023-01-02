<script lang="ts">
import { mapWritableState, mapState } from 'pinia';
import { useModalStore } from '@/stores/modal';

export default {
  computed: {
    ...mapWritableState(useModalStore, {
      modalOpen: 'isOpen',
    }),
    ...mapState(useModalStore, ['hiddenClass']),
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.reg_loading = false;
      this.reg_alert = false;
      this.login_loading = false;
      this.login_alert = false;
    },
    register(values: any) {
      console.log('reg_values', values);
      this.reg_loading = true;
      this.reg_alert = true;
      this.reg_alert_color = 'bg-blue-500';
      this.reg_alert_message = 'Account is being created';

      setTimeout(() => {
        this.reg_alert_color = 'bg-green-500';
        this.reg_alert_message = 'Account created';
        this.reg_loading = false;
      }, 2000);
    },
    login(values: any) {
      console.log('login_values', values);
      this.login_loading = true;
      this.login_alert = true;
      this.login_alert_color = 'bg-blue-500';
      this.login_alert_message = 'Logging in...';

      setTimeout(() => {
        this.login_alert_color = 'bg-green-500';
        this.login_alert_message = 'Successfully logged in';
        this.login_loading = false;
      }, 2000);
    },
  },
  data() {
    return {
      tab: 'login' as 'login' | 'register',
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email|min:3|max:100',
        age: 'required|numeric|max_value:130',
        password: 'required',
        confirm_password: 'confirmed:@password',
        country: 'required',
        tos: 'required',
      },
      login_schema: {
        email: 'required',
        password: 'required',
      },
      userData: {
        country: 'USA',
      },
      reg_loading: false,
      reg_alert: false,
      reg_alert_color: 'bg-blue-500',
      reg_alert_message: 'Account is being created',
      login_loading: false,
      login_alert: false,
      login_alert_color: 'bg-blue-500',
      login_alert_message: 'Loggin in...',
    };
  },
};
</script>
<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="tab === 'login' && 'hover:text-white text-white bg-blue-600'"
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="tab === 'register' && 'hover:text-white text-white bg-blue-600'"
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <div
            class="text-white text-center font-bold rounded p-4 mb-4"
            :class="login_alert_color"
            v-show="login_alert"
          >
            {{ login_alert_message }}
          </div>
          <VeeForm v-show="tab === 'login'" :validation-schema="login_schema" @submit="login">
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
          <!-- Registration Form -->
          <div
            class="text-white text-center font-bold rounded p-4 mb-4"
            :class="reg_alert_color"
            v-show="reg_alert"
          >
            {{ reg_alert_message }}
          </div>
          <VeeForm
            v-show="tab === 'register'"
            :validation-schema="schema"
            @submit="register"
            :initial-values="userData"
          >
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <VeeField
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
                name="name"
              />
              <ErrorMessage class="text-red-600" name="name" />
            </div>
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
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <VeeField :bails="false" v-slot="{ field, errors }" name="age">
                <input
                  type="number"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  v-bind="field"
                />
                <div class="text-red-600" :key="error" v-for="error in errors">{{ error }}</div>
              </VeeField>
              <!-- <ErrorMessage class="text-red-600" name="age" /> -->
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
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <VeeField
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
                name="confirm_password"
              />
              <ErrorMessage class="text-red-600" name="confirm_password" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <VeeField
                name="country"
                as="select"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </VeeField>
              <ErrorMessage class="text-red-600" name="country" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <VeeField
                type="checkbox"
                name="tos"
                value="true"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"
              />
              <label class="inline-block">Accept terms of service</label>
              <ErrorMessage class="text-red-600" name="tos" />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              :disabled="reg_loading"
            >
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
