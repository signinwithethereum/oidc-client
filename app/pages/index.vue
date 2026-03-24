<script setup lang="ts">
const { user, loading, fetchUser, login } = useAuth()

await fetchUser()

if (user.value) await navigateTo('/dashboard')
</script>

<template>
  <UContainer class="py-16 text-center">
    <h1 class="text-4xl font-bold">OIDC Client Example</h1>
    <p class="text-xl text-muted my-6">
      Sign in to access the
      <NuxtLink to="/dashboard"> dashboard</NuxtLink>.
    </p>

    <div
      v-if="loading"
      class="mt-8"
    >
      Loading...
    </div>

    <div
      v-else
      class="mt-8"
    >
      <UButton
        label="Sign in with Ethereum"
        size="lg"
        @click="login"
      >
        <template #leading>
          <img
            src="/eth-diamond.svg"
            alt=""
            width="16"
            height="16"
          />
        </template>
      </UButton>
    </div>
  </UContainer>
</template>
