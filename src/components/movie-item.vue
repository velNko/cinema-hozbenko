<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <router-link v-if="movie" :to="{ name: 'movie', params: { id: movie.id } }">
    <figure class="movie-item mb-2">
      <img
        :src="movie.image"
        alt="movie.name"
        class="max-w-full w-full h-[50vw] md:h-[40vw] lg:h-[408px]"
      />
      <figcaption class="pt-2" v-html="movie.name"></figcaption>
    </figure>
  </router-link>
</template>

<style lang="scss" scoped>
.movie-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    object-fit: cover;
    object-position: left;
  }
}
</style>
