<template>
  <div class="sidebar">
    <div class="loginUserInfo">
      <div class="userPhoto">
        <img v-if="employee.image" :src="`data:image/png;base64, ${employee.image}`" class="employee-image">
        <b-icon v-else icon="account-circle" size="is-large"/>
      </div>

      <div class="userName">
        {{ employee.name }} {{ employee.surname }}
      </div>
      <div class="userTitle">
        {{ employee.title }}
      </div>
      <div class="userId">
        {{ employee.registry }}
      </div>
    </div>
    <aside class="menu">
      <ul class="menu-list">
        <li v-if="isRecruitmentOperation">
          <a href="#" class="menu-link" @click.prevent="subMenu.first = !subMenu.first">
            <b-icon icon="home"/>
            <span class="menu-item">İşe Giriş İşlemleri</span>
            <b-icon :icon="subMenu.first ? 'chevron-down' : 'chevron-left' "/>
          </a>
          <ul v-if="subMenu.first" style="margin-top:0">
            <li v-if="isRecruitmentOperation">
              <nuxt-link to="/white-collar" class="menu-link" exact>
                <b-icon icon="human-handsup"/>
                <span class="menu-item">BY İşe Giriş</span>
              </nuxt-link>
            </li>
            <li v-if="isRecruitmentOperation">
              <nuxt-link to="/" class="menu-link" exact>
                <b-icon icon="account-search"/>
                <span class="menu-item">BY Arama</span>
              </nuxt-link>
            </li>
          </ul>
        </li>

        <li>
          <nuxt-link to="/tasks" class="menu-link" exact>
            <b-icon icon="file-check"/>
            <span class="menu-item">Görevlerim</span>
          </nuxt-link>
        </li>
        <li v-if="isDocumentationEmployee">
          <a href="#" class="menu-link" @click.prevent="subMenu.second = !subMenu.second">
            <b-icon icon="file"/>
            <span class="menu-item">Dokümantason İşlemleri</span>
            <b-icon :icon="subMenu.second ? 'chevron-down' : 'chevron-left' "/>
          </a>
          <ul v-if="subMenu.second" style="margin-top:0">
            <li>
              <a class="menu-link" href="//10.10.27.36:2216/">
                <b-icon icon="home"/>
                <span class="menu-item">Arama</span>
              </a>
            </li>
            <li>
              <a class="menu-link" exact href="//10.10.27.36:2216/registry">
                <b-icon icon="worker"/>
                <span class="menu-item">Personel Sicil Numarası Tanımlama</span>
              </a>
            </li>
            <li>
              <a class="menu-link" exact href="//10.10.27.36:2216/box-document-list">
                <b-icon icon="file-document"/>
                <span class="menu-item">Kutu Evrak Listesi</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    subMenu: {
      first: false,
      second: false
    }
  }),
  computed: {
    isDocumentationEmployee() {
      return this.employee.roles.find(item => item.id === 7)
    },
    isClient() {
      return this.employee.roles.find(item => item.id === 1)
    },
    isRecruitmentOperation() {
      return this.employee.roles.find(item => item.id === 4)
    },
    ...mapState(['ui', 'employee']),
    ...mapGetters({
      menu: 'ui/menu'
    })
  }
}
</script>

<style scoped>
.sidebar {
  top: 1rem;
  width: 210px;
  margin-left: -20px;
  z-index: 1;
  transition: width 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.sidebar:hover {
  box-shadow: 4px 4px 20px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}

.hide-sidebar {
  position: fixed;
  width: 0;
  margin-top: 1rem;
  margin-left: -20px;
  transition: all 0.5s linear;
}

.menu-link {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  transition: all 0.15s ease-in-out;
}
.menu-list a {
  align-items: center;
  display: flex;
}

.material-icons {
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  display: inline-flex;
}

.menu-list a {
  font-size: 13px;
}

.menu-list a.is-active {
  background-color: #e0e3f2;
  color: #34495e;
  border-left: 3px solid #34495e;
}
</style>
