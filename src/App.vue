<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Montserrat:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  box-sizing: border-box;
}

:root {
  --fondosidebar: #ffffff;
  --anaranjadoHover: #b65821;
  --azulfuerte: #041e41;
  --celestemedio: #62aaa7;
  --azulbajo: #0c5eaa;
  --celestefuerte: #018093;
  --white: #ffffff;
  --fondoBG: #f7f3fa;
}

body {
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Montserrat', sans-serif;
  color: #2c3e50;
}

main {
  height: 100%;
  width: 100%;
  display: flex;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.title-views {
  font-family: 'Poppins', sans-serif;
}


.container-cards-courses {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 5 columnas por defecto */
  gap: 1rem;
  /* Puedes ajustar el valor de gap según tus necesidades */
}

@media (max-width: 1400px) {
  .container-cards-courses {
    grid-template-columns: repeat(4, 1fr);
    /* 4 columnas cuando el ancho sea menor a 1200px */
  }
}
</style>
