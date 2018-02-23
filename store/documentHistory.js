const documentHistory = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setDocumentHistory (state, payload) {
      state.data = payload
    }
  },
  actions: {
    async getDocumentHistory ({ commit, rootState }) {
      const flowId = rootState.widgetForm.editItem.flowId
      const { data } = await this.$axios.get(`document/employee/flow/${flowId}/history`)
      return data ? commit('setDocumentHistory', data) : null
    },
  }
}

export default documentHistory
