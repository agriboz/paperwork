const tasks = {
  namespaced: true,
  state: {
    data: [],
    buddyInformation: null
  },

  mutations: {
    setTasks(state, payload) {
      state.data = payload
    },
    editItem(state, payload) {
      state.item = payload
    },
    setBuddyInformation(state, payload) {
      state.buddyInformation = payload
    }
  },
  actions: {
    async getTasks({ commit }) {
      const { status, data } = await this.$axios.get(`employee/task/waiting`)

      return status === 200 ? commit('setTasks', data) : []
    },
    async getTaskById({ commit }, payload) {
      const { data } = await this.$axios.get(`document/eba/${payload}`)
      commit('editItem', data)
    },

    async isTaskApproved({ state }, payload) {
      await this.$axios.post(`document/employee/${payload}`, state.item)
    },

    async getBuddy({ commit }, employeeId) {
      const { data } = await this.$axios.get(`employee/${employeeId}`)
      commit('setBuddyInformation', data)
    },
    async setBuddy({ state }) {
      const { status, data } = await this.$axios.post(
        `document/employee/assignBuddy`,
        state.item
      )
      return status === 200 && data ? this.$router.push('/tasks') : false
    }
  }
}

export default tasks
