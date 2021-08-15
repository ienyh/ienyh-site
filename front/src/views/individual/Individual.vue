<template>
  <div class="container">
    <div class="back-font disable-select">individual</div>
    <div class="card">
      我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，
      我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，
      我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，
      我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，
      我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷，我是🐷。
    </div>
  </div>
</template>

<script>
export default {
  name: "Individual",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right, #4158d0, #ffcc70, #c850c0);
}

.back-font {
  font-size: 12rem;
  font-weight: bold;
  font-family: "Estilo Regular", sans-serif;
  letter-spacing: 4rem;
  background-image:-webkit-linear-gradient(right,#ffcc70, #4158d0, #c850c0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card {
  position: absolute;
  width: 60rem;
  height: 30rem;
  border-radius: 2rem;
  padding: 1.5rem;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(0.4rem);
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);

  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.87);
  
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
