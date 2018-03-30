// import includes from 'lodash/includes'
export default function({ store, route, redirect }) {
  const roles = store.state.employee.roles
  // const routeTasks = route.name === 'tasks'
  const routeWhiteCollar = route.name === 'white-collar'
  const routeWhiteCollarEdit = route.name === 'white-collar-edit-id'
  const routeMain = route.name === 'index'

  console.log(route.name)
  console.log('roles', roles)
  if (roles.length) {
    return (routeWhiteCollar || routeMain || routeWhiteCollarEdit) &&
      !roles.some(v => v.id === 4 || v.id === 7)
      ? redirect('/tasks')
      : false
  }
}
