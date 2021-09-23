// holds your root state
export const state = () => ({
    cuisinePage: null
  })
  
  // contains your mutations
  export const mutations = {
    setCuisinePage(state, value){
      state.cuisinePage = value
    }
  }

  // contains your actions
  export const actions = {
    setCuisinePage({ state, commit }){
      commit('setCuisinePage', cuisinePage )
    }
  }
  // your root getters
  export const getters = {
    cuisinePage (state) {
       return state.cuisinePage
      }
  }