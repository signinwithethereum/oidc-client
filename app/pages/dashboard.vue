<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
</script>

<template>
  <main>
    <img
      src="/client-logo.png"
      alt="OIDC Client"
      width="64"
      height="64"
    />
    <h1>Dashboard</h1>

    <div v-if="user">
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
  </main>
</template>
