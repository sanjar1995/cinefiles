import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useSearch = defineStore({
  id: "search",
  state: () => ({
    word:'',
    movie: null,
    url: "https://api.themoviedb.org/3/search/multi",
  }),
  actions: {
    async getSearch(search) {
      let options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      };
      try {
        const res = await axios(`${this.url}?query=${search}&language=ru-RU`, options);
        this.movie = res.data.results
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getMovie(){
        return this.movie?.filter((el,index)=> index < 8)
    }
  },
});
