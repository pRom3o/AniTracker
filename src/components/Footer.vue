<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>

<template>
  <div class="h-32 w-full bg-[#262626] flex items-center justify-center p-3">
    <div
      class="w-full h-full border border-black flex-col md:flex-row flex md:items-center justify-between"
    >
      <h1>&copy; {{ new Date().getFullYear() }}</h1>
    </div>
  </div>
</template>
