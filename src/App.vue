<script setup>

</script>

<template>
  <div class="nav-outer-container">
    <div class="nav-container">
      <div class="logo">
        <a href="/">
          <img src="/src/assets/img/common/logo.png" alt="ICMS Logo" />
        </a>
      </div>
      <div class="right desktop">
        <div class="links">
          <ul>
            <li>
              <a class="active" href="/">home</a>
            </li>
            <li>
              <a href="#">agenda</a>
            </li>
            <!-- <li><a href="#">The Team</a></li> -->
            <li>
              <a class="glow-button" href="#">register</a>
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