<script>
import { defineComponent } from "vue";
import { postBookedPlace } from "@/api/movies";
import TicketModal from "@/components/ticket-modal.vue";

export default defineComponent({
  name: "CinemaHall",
  props: {
    sessionsPlaces: {
      required: true,
    },
  },
  components: { TicketModal },
  inject: ["movieId"],
  data() {
    return {
      checkedPlace: null,
      openTicket: false,
      bookedSeats: [],
      ticketInfo: {},
      error: null,
    };
  },
  methods: {
    isChecked(place, seatRow) {
      const { seat, row } = this.destructPlaceParams(place, seatRow);
      return this.checkedPlace?.seat === seat && this.checkedPlace?.row === row;
    },
    checkPlace(place, seatRow) {
      if (this.isBooked(place, seatRow) || !place.is_free) return;

      const duplicate = this.isChecked(place, seatRow);

      if (duplicate) {
        this.checkedPlace = null;
        return;
      }

      const { seat, row } = this.destructPlaceParams(place, seatRow);
      this.checkedPlace = { seat, row };
    },
    isBooked(place, seatRow) {
      const { seat, row } = this.destructPlaceParams(place, seatRow);
      return this.bookedSeats.find(
        (booked) => booked.seat === seat && booked.row === row
      );
    },
    bookPlace() {
      const { row, seat } = this.checkedPlace;
      const { showdate, daytime } = this.sessionsPlaces;
      postBookedPlace({
        movie_id: this.movieId,
        row,
        seat,
        showdate,
        daytime,
      })
        .then((res) => {
          this.checkedPlace = null;
          this.openTicket = true;
          this.bookedSeats.push({ row, seat });
          this.ticketInfo = res.data.data;
        })
        .catch((err) => {
          this.openTicket = true;
          this.error =
            err?.response?.statusText ||
            "You can`t book this seat. Please try another one";
        });
    },
    destructPlaceParams(place, seatRow) {
      const seat = place?.seat;
      const row = seatRow?.[0]?.row;
      return { seat, row };
    },
  },
});
</script>

<template>
  <div class="pb-3 pl-3">
    <div class="cinema-holl pb-3 mb-3 overflow-x-auto width-full relative">
      <div
        v-for="row in sessionsPlaces.data"
        :key="row[0].row"
        class="flex w-fit"
      >
        <p
          class="row-item sticky z-10 bg-blue-900 text-center top-[2px] left-0 m-1"
        >
          {{ row[0].row }}
        </p>
        <p
          v-for="place in row[1]"
          class="places m-1"
          :class="{
            'not-free': !place.is_free || isBooked(place, row),
            checked: isChecked(place, row),
          }"
          @click="checkPlace(place, row)"
        >
          {{ place.seat }}
        </p>
      </div>
    </div>
    <button
      class="bg-blue-500 text-white w-full md:w-auto px-8 py-1 rounded-sm disabled:opacity-50"
      :disabled="!checkedPlace"
      @click="bookPlace"
    >
      Book Place
    </button>
    <ticket-modal
      v-model:opened="openTicket"
      :ticketInfo="ticketInfo"
      :error="error"
    />
  </div>
</template>

<style lang="scss">
.cinema-holl {
  .row-item,
  .places {
    min-width: 20px;
    height: 20px;
    font-size: 12px;
    margin-bottom: 0;
    border-radius: 3px;
  }
  .places {
    background: white;
    color: black;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: rgb(114, 142, 254);
    }
    &.not-free {
      color: white;
      background: rgb(104, 104, 104);
    }
    &.checked {
      color: white;
      background: rgb(32, 73, 239);
    }
  }
}
</style>
