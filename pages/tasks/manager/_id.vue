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
            <b-select v-model="tasks.item.enrollment.buddyEmployee"
                      placeholder="Seçiniz..."
                      expanded
                      @input="getBuddy(tasks.item.enrollment.buddyEmployee.id)">
              <option v-for="b in shared.buddyEmployees" :key="b.id" :value="b">
                {{ b.name }}
              </option>
            </b-select>
          </b-field>
          <div class="loginUserInfo" style="border-bottom:none">
            <div v-if="tasks.buddyInformation" class="userPhoto" style="margin: 0 auto">
              <img :src="`data:image/png;base64, ${tasks.buddyInformation.image}`">
            </div>
          </div>
          <b-field v-if="tasks.buddyInformation" label="Sicil Numarası">
            <b-input :value="tasks.buddyInformation.registry" :disabled="true"/>
          </b-field>
          <b-field v-if="tasks.buddyInformation" label="Şirket">
            <b-input :value="tasks.buddyInformation.company.name" :disabled="true"/>
          </b-field>
          <b-field v-if="tasks.buddyInformation" label="Departman">
            <b-input :value="tasks.buddyInformation.department" :disabled="true"/>
          </b-field>
          <b-field v-if="tasks.buddyInformation" label="Lokasyon">
            <b-input :value="tasks.buddyInformation.location.name" :disabled="true"/>
          </b-field>
          <b-field v-if="tasks.buddyInformation" label="Ünvan">
            <b-input :value="tasks.buddyInformation.title" :disabled="true"/>
          </b-field>
        </div>
        <div class="field is-grouped is-pulled-right is-clearfix">
          <div class="control">
            <a class="button is-success" @click="setBuddy">Buddy Atamasını Yap</a>
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
  components: {
    EmployeeInformation,
    OrganizationDetail
  },
  async fetch({ store, params }) {
    await store.dispatch('tasks/getTaskById', params.id)
  },
  computed: {
    ...mapState(['tasks', 'shared'])
  },
  async beforeMount() {
    this.tasks.buddyInformation = null
    await this.getBuddyEmployees(this.tasks.item.enrollment.company.id)
    if (this.tasks.item.enrollment.buddyEmployee.id !== null) {
      await this.getBuddy(this.tasks.item.enrollment.buddyEmployee.id)
    }
  },
  methods: {
    ...mapActions({
      getBuddyEmployees: 'shared/getBuddyEmployees',
      getBuddy: 'tasks/getBuddy',
      setBuddy: 'tasks/setBuddy'
    })
  }
}
</script>
