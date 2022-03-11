<template>
  <div class="outer-container">
    <div class="section login">
      <div class="inner-container">
        <div class="header">
          <h1>Sign In</h1>
          <div class="divider"></div>
        </div>
        <form @submit.prevent="submitLogin">
          <div v-if="hasError || isSuccessful" class="statusbar" :class="updateStatusClass">
            <div v-if="hasError">
              <strong>Error:</strong>
              {{ errorCode }}
            </div>
          </div>
          <div class="group">
            <label for>Username</label>
            <input v-model="email" type="text" placeholder="name@example.com" />
          </div>
          <div class="group">
            <label for>Password</label>
            <input v-model="password" type="password" placeholder="password" />
          </div>
          <button type="submit" class="glow-button">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      // User input
      email: '',
      password: '',

      // Authentication
      hasError: false,
      isSuccessful: false,
      errorCode: null,
      errorMessage: null,
      user: null,
      auth: null,
    }
  },
  methods: {
    submitLogin() {

      this.isSuccessful = false;
      this.hasError = false;

      console.log("Submitted");
      this.auth = getAuth();
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Produce success message, set persistence to local and get user data
          this.user = userCredential.user;
          this.isSuccessful = true;
          this.$router.replace({name: 'Home'});
        }).catch((error) => {
          // Produce error if invalid sign in
          this.hasError = true;
          this.errorCode = error.code;
          this.errorMessage = error.message;
        })
      this.email = '';
      this.password = '';
    }
  },
  computed: {
    updateStatusClass() {
      if (this.isSuccessful) {
        return 'success';
      } else if (this.hasError) {
        return 'error';
      } else {
        return '';
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.section.login {
  $loginPadding: 50px;
  width: min(400px, calc(80vw - 2 * $loginPadding));
  padding: calc($loginPadding + 25px) $loginPadding;
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include createGlass();

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgba(white, 0.35);
    margin-bottom: 3rem;
  }

  .header {
    h1 {
      text-align: center;
    }
  }

  form {
    $inputpadding: 15px;

    *:not(strong) {
      display: block;
      width: calc(100% - 2 * $inputpadding);
      margin-bottom: 15px;
    }

    .group {
      width: 100%;
    }

    .statusbar {
      width: calc(100% - 30px);
      padding: 15px;
      border-radius: 5px;
      font-size: 0.85rem;
      font-weight: 400;
      color: $secondary-text;
      margin-bottom: 30px;
      margin-top: -15px;

      & > * {
        margin: 0;
      }

      &.error {
        background: $error;
        @include createBoxShadow($color: $error);
      }
    }

    label {
      font-weight: 400;
    }

    input {
      padding: $inputpadding;
      @include createGlass(transparent, 0);
      border: none;
      color: white;
      font-family: $poppins;
      font-size: 1rem;
      border-radius: 5px;
      transition: all 0.1s ease;
      margin-bottom: 2rem;

      &:focus {
        outline: 2px $yellow solid;
        color: $yellow;
        @include createBoxShadow($opacity: 0.1);
      }
    }

    button.glow-button {
      border: none;
      width: 100%;
      margin-top: 3rem;
      padding: 20px 30px;
    }
  }
}
</style>