<template>
  <div class="container"
       style="display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;">
    <b-message type="is-info" has-icon>
      Kullanıcı bilgileriniz sistemde tanımlı değildir. <strong>bisoru@borusan.com</strong>'a e-posta gönderebilirsiniz.
    </b-message>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.$store.state.ui.loading = false
  }
}
</script>
