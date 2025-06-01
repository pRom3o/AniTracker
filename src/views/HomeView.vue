<script setup>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div
    class="h-screen w-full text-center text-gray-100 bg-cover bg-center"
    style="background-image: url('/images/landscape2.jpg')"
  >
    <Nav />
    <div class="h-full w-full"></div>
    <Footer class="h-[10%] w-full" />
  </div>
</template>
