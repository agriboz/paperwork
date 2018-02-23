<template>
  <section>
    <h1 class="title is-size-5">Görevlerim</h1>
    <h2 class="subtitle is-size-6">Budy Seçimi</h2>
    <hr>
    <div class="columns">
      <div class="column">
        <div class="form-wrapper" title="Personel Bilgileri" style="margin-bottom: 40px">
          <employee-information
            :item="tasks.item"
            :hide-buddy-page="true"
            :not-editable="true" />
        </div>

        <div class="form-wrapper" title="Organizasyon Bilgileri">
          <organization-detail
            :hide-buddy-page="true"
            :item="tasks.item"
            :not-editable="true" />
        </div>
      </div>
      <div class="column">
        <div class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px; margin-bottom: 20px">
            <b-field label="Buddy">
              <b-select placeholder="Seçiniz..."
                        @input="getBuddy(tasks.item.enrollment.buddyEmployee.id)"
                        v-model="tasks.item.enrollment.buddyEmployee"
                        expanded>
                  <option :key="b.id" :value="b" v-for="b in shared.buddyEmployees">
                      {{b.name}}
                  </option>
              </b-select>
            </b-field>
            <b-field label="Sicil Numarası" v-if="tasks.buddyInformation">
                <b-input :value="tasks.buddyInformation.registry" :disabled="true"></b-input>
            </b-field>
            <b-field label="Şirket" v-if="tasks.buddyInformation">
                <b-input :value="tasks.buddyInformation.company.name" :disabled="true"></b-input>
            </b-field>
            <b-field label="Departman" v-if="tasks.buddyInformation">
                <b-input :value="tasks.buddyInformation.department" :disabled="true"></b-input>
            </b-field>
            <b-field label="Lokasyon" v-if="tasks.buddyInformation">
                <b-input :value="tasks.buddyInformation.location.name" :disabled="true"></b-input>
            </b-field>
            <b-field label="Ünvan" v-if="tasks.buddyInformation">
                <b-input :value="tasks.buddyInformation.title" :disabled="true"></b-input>
            </b-field>
          </div>
          <div class="field is-grouped is-pulled-right is-clearfix">
            <div class="control">
              <a @click="setBuddy"  class="button is-success">Buddy Atamasını Yap</a>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EmployeeInformation from '@/components/PaperWorkWidget/EmployeeInformation'
import OrganizationDetail from '@/components/PaperWorkWidget/OrganizationDetail'

  export default {
    async fetch ({ store, params }) {
      await store.dispatch('tasks/getTaskById', params.id)
    },
    computed: {
      ...mapState(['tasks', 'shared'])
    },
    methods: {
      ...mapActions({
        getBuddyEmployees: 'shared/getBuddyEmployees',
        getBuddy: 'tasks/getBuddy',
        setBuddy: 'tasks/setBuddy'
      })
    },
    async beforeMount () {
      await this.getBuddyEmployees(this.tasks.item.enrollment.company.id)
      await this.getBuddy(this.tasks.item.enrollment.buddyEmployee.id)
    },
    components: {
      EmployeeInformation,
      OrganizationDetail
    }
  }
</script>

<style scoped>

</style>
