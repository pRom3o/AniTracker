<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Nav from '@/components/Nav.vue'
</script>

<template>
  <div class="h-screen w-full bg-[#1e1e1e] text-center text-gray-50 p-4">
    <nav class="h-[10%] mb-10"><Nav /></nav>
    <main class="h-[80%] flex items-center justify-center">
      <div
        class="h-full w-full rounded-3xl bg-[#242424] shadow-2xl p-3 flex flex-col items-center justify-center space-y-10 text-2xl"
      >
        <div
          class="w-full p-3 h-full flex flex-col md:flex-row justify-between md:space-x-5 space-y-2"
        >
          <div class="md:w-1/2 h-full flex items-center justify-center">
            <div class="space-y-5">
              <p>Anime name</p>
              <p>SYNOPSIS</p>
              <p>seasons</p>
              <p>ratings</p>
              <div class="flex items-center">
                <input type="checkbox" name="added" id="add" />Add to watchlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
