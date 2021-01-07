<template>
<b-container fluid>
  <b-row class="min-vh-100" align-h="center" align-v="center">
    <b-col cols="12" sm="4" xl="3">
      <b-card header="Quote" class="login-wrp" footer-bg-variant="primary">
        <template #header>
          <h2 class="text-center font-weight-bold">ZeroBugs</h2>
          <div class="text-center">Member Web</div>
        </template>
        <blockquote class="blockquote mb-0 d-flex flex-column justify-content-center">
          <b-input-group class="mb-3">
            <template #prepend>
              <b-input-group-text>
                <b-icon icon="card-text" font-scale="0.8"></b-icon>
              </b-input-group-text>
            </template>
            <b-form-input placeholder="yours@example.com"></b-form-input>
          </b-input-group>
          <b-input-group class="mt-2">
            <template #prepend>
              <b-input-group-text>
                <b-icon icon="lock" font-scale="0.8"></b-icon>
              </b-input-group-text>
            </template>
            <template #append>
              <b-input-group-text>
                <b-icon :icon="isShowPassword ? 'eye-slash' : 'eye'" font-scale="0.8" class="cursor-pointer" @click="toggleShowPassword"></b-icon>
              </b-input-group-text>
            </template>
            <b-form-input placeholder="your password" :type="isShowPassword ? 'text':'password'"></b-form-input>
          </b-input-group>
        </blockquote>
        <template #footer>
          <div class="footer-wrp cursor-pointer" @click="handleClickLoginBtn">
            <div class="text-center text-light text-uppercase login-label">log in ></div>
          </div>
        </template>
      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isShowPassword: false
    }
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    handleClickLoginBtn() {
      console.log("zzz")
    }
  }

}
</script>

<style lang="scss" scoped>
.login-wrp {
  box-shadow: 0 0 40px 4px #111118;
  border-radius: 6px;

  transition: transform 0.6s, opacity 0.6s;
  transition-delay: 0.5s;

  &.card {
    border: none;
  }

  & .card-footer {
    padding: 0px;
    margin-top: 20px;

    border-radius: 0 0 6px 6px !important;
  }

  & .footer-wrp {
    padding: 20px;

    & .login-label {
      line-height: 22px;
      transition: 0.2s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
