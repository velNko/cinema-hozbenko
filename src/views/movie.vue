<script>
import { defineComponent } from "vue";
import DayList from "../components/day-list.vue";
import { getMovies, getMoviesSessions } from "@/api/movies";

export default defineComponent({
  name: "movie",
  components: {
    DayList,
  },

  data() {
    const { id } = this.$route.params;
    return {
      movieId: id,
      movieInfo: null,
      sessionsDays: null,
    };
  },
  provide() {
    return {
      movieId: this.movieId,
    };
  },
  async beforeMount() {
    try {
      getMovies({ movie_id: this.movieId }).then((res) => {
        const { data } = res.data;
        this.movieInfo = data?.[0];
      });
      getMoviesSessions({ movie_id: this.movieId }).then((res) => {
        const { data } = res.data;
        this.sessionsDays = data[this.movieId];
      });
    } catch {
      console.error("Something went wrong");
    }
  },
});
</script>

<template>
  <div v-if="movieInfo" class="movie-page pb-8">
    <h1 class="mb-2 text-2xl md:text-3xl md:mb-4" v-html="movieInfo.name"></h1>
    <div class="md:flex align-start">
      <img
        class="w-full md:w-[300px] h-full mb-2 shrink-0"
        :src="movieInfo.image"
        :alt="movieInfo.name"
      />
      <div class="description md:pl-4">
        <p
          class="text-sm text-left md:text-base"
          v-html="movieInfo.description"
        ></p>
        <div class="additional" v-html="movieInfo.additional"></div>
      </div>
    </div>
    <template v-if="sessionsDays">
      <day-list :sessionsDays="sessionsDays" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.movie-page {
  img {
    object-fit: cover;
    object-position: top;
  }
  .additional {
    @apply pt-4;
    &::v-deep {
      ul {
        @apply pl-0 md:grid grid-cols-2;
      }
      .key {
        @apply mb-0 font-bold shrink-0 text-blue-200;
      }
      li {
        @apply pr-3 mb-3;
      }
    }
  }
}
</style>
