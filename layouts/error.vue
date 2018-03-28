<template>
  <div class="container"
       style="display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;">
    <b-message v-if="!$store.state.isAuthenticated" type="is-info" has-icon>
      Kullanıcı bilgileriniz sistemde tanımlı değildir. <strong>bisoru@borusan.com</strong>'a e-posta gönderebilirsiniz.
    </b-message>
    <b-message v-else type="is-info" has-icon>
      {{ error.message }}
    </b-message>

  </div>
</template>

<script>
export default {
  props: ['error'],
  mounted() {
    this.$store.state.ui.loading = false
  }
}
</script>
