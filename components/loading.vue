<template>
  <div v-if="loading" class="loading-wrapper">
    <div class="spinner">
      <div class="double-bounce1"/>
      <div class="double-bounce2"/>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  befoureMount() {
    console.log('alo')
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-wrapper {
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  z-index: 999999999;
  position: fixed;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  background-color: #2b3643;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
