<script setup>

</script>

<template>
  <div class="nav-outer-container">
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
              <router-link to="/register" class="glow-button">Register</router-link>
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
  <router-view/>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

body {
  background: $dark;
  color: white;
  font-family: $poppins;
  line-height: 1.15;
  background-blend-mode: screen;
  background-size: cover;
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

.nav-outer-container {
  $padding: 20px;
  position: fixed;
  padding: $padding;
  width: calc(100vw - 2 * $padding);
  outline: 1px solid rgba(white, 0.15);
  backdrop-filter: blur(50px);
  @include createBoxShadow($color: $dark);
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
      a.active {
        color: $yellow;
        @include createTextShadow($opacity: 0.95);
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

    @media only screen and (min-width: 1080px) {
      .mobile {
        display: none;
      }
    }

    @media only screen and (max-width: 1080px) {
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