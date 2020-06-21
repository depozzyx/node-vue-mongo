<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/error-test">Error</router-link> |
      <router-link to="/account">Account</router-link>
      <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">Пользователь</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

	h3{
		margin: 10px !important;
		text-transform: uppercase;
		font-family: 'Montserrat', sans-serif;
		font-weight: 500;
	}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
