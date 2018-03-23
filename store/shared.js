const shared = {
  namespaced: true,
  state: {
    organizations: [],
    companies: [],
    workLocations: [],
    SGKLocations: [],
    hrBusinessPartnerEmployees: [],
    managers: [],
    categories: [],
    reqruitmentEmployees: [],
    documentStatus: [],
    channels: [],
    welcomeKitTypes: [],
    buddyTypes: [],
    buddyEmployees: [],
    ebaStatus: [],
    surveyorEmployees: []
  },
  mutations: {
    setOrganizations(state, payload) {
      state.organizations = payload
    },
    setCompanies(state, payload) {
      state.companies = payload
    },
    setWorkLocations(state, payload) {
      state.workLocations = payload
    },
    setSGKLocations(state, payload) {
      state.SGKLocations = payload
    },
    setHrBusinessPartnerEmployees(state, payload) {
      state.hrBusinessPartnerEmployees = payload
    },
    setManagers(state, payload) {
      state.managers = payload
    },
    setCategories(state, payload) {
      state.categories = payload
    },
    setReqruitmentEmployees(state, payload) {
      state.reqruitmentEmployees = payload
    },
    setDocumentStatus(state, payload) {
      state.documentStatus = payload
    },
    setChannels(state, payload) {
      state.channels = payload
    },
    setWelcomeKitTypes(state, payload) {
      state.welcomeKitTypes = payload
    },
    setBuddyTypes(state, payload) {
      state.buddyTypes = payload
    },
    setBuddyEmployees(state, payload) {
      state.buddyEmployees = payload
    },
    setEbaStatus(state, payload) {
      state.ebaStatus = payload
    },
    setSurveyorEmployees(state, payload) {
      state.surveyorEmployees = payload
    }
  },

  actions: {
    async getEbaStatus({ commit }) {
      const { data } = await this.$axios.get(`document/eba/status`)

      return data ? commit('setEbaStatus', data) : null
    },

    async getOrganizations({ commit }) {
      const { data } = await this.$axios.get(`organization`)

      return data ? commit('setOrganizations', data) : null
    },

    async getSurveyorEmployees({ commit, rootState }) {
      const id =
        rootState.widgetForm.editItem.enrollment.organization.id ||
        rootState.widgetForm.item.enrollment.organization.id

      const { data } = await this.$axios.post(`organization/managers`, {
        id,
        name: ''
      })

      return data ? commit('setSurveyorEmployees', data) : null
    },

    async getCompanies({ commit }, payload) {
      const { data } = await this.$axios.get(`company/${payload}`)

      return data ? commit('setCompanies', data) : null
    },

    async getWorkLocations({ commit }, payload) {
      const { data } = await this.$axios.get(`company/${payload}/locations`)

      return data
        ? (commit('setWorkLocations', data), commit('setSGKLocations', data))
        : null
    },

    async getHrBusinessPartnerEmployees({ commit }, payload) {
      const { data } = await this.$axios.get(
        `organization/${payload}/businesspartners`
      )

      return data ? commit('setHrBusinessPartnerEmployees', data) : null
    },

    async getManagers({ commit }, payload) {
      if (payload.name.length >= 3) {
        const { data } = await this.$axios.post(
          `organization/managers`,
          payload
        )
        return data ? commit('setManagers', data) : null
      }
    },

    async getCategories({ commit }, payload) {
      const { data } = await this.$axios.get(
        `organization/${payload}/document/categories`
      )

      return data ? commit('setCategories', data) : null
    },

    /* async getReqruitmentEmployees ({ commit, rootState }, payload) {
      const organizationId = rootState.widgetForm.item.enrollment.organization.id

      const roleId = 5
      const { data } = await this.$axios.post(`role/organization/employees`, {organizationId, roleId})

      return data ? commit('setReqruitmentEmployees', data) : null
    }, */

    async getReqruitmentEmployees({ commit }) {
      const roleId = 4
      const { data } = await this.$axios.get(`roles/${roleId}/employees`)

      return data ? commit('setReqruitmentEmployees', data) : null
    },

    async getDocumentStatus({ commit }) {
      const { data } = await this.$axios.get(`document/status`)

      return data ? commit('setDocumentStatus', data) : null
    },

    async getChannels({ commit }) {
      const { data } = await this.$axios.get(`contacttypes/basic`)

      return data ? commit('setChannels', data) : null
    },

    async getWelcomeKitTypes({ commit }) {
      const { data } = await this.$axios.get(`welcomeKitTypes/basic`)

      return data ? commit('setWelcomeKitTypes', data) : null
    },

    async getBuddyTypes({ commit }) {
      const { data } = await this.$axios.get(`employee/buddyType`)

      return data ? commit('setBuddyTypes', data) : null
    },

    async getBuddyEmployees({ commit }, payload) {
      const { data } = await this.$axios.get(`company/${payload}/employees`)

      return data ? commit('setBuddyEmployees', data) : null
    }
  }
}

export default shared
