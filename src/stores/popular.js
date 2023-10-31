import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const usePopular = defineStore({
  id: "popular",
  state: () => ({
    movie: null,
    tv:null,
    url: "https://api.themoviedb.org/3/",
  }),
  actions: {
    async getPopular({type}, page = 1) {
      let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}/${type}/popular?language=ru-RU&page=${page}`, options);
        this[type] = res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
