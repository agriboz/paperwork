const documentHistory = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setDocumentHistory(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async getDocumentHistory({ commit, rootState }) {
      // const flowId = rootState.widgetForm.editItem.flowId
      const id = rootState.widgetForm.editItem.id
      const { data } = await this.$axios.get(`sendinginfo/documentmaster/${id}`)
      return data ? commit('setDocumentHistory', data) : null
    }
  }
}

export default documentHistory
