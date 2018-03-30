const documentHistory = {
  namespaced: true,
  state: {
    data: [],
    sendingInfo: []
  },
  mutations: {
    setDocumentHistory(state, payload) {
      state.data = payload
    },
    setSendingInfo(state, payload) {
      state.sendingInfo = payload
    }
  },
  actions: {
    async getDocumentHistory({ commit, rootState }) {
      // const flowId = rootState.widgetForm.editItem.flowId
      const id = rootState.widgetForm.editItem.id
      const { data } = await this.$axios.get(`sendinginfo/documentmaster/${id}`)
      return data ? commit('setDocumentHistory', data) : []
    },
    async getSendingInfo({ commit, rootState }) {
      // const flowId = rootState.widgetForm.editItem.flowId
      const id = rootState.widgetForm.editItem.flowId
      const { data } = await this.$axios.get(
        `document/employee/flow/${id}/history`
      )
      return data ? commit('setSendingInfo', data) : []
    }
  }
}

export default documentHistory
