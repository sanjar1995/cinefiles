import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useUpcoming = defineStore({
  id: "useUpcoming",
  state: () => ({
    upcoming: null,
    url: "https://api.themoviedb.org/3/movie/upcoming",
  }),
  actions: {
    async getUpcoming() {
      let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}?language=ru-RU`, options);
        this.upcoming = res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
