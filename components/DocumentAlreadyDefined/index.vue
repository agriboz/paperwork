<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Uyarı</p>
    </header>
    <section class="modal-card-body">
      <p>Evrak Listesinde yaptığınız değişiklikler silenecektir. İşleme devam etmek istiyor musunuz?</p>
    </section>
    <footer class="modal-card-foot align-end">
      <button class="button" type="button" @click="goDocumentsTab">Hayır</button>
      <button class="button" type="button" @click="$parent.close()">Evet</button>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    goDocumentsTab() {
      // do not do this at home
      this.$parent.$parent.activeTab = 3
      this.$parent.close()
    }
  }
}
</script>
