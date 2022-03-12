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
        <a @click="handleNavClick">
          <i class="fa-solid fa-bars"></i>
        </a>
      </div>
    </div>
  </div>
  <div v-if="isMobileNavOpen || !shouldMobileNavClose" class="mobile-nav" :class="onNavClose">
    <div class="links">
      <ul>
        <li>
          <router-link @click="closeNav" to="/">Home</router-link>
        </li>
        <li>
          <router-link @click="closeNav" to="/agenda">Agenda</router-link>
        </li>
        <li>
          <router-link @click="closeNav" to="/rules">Rules</router-link>
        </li>
        <li>
          <router-link @click="closeNav" to="/game">Game</router-link>
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
      auth: null,

      // Mobile Nav
      isMobileNavOpen: false,
      shouldMobileNavClose: true
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
    },
    openNav() {
      this.isMobileNavOpen = true;
      this.shouldMobileNavClose = false;
    },
    closeNav() {
      this.isMobileNavOpen = true;
      this.shouldMobileNavClose = true;
      setTimeout(() => {
        this.isMobileNavOpen = false;
        this.shouldMobileNavClose = true;
      }, 1000);
    },
    handleNavClick() {
      if (!this.isMobileNavOpen) {
        this.openNav();
      } else {
        this.closeNav();
      }
    }
  },
  computed: {
    getUsername() {
      // return username part of the email
      return this.user.email.split("@")[0].replace(".", " ");
    },
    onNavClose() {
      return this.isMobileNavOpen && this.shouldMobileNavClose ? 'on-nav-close' : null;
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
  
  // background-image: radial-gradient(
  //     circle at 55% 48%,
  //     rgba(17, 99, 196, 0.3) 0%,
  //     rgba(17, 99, 196, 0) 90%
  //   ),
  //   radial-gradient(
  //     ellipse at 12% 61%,
  //     rgba(98, 238, 11, 0.4) 0%,
  //     rgba(98, 238, 11, 0) 60%
  //   ),
  //   radial-gradient(
  //     circle at 35% 48%,
  //     rgba(75, 104, 207, 0) 0%,
  //     rgba(75, 104, 207, 0) 40%
  //   ),
  //   radial-gradient(
  //     farthest-side at 46% 48%,
  //     rgba(84, 218, 233, 0.2) 0%,
  //     rgba(84, 218, 233, 0) 100%
  //   );
  // background-image: radial-gradient(
  //     circle at 55% 48%,
  //     rgba(196, 113, 17, 0.3) 0%,
  //     rgba(196, 169, 17, 0) 90%
  //   ),
  //   radial-gradient(
  //     ellipse at 12% 61%,
  //     rgba(238, 215, 11, 0.4) 0%,
  //     rgba(238, 204, 11, 0) 60%
  //   ),
  //   radial-gradient(
  //     circle at 35% 48%,
  //     rgba(207, 75, 75, 0) 0%,
  //     rgba(207, 75, 75, 0) 40%
  //   ),
  //   radial-gradient(
  //     farthest-side at 46% 48%,
  //     rgba(233, 144, 84, 0.2) 0%,
  //     rgba(233, 198, 84, 0) 100%
  //   );
  // background-image: radial-gradient(
  //     circle at 71% 23%,
  //     rgba(84, 11, 8, 0.1) 0%,
  //     rgba(84, 11, 8, 0) 90%
  //   ),
  //   radial-gradient(
  //     ellipse at 56% 6%,
  //     rgba(241, 25, 25, 0.4) 0%,
  //     rgba(241, 25, 25, 0) 60%
  //   ),
  //   radial-gradient(
  //     circle at 70% 94%,
  //     rgba(226, 146, 41, 0.5) 0%,
  //     rgba(226, 41, 96, 0) 60%
  //   ),
  //   radial-gradient(
  //     farthest-side at 3% 33%,
  //     rgba(190, 128, 35, 0.7) 0%,
  //     rgba(190, 128, 35, 0) 100%
  //   );
}

.nav-spacer {
  height: 115px;
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

.mobile {
  display: none;
}

a {
  text-decoration: none;
  color: white;
  text-shadow: none;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

a:hover,
a.router-link-active {
  color: $yellow;
  @include createTextShadow($opacity: 0.95);
}

.nav-outer-container {
  $padding: 5px;
  position: fixed;
  z-index: 10;
  padding: 20px $padding;
  width: calc(100vw - 2 * $padding);
  @include createGlass();
  display: flex;
  justify-content: center;

  .nav-container {
    ul {
      list-style: none;
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

    .desktop.right {
      display: flex;
      align-items: center;
      text-align: right;
      @include spaceChildren(50px);

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

    @media only screen and (max-width: 1100px) {
      .right.desktop {
        display: none;
      }
      .mobile {
        display: flex;

        a {
          font-size: 1.2rem;
        }
      }
    }
  }
}

.mobile-nav.on-nav-close {
  background: none;
  backdrop-filter: blur(0);
  animation: mobileNavClose 0.2s ease;

  .links {
    ul {
      @for $i from 1 through 5 {
        li:nth-last-child(#{$i}) {
          opacity: 0;
          animation: flexOut #{$i * 0.15}s ease;
        }
      }
    }
  }
}

.mobile-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($dark, 0.45);
  backdrop-filter: blur(25px);
  z-index: 9;
  animation: mobileNavOpen 0.2s ease;

  .links {
    height: auto;

    ul {
      text-align: center;
      list-style: none;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.5rem;

      @for $i from 1 through 5 {
        li:nth-child(#{$i}) {
          animation: flexIn #{$i * 0.15}s ease;
        }
      }

      li:not(:last-child) {
        margin-bottom: 5vh;
      }

      .glow-button.sign-out {
        font-size: 1.25rem;
        font-weight: 800;
        padding: 20px 40px;

        .subtitle {
          font-size: 0.8rem;
          font-weight: 600;
        }
      }
    }
  }
}

@keyframes mobileNavOpen {
  0% {
    background: rgba($dark, 0);
    backdrop-filter: blur(0);
  }
  100% {
    background: rgba($dark, 0.45);
    backdrop-filter: blur(25px);
  }
}

@keyframes mobileNavClose {
  100% {
    background: rgba($dark, 0);
    backdrop-filter: blur(0);
  }
  0% {
    background: rgba($dark, 0.45);
    backdrop-filter: blur(25px);
  }
}
</style>