import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useCast = defineStore({
  id: "cast",
  state: () => ({
    movie: null,
    tv:null,
    url: "https://api.themoviedb.org/3/",
  }),
  actions: {
    async getCast(type, id) {
        let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}${type}/${id}/credits?language=ru-RU`, options);
        this[type] = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
  },
});
