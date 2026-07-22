<template>
  <div class="app-shell">
    <a href="#main" class="skip-link">{{ $t('a11y.skip') }}</a>
    <LayoutHeader />
    <main id="main" class="app-main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
}

.skip-link {
  position: absolute;
  left: $space-4;
  top: -60px;
  z-index: $z-toast;
  padding: 0.6em 1em;
  border-radius: var(--radius-md);
  background: var(--c-gold);
  color: $cream-50;
  transition: top $dur-fast var(--ease-out);

  &:focus {
    top: $space-4;
  }
}
</style>
