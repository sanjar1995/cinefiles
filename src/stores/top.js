import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useTop = defineStore({
  id: "top",
  state: () => ({
    movie: null,
    url: "https://api.themoviedb.org/3/",
  }),
  actions: {
    async getTop() {
      let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}movie/top_rated?language=ru-RU`, options);
        this.movie = res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getTop10: (state) =>state.movie && state.movie.filter((el, index)=>index < 10)
  },
});
