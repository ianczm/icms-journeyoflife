<template>
  <div class="event-details">
    <h3>Virtual Event</h3>
    <div class="dates">
      <span>March 19</span>
      <div class="divider"></div>
      <span>9:00am - 12:30pm</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.event-details {
  margin-bottom: 3rem;
  text-transform: uppercase;
  font-weight: 400;
  mix-blend-mode: screen;
  @include createTextShadow(30px, white, 0.3);

  .dates {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: $yellow;
      display: inline-block;
      padding: 10px 15px;
      background: none;
      transition: background 0.2s ease;
      cursor: pointer;
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
</style>