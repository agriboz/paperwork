const ui = {
  namespaced: true,
  state: {
    menu: [
      {
        id: 1,
        name: 'Anasayfa',
        link: '/',
        icon: 'home',
        visible: true
      },
      {
        id: 2,
        name: 'BY İşe Giriş',
        link: '/white-collar',
        icon: 'human-handsup',
        visible: true
      },
      {
        id: 3,
        name: 'MY İşe Giriş',
        link: '/advance-list',
        icon: 'worker',
        visible: false
      },
      {
        id: 4,
        name: 'Stajyer İşe Giriş',
        link: '/intern',
        icon: 'school',
        visible: false
      },
      {
        id: 5,
        name: 'Evraklarım',
        link: '/settings',
        icon: 'file-document',
        visible: false
      },
      {
        id: 6,
        name: 'Görevlerim',
        link: '/tasks',
        icon: 'file-check',
        visible: true
      }
    ],
    tableOpts: {
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'desc',
      perPage: 10,
      checkable: false,
      isHoverable: true,
      isStriped: true,
      isLoading: true
    }
  },
  mutations: {},

  getters: {
    menu(state) {
      return state.menu
    }
  },

  actions: {}
}

export default ui
