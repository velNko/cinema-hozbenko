<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    opened: { type: Boolean, default: false },
    ticketInfo: { type: Object, required: true },
    error: { default: null },
  },
  emits: ["update:opened"],
  computed: {
    isOpened: {
      get() {
        return this.opened;
      },
      set(value) {
        this.$emit("update:opened", value);
      },
    },
  },
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpened"
      class="modal fixed p-5 bg-black z-20 rounded-sm top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    >
      <template v-if="!error">
        <h4 class="text-lg mb-3 text-center">Here is info about your ticket</h4>
        <p class="mb-1">
          Date and time:
          <span class="text-blue-300"
            >{{ ticketInfo.showdate }} {{ ticketInfo.daytime }}</span
          >
        </p>
        <p class="mb-1">
          Row
          <span class="text-blue-300">{{ ticketInfo.row }} </span>
          seat
          <span class="text-blue-300"> {{ ticketInfo.seat }}</span>
        </p>
        <p class="mb-3">
          Ticket key
          <span class="text-blue-300">{{ ticketInfo.ticketkey }} </span>
        </p>
      </template>
      <h4 v-else class="text-lg mb-3 text-center">{{ error }}</h4>
      <button class="ml-auto flex" @click="isOpened = false">Close</button>
    </div>
  </Teleport>
</template>
