const widgetForm = {
  namespaced: true,
  state: {
    item: {
      documentDetails: [],
      ebaStatus: {
        id: 1,
        name: 'Taslak Olarak Kayıtlı'
      },
      enrollment: {
        isBuddyAssigned: false,
        /* isSurveySent: false,
        isTookEngilshExam: false,
        IsExistsPersonalPrivateHealthInsurance: false,
        isHealthInsuranceIncludeFamily: false,
        isSendWelcomeKit: false,
        isDisabled: false,
        isRetired: false,
        isFormerWorker: false,
        isOutsourceTransfer: false,
        isDoctorAppointmentSet: false, */
        organization: {
          id: null
        },
        company: {
          id: null
        },
        workLocation: {
          id: null
        },
        sgkLocation: {
          id: null
        },
        contactType: {
          id: null
        },
        hrBusinessPartnerEmployee: {
          id: null
        },
        buddyEmployee: {
          id: null
        },

        manager: {
          name: null,
          id: null
        }
      }
    },
    editItem: {
      documentDetails: [],
      enrollment: {
        manager: {
          name: null,
          id: null
        }
      }
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
      state.editItem.enrollment.manager = payload
    },

    addDocumentList(state, payload) {
      state.editItem.documentDetails = [
        ...state.editItem.documentDetails,
        payload
      ]
    },

    setDocumentList(state, payload) {
      console.log(state.item.documentDetails)
      state.item.documentDetails = payload
    },

    addNewDocumentList(state, payload) {
      state.item.documentDetails = [...state.item.documentDetails, payload]
    },

    setNewDocumentList(state, payload) {
      const removeDocument = (collection, key) => {
        return collection.filter(item => {
          return item[key] !== payload.item[key]
        })
      }
      if (payload.edit) {
        console.log('object')
        state.editItem.documentDetails = removeDocument(
          state.editItem.documentDetails,
          'detailId'
        )
      }

      if (!payload.edit) {
        state.item.documentDetails = removeDocument(
          state.item.documentDetails,
          'organizationDocumentId'
        )
      }

      state.item.documentDetails = state.item.documentDetails.filter(
        item =>
          item['organizationDocumentId'] !==
          payload.item['organizationDocumentId']
      )
    }
  },

  actions: {
    async getDocumentDetails({ commit }, payload) {
      console.log(payload)
      const { data } = await this.$axios.post(
        `organization/documents/all`,
        payload
      )

      return data.length ? commit('setDocumentList', data) : null
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
            id: rootState.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({}, getState, {
        organization: state.item.enrollment.organization,
        entryUser: {
          id: rootState.employee.id
        },
        documentGroup: {
          id: 1
        }
      })

      await this.$axios
        .post(`document/employee/`, sendDraftData)
        .then(() => this.$router.push('/'))
    },

    async updateAsDraft({ state }, payload) {
      await this.$axios
        .put(`document/employee/${state.editItem.id}`, {
          ...state.editItem,
          documentDetails: payload,
          organization: state.editItem.enrollment.organization
        })
        .then(() => this.$router.push('/'))
    },

    async deleteDocument({ state }) {
      await this.$axios
        .delete(`document/employee/${state.editItem.id}`)
        .then(() => this.$router.push('/'))
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
            id: rootState.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({}, getState, {
        organization: {
          id: payload.enrollment.organization.id
        },
        entryUser: {
          id: rootState.employee.id
        },
        documentGroup: {
          id: 1
        }
      })

      await this.$axios
        .post(`document/employee/startEmployment`, sendDraftData)
        .then(() => this.$router.push('/'))
    },

    async updateEmployment({ rootState }, payload) {
      const getState = {
        ...payload,
        enrollment: {
          ...payload.enrollment,
          employeeType: {
            id: 1
          },
          entryUser: {
            id: rootState.employee.id
          }
        }
      }

      const sendDraftData = Object.assign({}, getState, {
        organization: {
          id: payload.enrollment.organization.id
        },
        entryUser: {
          id: rootState.employee.id
        },
        documentGroup: {
          id: 1
        }
      })

      await this.$axios.put(`document/employee/${payload.id}`, sendDraftData)
    },

    async startBPProcess({ rootState }) {
      const id = rootState.widgetForm.editItem.id
      const requestId = rootState.widgetForm.editItem.requestId

      await this.$axios
        .post(`document/employee/sendmanagerapprove`, {
          id,
          requestId
        })
        .then(() => this.$router.push('/'))
    },

    async sendToDocumentationTeam({ rootState }, payload) {
      const requestId = rootState.tasks.requestId
      const data = {
        ...payload,
        requestId
      }
      await this.$axios
        .post(`document/employee/startdocumentation`, data)
        .then(() => this.$router.push('/'))
    },

    /* async deleteDocument({ rootState }) {
      const id = rootState.widgetForm.editItem.id
      const { status, data, statusText } = await this.$axios.delete(
        `document/employee/${id}`
      )
      status === 200 && data
        ? this.$router.push('/white-collar')
        : this.$toast.open({
            type: 'is-warning',
            message: statusText
          })
    }, */

    async cancelDocument({ rootState }) {
      const id = rootState.widgetForm.editItem.id
      const requestId = rootState.widgetForm.editItem.requestId
      const { status, data, statusText } = await this.$axios.delete(
        `document/employee/${id}`,
        {
          data: {
            requestId,
            id
          }
        }
      )
      status === 200 && data
        ? this.$router.push('/')
        : this.$toast
            .open({
              type: 'is-warning',
              message: statusText
            })
            .then(() => this.$router.push('/'))
    }
  }
}

export default widgetForm
