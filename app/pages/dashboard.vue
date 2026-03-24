<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
</script>

<template>
  <UContainer class="py-16">
    <h1 class="text-3xl font-bold">Dashboard</h1>

    <p class="text-muted mt-2">
      Very secret page only signed in users should be able to access.
    </p>

    <UCard class="mt-8" v-if="user">
      <div class="flex items-center gap-4">
        <UAvatar
          v-if="user.picture"
          :src="user.picture"
          :alt="user.preferredUsername"
          size="lg"
        />
        <div>
          <p class="font-semibold text-lg">
            {{ user.preferredUsername || user.sub }}
          </p>
          <p class="text-sm text-muted">{{ user.sub }}</p>
        </div>
      </div>

      <pre class="mt-4 text-sm bg-elevated rounded p-4 overflow-x-auto">{{
        JSON.stringify(user, null, 2)
      }}</pre>

      <template #footer>
        <UButton
          label="Sign Out"
          color="neutral"
          variant="outline"
          @click="logout"
        />
      </template>
    </UCard>
  </UContainer>
</template>
