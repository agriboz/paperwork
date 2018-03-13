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
    async makeSearch({ commit, rootState }) {
      const searchData = rootState.widgetForm.item
      const { data } = await this.$axios.post(
        `document/employee/search`,
        searchData
      )
      return data ? commit('setSearchResult', data) : null
    }
  }
}

export default search
