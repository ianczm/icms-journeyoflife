<template>
  <div class="outer-container">
    <div class="section landing">
      <div class="inner-container">
        <div class="text">
          <h1>
            The Journey
            <br />of Life
          </h1>
          <p>An ICMS Roundtable in collaboration with Maybank.</p>
        </div>
        <div class="event-details">
          <span class="glow-button">19 Mar 2022</span>
          <span class="glow-button">9 AM - 1 PM (MYT)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.landing {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner-container {
    text-align: left;

    .text {
      h1 {
        font-size: 3.5rem;
        color: $yellow;
        margin-bottom: 1rem;
        mix-blend-mode: screen;
        @include createTextShadow(30px, $yellow, 0.3);
      }

      p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        font-weight: 200;
      }
    }

    .event-details {
      .glow-button {
        margin-bottom: 10px;
        font-size: 1rem;
        padding: 20px 30px;
      }
    }
  }
}
</style>