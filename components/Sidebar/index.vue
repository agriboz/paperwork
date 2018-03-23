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
        <li v-for="m of menu" v-if="m.visible" :key="m.id">
          <nuxt-link :to="m.link" class="menu-link" exact>
            <b-icon :icon="m.icon"/>
            <span class="menu-item">{{ m.name }}</span>
          </nuxt-link>
          <ul>
            <li v-for="a of m.children" :key="a.id">
              <nuxt-link :to="a.link" class="menu-link" exact>
                <span class="menu-item">{{ a.name }}</span>
              </nuxt-link>
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
  computed: {
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
