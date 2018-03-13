<template>
  <div class="modal-card">
    <header class="modal-card-head">

      <p class="modal-card-title">Dökümantasyon Ekibine Gönder</p>
    </header>
    <section class="modal-card-body">
      <p>Zorunlu evraklar tamamlanmadan işe giriş işlemi yapılacaktır. Devam etmek istediğinize emin misiniz?"</p>
    </section>
    <footer class="modal-card-foot align-end">
      <button class="button is-success" type="button" @click="sendToDocumentationTeam(item)">Evet</button>
      <button class="button" type="button" @click="$parent.close()">Hayır</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    sendToDocumentationTeam() {
      this.$store
        .dispatch('widgetForm/sendToDocumentationTeam', this.item)
        .then(this.$parent.close)
    }
  }
}
</script>
