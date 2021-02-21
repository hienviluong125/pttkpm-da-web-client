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
          </blockquote>
          <template #footer>
            <div class="footer-wrp cursor-pointer" @click="onSubmit">
              <div
                class="text-center text-light text-uppercase login-label fw-bold"
              >
                log in
              </div>
              <router-link to="/sign_up" class="text-decoration-none">
                <div class="mt-3 text-center w-100 fw-lighter sub-title">
                  Not Registed ?
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
import { required } from "vuelidate/lib/validators";

import axios from "../utils/axiosHelper";
import { saveToken, getToken, setUser } from "../libs/token";

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
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
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
        .post("/auth/login", {
          user: {
            email: username,
            password,
          },
        })
        .then((res) => {
          saveToken(res.data.token);

          axios.get("/api/user/profile", { headers: { Authorization: `Bearer ${res.data.token}` } }).then((res) => {
            setUser(res.data.user);

            let lsRedirectPath = localStorage.getItem("redirect_path");
            if (lsRedirectPath) {
              localStorage.removeItem("redirect_path");
              window.location.href = lsRedirectPath;
            } else {
              this.$router.push("/");
            }
          });
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
  beforeRouteEnter(_, from, next) {
    if (from.path == "/sign_up") {
      return next((self) => {
        self.$bvToast.toast("Register successfully!", {
          title: `Notify`,
          variant: "success",
          solid: true,
        });
      });
    }

    next();
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
