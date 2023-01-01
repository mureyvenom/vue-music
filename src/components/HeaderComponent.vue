<script setup lang="ts">
import { RouterLink } from 'vue-router';
// export default {
//   name: 'HeaderComponent',
// };
</script>

<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink class="px-2 text-white" to="/">Login / Register</RouterLink>
          </li>
          <li>
            <RouterLink class="px-2 text-white" to="/">Manage</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
