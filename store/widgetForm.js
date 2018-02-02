const widgetForm = {
  namespaced: true,
  state: {
    item: {
      enrollment: {
        isBuddyAssigned: false,
        isSurveySent: false,
        isTookEngilshExam: false,
        IsExistsPersonalPrivateHealthInsurance: false,
        isHealthInsuranceIncludeFamily: false,
        isSendWelcomeKit: false,
        isDisabled: false,
        isRetired: false,
        isFormerWorker: false,
        isOutsourceTransfer: false
      }
    },
    editItem: {},
    isCompanyChanged: false,
    isFormDraft: true
  },
  mutations: {
    item (state, payload) {
      Object.assign(state.item, payload)

      if (state.item.enrollment.isBuddyAssigned) {
        delete state.item.enrollment.buddyType
      }

      if (!state.item.enrollment.isBuddyAssigned) {
        delete state.item.enrollment.buddyEmployee
      }

    },
    isCompanyChanged (state, payload) {
      state.isCompanyChanged = payload
    },
    isFormDraft (state, payload) {
      state.isFormDraft = payload
    },

    editItem (state, payload) {
      state.editItem = payload
    }
  },

  actions: {
    async getEditItem ({ commit }, payload) {
      const { data } = await this.$axios.get(`document/employee/${payload}`)
      commit('editItem', data)
    },
  }
}

export default widgetForm

