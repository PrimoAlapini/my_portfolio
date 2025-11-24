<template>
  <section class="w-full bg-white text-center py-16 px-6">
    <p class="text-sm text-gray-500 mb-2"><span class="text-[#F4B400] text-xl">~ </span> Mes Languages</p>
    <h2 class="text-3xl font-semibold">
      <span class="text-yellow-600">Explores mes languages</span><br />
      Maitrisés et utilisés dans mes projets
    </h2>

    <div
      class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-12 max-w-6xl mx-auto"
    >
      <div v-for="tool in tools" :key="tool.name" class="flex flex-col items-center">
        <div
          class="flex flex-col items-center gap-3 bg-gray-100 p-6 rounded-full w-24 shadow-sm hover:shadow-md transition"
        >
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow"
          >
            <img
              :src="tool.icon"
              :alt="tool.name"
              class="w-10 h-10 object-contain"
            />
          </div>

          <p class="text-xl font-bold">{{ tool.percent }}%</p>
        </div>
        <p class="text-gray-600 mt-2 text-sm">{{ tool.name }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const tools = [
  {
    name: "Vue",
    percent: 100,
    icon: "/images/lang/vue.png",
  },
  {
    name: "Nuxt",
    percent: 100,
    icon: "/images/lang/nuxt.png",
  },
  {
    name: "Python",
    percent: 100,
    icon: "/images/lang/python.png",
  },
  {
    name: "React",
    percent: 100,
    icon: "/images/lang/react.png",
  },
  {
    name: "Flutter",
    percent: 100,
    icon: "/images/lang/flutter.png",
  },
  {
    name: "Angular",
    percent: 100,
    icon: "/images/lang/angular.png",
  },
  {
    name: "Node Js",
    percent: 100,
    icon: "/images/lang/node.png",
  },
  {
    name: "Php",
    percent: 100,
    icon: "/images/lang/php.png",
  },
  {
    name: "Laravel",
    percent: 100,
    icon: "/images/lang/laravel.png",
  },
  {
    name: "MySql",
    percent: 100,
    icon: "/images/lang/mysql.png",
  },
  {
    name: "Mongo DB",
    percent: 100,
    icon: "/images/lang/mongo.png",
  },
  {
    name: "Postgree",
    percent: 100,
    icon: "/images/lang/postgree.png",
  },
  {
    name: "Java",
    percent: 100,
    icon: "/images/lang/java.webp",
  },
  {
    name: "Sping Boot",
    percent: 100,
    icon: "/images/lang/spring.png",
  },
  {
    name: "Dart",
    percent: 100,
    icon: "/images/lang/dart.png",
  },
  {
    name: "Django",
    percent: 100,
    icon: "/images/lang/django.png",
  },
  {
    name: "JavaScript",
    percent: 100,
    icon: "/images/lang/js.png",
  },
];
</script>

<style scoped></style>
