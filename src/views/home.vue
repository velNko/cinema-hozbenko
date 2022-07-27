<script>
import { defineComponent } from "vue";
import movieItem from "../components/movie-item.vue";
import { getMovies } from "@/api/movies.js";

export default defineComponent({
  name: "Home",
  components: { movieItem },
  data() {
    return {
      movies: null,
      choosenGenre: null,
      searchMovie: "",
      showAllButton: false,
      genres: [
        { id: 0, name: "action" },
        { id: 1, name: "adventures" },
        { id: 2, name: "comedy" },
        { id: 3, name: "drama" },
        { id: 4, name: "horror" },
        { id: 5, name: "westerns" },
      ],
    };
  },
  computed: {
    filteredMovies() {
      if (this.choosenGenre !== null) {
        return this.movies.filter((movie) => movie.genre === this.choosenGenre);
      }
      return this.movies;
    },
  },
  created() {
    this.getAllMovies();
  },
  methods: {
    getAllMovies() {
      return getMovies()
        .then((res) => {
          this.movies = res.data.data;
        })
        .catch((err) => console.error(err));
    },
    checkGenre(id) {
      if (this.choosenGenre === id) {
        this.choosenGenre = null;
        return;
      }
      this.choosenGenre = id;
    },
    findMovie() {
      getMovies({ name: this.searchMovie })
        .then((res) => {
          this.movies = res.data.data;
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.showAllButton = true;
          this.searchMovie = "";
        });
    },
    showAll() {
      this.getAllMovies();
      this.showAllButton = false;
    },
  },
});
</script>

<template>
  <div class="p-5 h-full max-w-[1200px] mx-auto">
    <h1 class="text-3xl bold text-center pt-5 mb-5">Choose your movie</h1>
    <div class="flex flex-wrap mb-5 justify-center">
      <p
        v-for="genre in genres"
        :key="genre.id"
        class="border rounded-sm mr-2 px-3 py-1 first-letter:uppercase cursor-pointer"
        :class="{ 'bg-blue-200 text-black': genre.id === choosenGenre }"
        @click="checkGenre(genre.id)"
      >
        {{ genre.name }}
      </p>
    </div>
    <div class="flex justify-center mb-10">
      <input
        type="text"
        v-model="searchMovie"
        @keyup.enter="findMovie"
        placeholder="Find a movie"
        class="py-1 px-2 border border-white rounded-sm outline-none focus:border-blue-500 text-gray-800"
      />
      <button
        type="button"
        class="py-1 px-3 border mx-3 rounded-sm cursor-pointer transition-all hover:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        :disabled="!searchMovie"
        @click="findMovie"
      >
        Find
      </button>
    </div>
    <button
      v-if="showAllButton"
      class="block py-1 px-2 ml-auto mb-2 text-sm underline"
      type="button"
      @click="showAll"
    >
      Show all movies
    </button>
    <div class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-4">
      <template v-for="movie in filteredMovies" :key="movie.id">
        <movie-item :movie="movie" />
      </template>
    </div>
  </div>
</template>
