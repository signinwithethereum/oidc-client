<script setup lang="ts">
const { user } = useAuth()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <nav>
      <NuxtLink to="/">
        <img
          src="/client-logo.png"
          alt="OIDC Client"
          width="32"
          height="32"
        />
        OIDC Client
      </NuxtLink>

      <template v-if="user">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      </template>
    </nav>

    <NuxtPage />

    <footer>
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      &middot;
      <NuxtLink to="/terms">Terms of Service</NuxtLink>
    </footer>
  </div>
</template>
