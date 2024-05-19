<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          @click.prevent="register = false"
          :class="{ 'is-active': !register }"
        >
          <a>Login</a>
        </li>
        <li @click.prevent="register = true" :class="{ 'is-active': register }">
          <a>Register</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card auth-form">
    <div class="title has-text-centered">
      {{ formTitle }}
    </div>
    <div class="card-content">
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="credentials.email"
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="credentials.password"
              class="input"
              type="password"
              placeholder="enter a password"
            />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <button class="button is-primary">{{ formTitle }}</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
/**
 * imports
 */
import { ref, computed, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

/**
 * register / login
 */
const register = ref(false);

/**
 * form title
 */
const formTitle = computed(() => {
  return register.value ? "Register" : "Login";
});

/**
 * submit form
 */
const handleSubmit = () => {
  console.log("submit form");
  if(!credentials.email || !credentials.password) {
    console.log("email and password are required");
  } else {
    if(register.value) {
      storeAuth.register(credentials);
    } else {
      storeAuth.login(credentials);
    }
  }
};

/**
 * credentials
 */
const credentials = reactive({
  email: "",
  password: "",
});

/**
 * auth store
 */
const storeAuth = useStoreAuth();
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}

.title {
  padding-top: 10px;
}
</style>
