<template>
  <UContainer class="py-16 max-w-2xl">
    <h1 class="text-3xl font-bold mb-2">Privacy Policy</h1>
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
              name="i-lucide-database"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">What We Collect</h2>
          </div>
        </template>
        <p class="text-muted">
          When you sign in with Ethereum, we collect your Ethereum address and
          any profile information (such as your username or avatar) provided by
          the OpenID Connect identity provider.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-shield"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">How We Use It</h2>
          </div>
        </template>
        <p class="text-muted">
          Your information is used solely to authenticate you and display your
          profile within this application. We do not sell, share, or transfer
          your data to third parties.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-hard-drive"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Storage</h2>
          </div>
        </template>
        <p class="text-muted">
          Session data is stored in encrypted, server-side cookies. No personal
          data is persisted in a database. Your session is cleared when you sign
          out.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-user-check"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Your Rights</h2>
          </div>
        </template>
        <p class="text-muted">
          You can sign out at any time to clear your session. Since we do not
          store data beyond your active session, no further deletion is
          necessary.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-mail"
              class="text-primary"
            />
            <h2 class="font-semibold text-lg">Contact</h2>
          </div>
        </template>
        <p class="text-muted">
          If you have questions about this policy, please reach out to the site
          operator.
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
