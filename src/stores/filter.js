import { defineStore } from 'pinia';


export const useFilterStore = defineStore('filter', {
  state: () => {
    return { _countryFilter: null, _scoreFilter: null };
  },
  
  getters: {
    countryFilter: (state) => state._countryFilter,
    scoreFilter: (state) => state._scoreFilter
  },
  actions: {
    selectCountry(country) {
      this._countryFilter = country;
    },
    selectScore(score) {
      this._scoreFilter = score;
    }
  },
})