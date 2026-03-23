<script setup lang="ts">
const { user, loading, fetchUser, login, logout } = useAuth()

await fetchUser()
</script>

<template>
  <main>
    <img
      src="/client-logo.png"
      alt="OIDC Client"
      width="64"
      height="64"
    />
    <h1>OIDC Client</h1>

    <div v-if="loading">Loading...</div>

    <div v-else-if="user">
      <div v-if="user.picture">
        <img
          :src="user.picture"
          :alt="user.preferredUsername"
          width="64"
          height="64"
        />
      </div>
      <p>{{ user.preferredUsername || user.sub }}</p>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      <button @click="logout">Sign Out</button>
    </div>

    <div v-else>
      <p>Not signed in.</p>
      <button @click="login">Sign in with Ethereum</button>
    </div>
  </main>
</template>
