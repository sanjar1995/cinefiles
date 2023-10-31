import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useRecommended = defineStore({
  id: "recommended",
  state: () => ({
    movie: null,
    tv:null,
    url: "https://api.themoviedb.org/3/",
  }),
  actions: {
    async getRecommended(type, id) {
        let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}${type}/${id}/recommendations?language=ru-RU`, options);
        this[type] = res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
  },
});
