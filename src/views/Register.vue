<template>
  <b-container fluid>
    <b-row class="min-vh-100" align-h="center" align-v="center">
      <b-col cols="12" sm="4" xl="3">
        <b-card header="Quote" class="login-wrp" footer-bg-variant="primary">
          <template #header>
            <h2 class="text-center font-weight-bold">ZeroBugs</h2>
            <div class="text-center">Member Web</div>
          </template>
          <blockquote
            class="blockquote mb-0 d-flex flex-column justify-content-center"
          >
            <b-input-group class="mb-3">
              <template #prepend>
                <b-input-group-text>
                  <b-icon icon="card-text" font-scale="0.8"></b-icon>
                </b-input-group-text>
              </template>
              <b-form-input
                placeholder="yours@example.com"
                name="username"
                v-model="$v.form.username.$model"
                :state="validateState('username')"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
            </b-input-group>

            <b-input-group class="mt-2">
              <template #prepend>
                <b-input-group-text>
                  <b-icon icon="lock" font-scale="0.8"></b-icon>
                </b-input-group-text>
              </template>
              <template #append>
                <b-input-group-text>
                  <b-icon
                    :icon="isShowPassword ? 'eye-slash' : 'eye'"
                    font-scale="0.8"
                    class="cursor-pointer"
                    @click="toggleShowPassword"
                  ></b-icon>
                </b-input-group-text>
              </template>

              <b-form-input
                placeholder="your password"
                :type="isShowPassword ? 'text' : 'password'"
                name="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                aria-describedby="password-feedback"
                v-on:keyup.enter="onSubmit"
              ></b-form-input>
            </b-input-group>

            <b-form-radio-group
              id="radio-group-1"
              v-model="curRole"
              :options="roleOptions"
              name="radio-options"
              size="sm"
              class="mt-3"
            ></b-form-radio-group>
          </blockquote>
          <template #footer>
            <div class="footer-wrp cursor-pointer">
              <div
                class="text-center text-light text-uppercase login-label fw-bold"
                @click="onSubmit"
              >
                Register
              </div>
              <router-link to="/login" class="text-decoration-none">
                <div class=" mt-3 text-center w-100 fw-lighter sub-title">
                  Already have an account ?
                </div>
              </router-link>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

import axios from "../utils/axiosHelper";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      isShowPassword: false,
      form: {
        username: null,
        password: null,
      },
      curRole: "member",
      roleOptions: [
        { text: "Partner", value: "partner" },
        { text: "Member", value: "member" },
      ],
    };
  },
  validations: {
    form: {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const { username, password } = this.form;

      axios
        .post("/auth/sign_up", {
          user: {
            email: username,
            password,
            role: this.curRole,
          },
        })
        .then(() => {
          this.$router.push("/login");
        });

      this.resetForm();
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        username: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 14px;
  color: #eaeaea;
}

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
