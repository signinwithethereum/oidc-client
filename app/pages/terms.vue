<template>
  <UContainer class="py-16 max-w-2xl">
    <h1 class="text-3xl font-bold">Terms of Service</h1>
    <p class="text-muted text-sm mb-10">
      Last updated:
      {{
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      }}
    </p>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-check-circle"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Acceptance</h2>
          </div>
        </template>
        <p class="text-muted">
          By signing in to this application, you agree to these terms. If you do
          not agree, do not use the service.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-info"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Service Description</h2>
          </div>
        </template>
        <p class="text-muted">
          This application is an OpenID Connect client that authenticates users
          via Sign in with Ethereum (SIWE). It is provided as-is for
          demonstration and development purposes.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-user"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">User Responsibilities</h2>
          </div>
        </template>
        <p class="text-muted">
          You are responsible for the security of your Ethereum wallet and
          credentials. Do not share your private keys or seed phrases with
          anyone.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-alert-triangle"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">No Warranty</h2>
          </div>
        </template>
        <p class="text-muted">
          This service is provided &ldquo;as is&rdquo; without warranty of any
          kind, express or implied. The operators are not liable for any damages
          arising from use of this service.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-refresh-cw"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Changes</h2>
          </div>
        </template>
        <p class="text-muted">
          These terms may be updated at any time. Continued use after changes
          constitutes acceptance of the new terms.
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
