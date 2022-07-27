<template>
  <div class="p-5 max-w-[1300px] mx-auto">
    <router-link
      v-if="$route.path !== '/'"
      to="/"
      class="inline-block mb-4 text-sm text-blue-50 underline"
      >Home</router-link
    >
    <router-view />
  </div>
</template>
