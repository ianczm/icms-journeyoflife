<template>
  <div class="outer-container">
    <div class="section login">
      <div class="inner-container">
        <div class="header">
          <h1>Sign In</h1>
          <div class="divider"></div>
        </div>
        <form action="">
          <div class="group">
            <label for="">Username</label>
            <input type="text" name="" id="">
          </div>
          <div class="group">
            <label for="">Password</label>
            <input type="password" name="" id="">
          </div>
          <button type="submit" class="glow-button">Sign In</button>
        </form>
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

.section.login {
  $loginPadding: 50px;
  width: min(400px, calc(80vw - 2*$loginPadding));
  padding: calc($loginPadding + 25px) $loginPadding;
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include createGlass($dark, 0.15, 25px, $dark);

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

    * {
      display: block;
      width: calc(100% - 2*$inputpadding);
      margin-bottom: 15px;
    }

    .group {
      width: 100%;
    }

    label {
      font-weight: 400;
    }

    input {
      padding: $inputpadding;
      @include createGlass(transparent, 0, 25px, $dark);
      border: none;
      color: $yellow;
      font-family: $poppins;
      font-size: 1rem;
      border-radius: 5px;
      transition: all 0.2s ease;
      margin-bottom: 2rem;

      &:focus {
        outline: 2px $yellow solid;
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