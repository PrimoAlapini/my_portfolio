<template>
  <div>
    <!-- Header Section -->
    <header class="bg-white py-8 px-6 text-center">
      <h1 class="text-4xl font-bold text-gray-800">Hello There!</h1>
      <p class="text-lg text-gray-600 mt-2">
        I’m <span class="text-green-500">Primous ALAPINI</span>, Developper and programmer Web Based in Benin.
      </p>
      <p class="mt-4">
        <a href="#portfolio" class="bg-yellow-500 text-white px-6 py-3 rounded-full text-xl">View My Portfolio</a>
      </p>
      <div class="mt-6">
        <a href="#" class="inline-block text-green-500">Product Designer</a>
        <span class="mx-2">|</span>
        <a href="#" class="inline-block text-gray-600">UX/UI Designer</a>

      </div>
    </header>

    <!-- Services Section -->
    <section class="bg-gray-100 py-16 px-6">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Services I Provide</h2>
      <div class="grid md:grid-cols-3 gap-12 mt-8">
        <div class="service-card text-center bg-white p-8 rounded-xl shadow-md">
          <h3 class="text-xl font-bold text-gray-700">UI/UX Design</h3>
          <p class="text-gray-600 mt-4">Learn more about my work in UI/UX Design...</p>
          <a href="#" class="mt-4 text-yellow-500">Learn More</a>
        </div>
        <div class="service-card text-center bg-white p-8 rounded-xl shadow-md">
          <h3 class="text-xl font-bold text-gray-700">Application Design</h3>
          <p class="text-gray-600 mt-4">Learn more about my work in Application Design...</p>
          <a href="#" class="mt-4 text-yellow-500">Learn More</a>
        </div>
        <div class="service-card text-center bg-white p-8 rounded-xl shadow-md">
          <h3 class="text-xl font-bold text-gray-700">Website Design</h3>
          <p class="text-gray-600 mt-4">Learn more about my work in Website Design...</p>
          <a href="#" class="mt-4 text-yellow-500">Learn More</a>
        </div>
      </div>
    </section>

    <!-- About Me Section -->
    <section class="bg-green-500 py-16 px-6 text-white">
      <h2 class="text-3xl font-semibold text-center">Who is Olivia Smith?</h2>
      <div class="flex justify-center mt-8">
        <img src="https://via.placeholder.com/150" alt="Olivia Smith" class="rounded-full border-4 border-white" />
      </div>
      <p class="mt-6 text-center text-lg">
        I’m a product designer with over 10 years of experience working with amazing companies and brands.
      </p>
      <div class="mt-6 text-center">
        <p>600+ Projects Completed | 50+ Industry Awards | 18+ Years of Experience</p>
        <a href="#cv" class="mt-4 inline-block text-yellow-500">Download CV</a>
      </div>
    </section>
  </div>
</template>

<script setup>

  const name = "Home"

</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
