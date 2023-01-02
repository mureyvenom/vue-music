<script lang="ts">
export default {
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email|min:3|max:100',
        age: 'required|numeric|max_value:130',
        password: 'required',
        confirm_password: 'confirmed:@password',
        country: 'required',
        tos: 'required',
      },
      userData: {
        country: 'USA',
      },
      reg_loading: false,
      reg_alert: false,
      reg_alert_color: 'bg-blue-500',
      reg_alert_message: 'Account is being created',
    };
  },
  methods: {
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
  },
};
</script>

<template>
  <div>
    <div
      class="text-white text-center font-bold rounded p-4 mb-4"
      :class="reg_alert_color"
      v-show="reg_alert"
    >
      {{ reg_alert_message }}
    </div>
    <VeeForm :validation-schema="schema" @submit="register" :initial-values="userData">
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
</template>

<style scoped></style>
