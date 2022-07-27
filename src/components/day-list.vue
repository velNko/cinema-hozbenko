<script>
import { defineComponent } from "vue";
import { getSessionPlaces } from "@/api/movies.js";
import CinemaHall from "@/components/cinema-hall.vue";

export default defineComponent({
  name: "DayList",
  components: {
    CinemaHall,
  },
  props: {
    sessionsDays: {
      type: Array,
      required: true,
    },
  },
  inject: ["movieId"],
  data() {
    return {
      checkedPlace: [],
      sessionsPlaces: null,
      choosenDay: null,
      cinemaKey: 0,
    };
  },
  computed: {
    availableTime() {
      return this.choosenDay?.daytime?.split(";");
    },
    showHall() {
      return this.sessionsPlaces?.showdate === this.choosenDay?.showdate;
    },
  },
  methods: {
    getPlaces(daytime) {
      const showdate = this.choosenDay?.showdate;
      this.checkedPlace = [];
      getSessionPlaces({
        movie_id: this.movieId,
        showdate,
        daytime,
      }).then((res) => {
        const { data } = res.data;
        this.cinemaKey++;
        this.sessionsPlaces = { showdate, daytime, data };
      });
    },
    chooseDay(day) {
      if (this.choosenDay?.showdate === day.showdate) {
        this.choosenDay = null;
        return;
      }
      this.choosenDay = day;
    },
  },
});
</script>

<template>
  <div>
    <h2 class="text-2xl py-4 text-blue-400 text-center">
      Session days and time
    </h2>
    <div class="flex flex-wrap items-start mb-3 justify-center">
      <h4
        v-for="day in sessionsDays"
        class="px-2 cursor-pointer mr-2 mb-2 p-1 rounded-sm border shrink-0"
        :key="day.showdate"
        :class="{
          'opacity-50': choosenDay && choosenDay.showdate !== day.showdate,
          'bg-blue-400': choosenDay && choosenDay.showdate === day.showdate,
        }"
        @click="chooseDay(day)"
      >
        {{ day.showdate.split("-").reverse().join("-") }}
      </h4>
    </div>
    <template v-if="choosenDay && availableTime">
      <div class="flex flex-wrap mb-4 justify-center">
        <p
          v-for="(time, i) in availableTime"
          :key="i"
          :class="[
            sessionsPlaces && sessionsPlaces.daytime === time
              ? 'bg-blue-400 text-white'
              : 'bg-blue-100',
          ]"
          class="rounded-sm px-2 cursor-pointer text-black hover:bg-blue-200 transition-all mr-1 mb-1"
          @click="getPlaces(time)"
        >
          {{ time }}
        </p>
      </div>
      <cinema-hall
        v-if="showHall"
        :key="cinemaKey"
        :sessionsPlaces="sessionsPlaces"
      />
    </template>
  </div>
</template>
