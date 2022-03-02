import { createStore } from 'vuex'

export default createStore({
  state: {
    lightOne: '默认',
    lightTwo: '默认'
  },
  mutations: {
    changeLightOne(state, color) {
      state.lightOne = color
    },
    changeLightTwo(state, color) {
      state.lightTwo = color
    }
  },
  actions: {
  },
  modules: {
  }
})
