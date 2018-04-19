const search = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setSearchResult(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async makeSearch({ commit }, payload) {
      const searchData = {
        ...payload.enrollment,
        ...payload
      }
      // todo -> deconstruct object
      delete searchData.enrollment
      const { data } = await this.$axios.post(
        `document/employee/search`,
        searchData
      )
      return data ? commit('setSearchResult', data) : null
    }
  }
}

export default search
