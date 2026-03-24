<script setup lang="ts">
const { user, loading, fetchUser, login } = useAuth()

await fetchUser()

if (user.value) await navigateTo('/dashboard')
</script>

<template>
  <UContainer class="py-20">
    <div class="flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-5xl font-bold tracking-tight">
          Sign in with
          <span class="text-primary">Ethereum</span>
        </h1>
        <p class="text-xl text-muted mt-4 max-w-lg text-balance">
          Authenticate with your Ethereum wallet to access the
          <NuxtLink
            to="/dashboard"
            class="text-primary underline"
          >
            dashboard</NuxtLink>.
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
            size="xl"
            @click="login"
          >
            <template #leading>
              <img
                src="/eth-diamond-white.svg"
                alt=""
                width="18"
                height="18"
              />
            </template>
          </UButton>
        </div>
      </div>

      <div class="flex-1 flex justify-center">
        <img
          src="/wallet.png"
          alt="Ethereum Wallet"
          class="max-w-xs md:max-w-sm"
        />
      </div>
    </div>
  </UContainer>
</template>
