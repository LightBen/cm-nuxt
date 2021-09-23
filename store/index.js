// holds your root state
export const state = () => ({
    cuisinePage: null,
    ogPageArticles: null,
    ogPageHalakha: null,
    ogPageHazanout: null,
    ogPagemix: null
  })
  
  // contains your mutations
  export const mutations = {
    setCuisinePage(state, value){
      state.cuisinePage = value
    },
    setOgPageArticles(state, value) {
      state.ogPageArticles = value
    },
    setogPageHalakha(state, value) {
      state.ogPageHalakha = value
    },
    setogPageHazanout(state, value) {
      state.ogPageHazanout = value
    },
    setogPagemix(state, value) {
      state.ogPagemix =value
    }

  }

  // contains your actions
  export const actions = {
    setCuisinePage({ state, commit }){
      commit('setCuisinePage', cuisinePage )
    },
    setOgPageArticles({ state, commit }) {
      commit('setOgPageArticles', ogPageArticles)
    },
    setogPageHalakha({state, commit}) {
      commit('setogPageHalakha', ogPageHalakha)
    },
    setogPageHazanout({state, commit}) {
      commit('setogPageHazanout', ogPageHazanout)
    },
    setogPagemix({state, commit}) {
      commit('setogPagemix', ogPagemix)
    }
  }
  // your root getters
  export const getters = {
    cuisinePage (state) {
       return state.cuisinePage
    },
    ogPageArticles (state) {
      return state.ogPageArticles
    },
    ogPageHalakha (state) {
      return state.ogPageHalakha
    },
    ogPageHazanout (state) {
      return state.ogPageHazanout
    },
    ogPagemix (state) {
      return state.ogPagemix
    }
  }