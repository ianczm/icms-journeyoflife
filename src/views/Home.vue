<template>
  <div class="outer-container">
    <div class="section landing">
      <div class="inner-container">
        <div class="text">
          <h4>ICMS × Maybank Presents</h4>
          <h1>
            The Journey
            <br />Of Life
          </h1>
          <p>
            Put your financial management skills to the test as we throw you challenge
            after challenge in this fast-paced and intense game of life.
          </p>
        </div>
        <div class="event-details">
          <h3>Virtual Event</h3>
          <div class="dates">
            <span>March 19</span>
            <div class="divider"></div>
            <span>9:00am - 12:30pm</span>
          </div>
        </div>
        <div class="cta">
          <router-link to="/game" class="glow-button">Play Game</router-link>
          <a href="https://bit.ly/maybankjourneyoflife" target="_blank" class="glow-button">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.section.landing {
  height: 100vh;
  width: 45vw;
  display: flex;
  align-items: center;
  justify-content: center;

  h1,
  h4,
  p {
    // mix-blend-mode: screen;
  }

  .inner-container {
    text-align: center;
    font-size: 1.15rem;

    .event-details {
      margin-bottom: 3rem;
      text-transform: uppercase;
      font-weight: 400;

      h3 {
        @include createTextShadow(30px, white, 0.3);
      }

      .dates {
        display: flex;
        justify-content: center;
        align-items: center;
        @include createTextShadow(30px, $yellow, 0.3);

        span {
          color: $yellow;
          display: inline-block;
          padding: 10px 15px;
          background: none;
          transition: background 0.2s ease;
          border-radius: 4px;

          &:hover {
            background: rgba($yellow, 0.15);
          }
        }

        .divider {
          display: inline-block;
          width: 2px;
          height: 25px;
          background: $yellow;
        }
      }
    }

    .cta {
      a {
        padding: 20px 30px;
        font-size: 1rem;
      }
      @include spaceChildren(10px);
    }
  }
}

@media only screen and (max-width: 1150px) {
  .section.landing {
    width: 65vw;
  }
}

@media only screen and (max-width: 800px) {
  .section.landing {
    width: 80vw;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    span {
      font-size: 1rem;
    }
    h4 {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    .inner-container {
      .event-details {
        margin-bottom: 2rem;
      }
      .cta {
        a {
          font-size: 0.85rem;
        }
      }
    }
  }
}
</style>