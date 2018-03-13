const widgetForm = {
  namespaced: true,
  state: {
    item: {
      documentDetails: [],
      ebaStatus: null,
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
        isOutsourceTransfer: false,
        isDoctorAppointmentSet: false,
        manager: {
          name: null
        }
      }
    },
    editItem: {
      documentDetails: []
    },
    isFirstTabInValid: true,
    isSecondTabInValid: true,
    isThirdTabInValid: true
  },
  mutations: {
    item(state, payload) {
      Object.assign(state.item, payload)
    },

    isFirstTabInValid(state, payload) {
      state.isFirstTabInValid = payload
    },

    isSecondTabInValid(state, payload) {
      state.isSecondTabInValid = payload
    },

    isThirdTabInValid(state, payload) {
      state.isThirdTabInValid = payload
    },

    isCompanyChanged(state, payload) {
      state.isCompanyChanged = payload
    },
    isFormDraft(state, payload) {
      state.isFormDraft = payload
    },

    editItem(state, payload) {
      state.editItem = payload
    },

    manager(state, payload) {
      state.item.enrollment.manager = payload
    },

    addDocumentList(state, payload) {
      state.editItem.documentDetails = [
        ...state.editItem.documentDetails,
        payload
      ]
    },

    setDocumentList(state, payload) {
      state.item.documentDetails = payload
    },

    addNewDocumentList(state, payload) {
      state.item.documentDetails = [...state.item.documentDetails, payload]
    }
  },

  actions: {
    async getDocumentDetails({ commit }, payload) {
      console.log(payload)
      const { data } = await this.$axios.post(
        `organization/documents/all`,
        payload
      )

      return data ? commit('setDocumentList', data) : null
    },

    async getEditItem({ commit }, payload) {
      const { data } = await this.$axios.get(`document/employee/${payload}`)
      commit('editItem', data)
    },

    async addDocumentList({ commit }, payload) {
      await this.$axios.post(`document/employee/detail/`, payload)
      commit('addDocumentList', payload)
    },

    async addNewDocumentList({ commit }, payload) {
      commit('addNewDocumentList', payload)
    },

    async saveAsDraft({ state, rootState }) {
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

      const sendDraftData = Object.assign({}, getState, {
        entryUser: {
          id: rootState.shared.employee.id
        },
        documentGroup: {
          id: 1
        }
      })

      await this.$axios.post(`document/employee/`, sendDraftData)
    },

    async updateAsDraft({ state }) {
      await this.$axios.put(
        `document/employee/${state.editItem.id}`,
        state.editItem
      )
    },

    async deleteDocument({ state }) {
      await this.$axios.delete(`document/employee/${state.editItem.id}`)
    },

    async startEmployment({ rootState }, payload) {
      const getState = {
        ...payload,
        enrollment: {
          ...payload.enrollment,
          employeeType: {
            id: 1
          },
          entryUser: {
            id: rootState.shared.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({}, getState, {
        organization: {
          id: payload.enrollment.organization.id
        },
        entryUser: {
          id: rootState.shared.employee.id
        },
        documentGroup: {
          id: 1
        }
      })

      await this.$axios.post(`document/employee/startEmployment`, sendDraftData)
    },

    async startBPProcess({ rootState }) {
      const id = rootState.widgetForm.editItem.id

      await this.$axios.post(`document/employee/sendmanagerapprove`, { id })
    },

    async sendToDocumentationTeam(payload) {
      await this.$axios.post(`document/employee/startdocumentation`, payload)
    },

    async deleteDocument({ rootState }) {
      const id = rootState.widgetForm.editItem.id
      const { status, data } = await this.$axios.delete(
        `document/employee/${id}`
      )
      status === 200 && data
        ? this.$router.push('/white-collar')
        : this.$toast.open({
            type: 'is-warning',
            message: statusText
          })
    },

    async cancelDocument({ rootState }) {
      const id = rootState.widgetForm.editItem.id
      const { status, data } = await this.$axios.delete(
        `document/employee/${id}`
      )
      status === 200 && data
        ? this.$router.push('/white-collar')
        : this.$toast.open({
            type: 'is-warning',
            message: statusText
          })
    }
  }
}

export default widgetForm
