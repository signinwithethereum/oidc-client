<script setup lang="ts">
const { user, logout } = useAuth()

const displayName = computed(() => {
  if (!user.value) return ''
  if (user.value.preferredUsername) return user.value.preferredUsername
  const addr = user.value.sub
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <img
            src="/client-logo.png"
            alt="OIDC Client"
            width="32"
            height="32"
            class="rounded-xl"
          />
          <span class="font-semibold">OIDC Client</span>
        </NuxtLink>
        <UButton
          v-if="user"
          to="/dashboard"
          label="Dashboard"
          variant="ghost"
          color="neutral"
        />
      </template>

      <template #right>
        <NuxtLink
          v-if="user"
          to="/dashboard"
          class="flex items-center gap-2"
        >
          <UAvatar
            :src="user.picture"
            :alt="displayName"
            size="sm"
          />
          <span class="text-sm font-medium">{{ displayName }}</span>
        </NuxtLink>
      </template>
    </UHeader>

    <UMain class="flex flex-col">
      <NuxtPage />

    <UFooter class="mt-auto">
      <template #left>
        <div class="flex items-center gap-2 text-sm text-muted">
          <NuxtLink
            to="/privacy"
            class="hover:text-primary"
          >
            Privacy Policy
          </NuxtLink>
          <span>&middot;</span>
          <NuxtLink
            to="/terms"
            class="hover:text-primary"
          >
            Terms of Service
          </NuxtLink>
        </div>
      </template>

      <template #right>
        <div class="flex items-center gap-2 text-sm text-muted">
          <NuxtLink
            to="https://ethid.org"
            class="hover:text-primary"
          >
            EthID.org
          </NuxtLink>
          <span>&middot;</span>
          <NuxtLink
            to="https://siwe.xyz"
            class="hover:text-primary"
          >
            SIWE.xyz
          </NuxtLink>
        </div>
      </template>
    </UFooter>
    </UMain>
  </UApp>
</template>
