<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
/**
 * click outside to close
 */
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, () => {
  showMobileNav.value = false;
}, {
  ignore: [navbarBurgerRef],
});
/**
 * store auth
 */
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();

/**
 * logout
 */
const logout = () => {
  storeAuth.logout();
  showMobileNav.value = false;
};
</script>
<template>
  <nav
    class="navbar is-info is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container is-max-desktop px-4">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

        <a
          @click="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        > 
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      > 
        <div class="nav-start">
          <button v-if="storeAuth.user.id" @click="logout" class="button is-small is-success mt-3 ml-3">
            Logout {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <router-link @click="showMobileNav = !showMobileNav" to="/" class="navbar-item" active-class="is-active"
            >Notes</router-link
          >
          <router-link @click="showMobileNav = !showMobileNav" to="/stats" class="navbar-item" active-class="is-active"
            >Stats</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media screen and (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
        left: 0;
        width: 100%;
    /* background: red; */
  }
}
</style>
