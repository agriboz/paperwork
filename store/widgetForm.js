const widgetForm = {
  namespaced: true,
  state: {
    item: {
      documentDetails: [],
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
    editItem: {
      documentDetails: []
    },
    isCompanyChanged: false,
    isFormDraft: true,
    canStartEmploymentIsInvalid: true
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

      if (!state.item.enrollment.isOutsourceTransfer) {
        delete state.item.enrollment.seniorityStartDate
        delete state.item.enrollment.leaveDate
        delete state.item.enrollment.transferDate
        delete state.item.enrollment.leaveDayCost
      }

      if (!state.item.enrollment.isSendWelcomeKit) {
        delete state.item.enrollment.welcomeKitType
      }


    },
    isCompanyChanged (state, payload) {
      state.isCompanyChanged = payload
    },
    isFormDraft (state, payload) {
      state.isFormDraft = payload
    },

    canStartEmployment (state, payload) {
      state.canStartEmploymentIsInvalid = payload
    },

    editItem (state, payload) {
      state.editItem = payload
    },

    manager (state, payload) {
      state.item.enrollment.manager = payload
    },

    addDocumentList (state, payload) {
      state.editItem.documentDetails = [...state.editItem.documentDetails, payload]
    },

    setDocumentList (state, payload) {
      state.item.documentDetails = payload
    },

    addNewDocumentList (state, payload) {
      state.item.documentDetails = [...state.item.documentDetails, payload]
    }


  },

  actions: {
    async getDocumentDetails ({ commit }, payload) {
      const { data } = await this.$axios.post(`organization/documents/all`, payload)

      return data ? commit('setDocumentList', data) : null
    },

    async getEditItem ({ commit }, payload) {
      const { data } = await this.$axios.get(`document/employee/${payload}`)
      commit('editItem', data)
    },

    async addDocumentList ({ commit }, payload) {
      const { data } = await this.$axios.post(`document/employee/detail/`, payload)
      commit('addDocumentList', payload)
    },

    async addNewDocumentList ({ commit }, payload) {
      commit('addNewDocumentList', payload)
    },

    async saveAsDraft ({ commit, state, rootState }, payload) {
      const getState = {
        ...state.item,
        enrollment: {
          ...state.item.enrollment,
          employeeType: {
            id: 1
          },
          entryUser: {
            id: rootState.shared.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({},
        getState,
        {
          entryUser: {
            id: rootState.shared.employee.id
          },
          documentGroup: {
            id: 1
          }
        }
      )

      const { data} = await this.$axios.post(`document/employee/`, sendDraftData)

    },

    async updateAsDraft ({ commit, state, rootState }, payload) {
      const { data} = await this.$axios.put(`document/employee/${state.editItem.id}`, state.editItem)
    },

    async deleteDocument ({ commit, state }) {
      const { data} = await this.$axios.delete(`document/employee/${state.editItem.id}`)
    },

    async startEmployment ({ commit, state, rootState }) {
      const getState = {
        ...state.item,
        enrollment: {
          ...state.item.enrollment,
          employeeType: {
            id: 1
          },
          entryUser: {
            id: rootState.shared.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({},
        getState, {
          entryUser: {
            id: rootState.shared.employee.id
          },
          documentGroup: {
            id: 1
          }
        }
      )

      const { data} = await this.$axios.post(`document/employee/startEmployment`, sendDraftData)
    },

  }
}

export default widgetForm

