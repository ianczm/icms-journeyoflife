<script setup>

</script>

<template>
  <div ref="nav-height" class="nav-outer-container">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">
          <img src="/src/assets/img/common/logo.png" alt="ICMS Logo" />
        </router-link>
      </div>
      <div class="right desktop">
        <div class="links">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/agenda">Agenda</router-link>
            </li>
            <li>
              <router-link to="/rules">Rules</router-link>
            </li>
            <li>
              <router-link to="/game">Game</router-link>
            </li>
            <li>
              <router-link v-if="!signedIn" to="/login" class="glow-button">Sign In</router-link>
              <div @click="submitSignOut" v-else class="glow-button sign-out">
                <span>{{ getUsername }}</span>
                <span class="subtitle">Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="social-media">
          <ul>
            <li>
              <a href="https://icmscholars.org">
                <i class="fa-solid fa-laptop"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/icmscholars/">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/icmscholars/">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/icmscholars">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@icmscholars">
                <i class="fa-brands fa-tiktok"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right mobile">
        <i class="fa-solid fa-bars"></i>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      // Authentication details
      user: null,
      signedIn: false,
      auth: null
    }
  },
  created() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        this.signedIn = true;
      } else {
        this.signedIn = false;
        if (this.$route.name === 'Game') {
          // redirect user to login if they are currently in game
          this.$router.push({ name: 'Login' });
        }
      }
    })
  },
  methods: {
    submitSignOut() {
      signOut(this.auth);
    }
  },
  computed: {
    getUsername() {
      // return username part of the email
      return this.user.email.split("@")[0];
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

body {
  background: $dark;
  color: white;
  font-family: $poppins;
  line-height: 1.15;
  height: 100vh;
  background-attachment: fixed;
  background-image: radial-gradient(
      circle at 27% 22%,
      rgba(242, 94, 153, 0.4) 0%,
      rgba(242, 94, 153, 0) 90%
    ),
    radial-gradient(
      ellipse at 90% 10%,
      rgba(184, 170, 110, 0.1) 0%,
      rgba(184, 170, 110, 0) 60%
    ),
    radial-gradient(
      circle at 75% 56%,
      rgba(250, 199, 48, 0.5) 0%,
      rgba(250, 199, 48, 0) 40%
    ),
    radial-gradient(
      farthest-side at 73% 55%,
      rgba(86, 45, 8, 0.9) 0%,
      rgba(86, 45, 8, 0) 100%
    );
}

.nav-spacer {
  height: 115px;
}

.nav-outer-container {
  $padding: 20px;
  position: fixed;
  z-index: 10;
  padding: $padding;
  width: calc(100vw - 2 * $padding);
  @include createGlass();
  display: flex;
  justify-content: center;

  .nav-container {
    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: white;
      text-shadow: none;
      transition: color 0.2s ease, text-shadow 0.2s ease;
    }

    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.95rem;

    .logo {
      img {
        display: inline-block;
        max-height: 35px !important;
        filter: none;
        transition: filter 0.2s ease;

        &:hover {
          filter: drop-shadow(0 0 25px rgba($yellow, 0.5));
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      text-align: right;
      @include spaceChildren(50px);

      a:hover,
      a.router-link-active {
        color: $yellow;
        @include createTextShadow($opacity: 0.95);
      }

      .glow-button {
        &.router-link-active {
          @include createBoxShadow(50px, $yellow, 0.5);
          transition: box-shadow 0.2s ease;
        }

        &.sign-out {

          text-align: center;
          padding-top: 9px;
          padding-bottom: 9px;

          span {
            display: block;
          }

          .subtitle {
            font-size: 0.65rem;
            font-weight: 600;
          }
        }
      }

      .links {
        ul {
          display: flex;
          align-items: center;
          @include spaceChildren(35px);
        }
      }

      .social-media {
        ul {
          display: flex;
          align-items: center;
          @include spaceChildren(25px);
        }
      }
    }

    @media only screen and (min-width: 950px) {
      .mobile {
        display: none;
      }
    }

    @media only screen and (max-width: 950px) {
      .desktop {
        display: none;
      }
      .mobile {
        display: flex;
      }
    }
  }
}
</style>