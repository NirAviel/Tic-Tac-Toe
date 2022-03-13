<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="games">Games</RouterLink>
    </nav>
    <h1>Tic-Tac-Toe</h1>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 35px;

  h1 {
    text-align: center;
    font-size: 3rem;
  }
}

h2 {
  margin-bottom: 25px;
  font-size: 2rem;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.btn-green {
  padding: 12px 24px;
  font-size: 1.25rem;
  background-color: var(--vt-c-text-green-1);
  border: 1px solid var(--vt-c-text-green-2);
  border-radius: 4px;
  text-shadow: 1px 1px 4px var(--color-text);
  color: var(--color-background-mute);
  cursor: pointer;
  transition: all .15s;

  &:hover {
    transform: scale(1.03);
  }
}

.btn-clear {
  background-color: transparent;
  border: 1px solid var(--vt-c-text-green-2);
  padding: 12px 24px;
  font-size: 1.25rem;
  border-radius: 4px;
  color: var(--vt-c-white-mute);
  cursor: pointer;
  transition: all .15s;

  &:hover {
    transform: scale(1.03);
  }
}

input[type="text"] {
  border: none;
  border-radius: 3px;
  line-height: 1.6;
  padding: 0 8px;
  background-color: var(--vt-c-white-mute);
  font-size: 1.1rem;
}

@media (min-width: 1024px) {
  body {
    font-size: 10px;
  }

  #app {
  }

  header {

    nav {
      // text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }

  header .wrapper {
  }
}
</style>
