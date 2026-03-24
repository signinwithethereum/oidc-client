<script setup lang="ts">
const { user, loading, fetchUser, login } = useAuth()

await fetchUser()

if (user.value) await navigateTo('/dashboard')
</script>

<template>
  <main>
    <h1>OIDC Client Example</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <p>Not signed in.</p>
      <button @click="login">Sign in with Ethereum</button>
    </div>
  </main>
</template>
