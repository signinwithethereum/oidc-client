<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
</script>

<template>
  <main>
    <h1>Dashboard</h1>

    <p>Very secret page only signed in users should be able to access.</p>

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
