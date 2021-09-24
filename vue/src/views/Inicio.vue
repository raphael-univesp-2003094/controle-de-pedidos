<template>
  <div class="container vh-100">
    <div class="row h-100 align-items-center">
      <div class="col text-center">
        <img src="@/assets/images/brasao_prefeitura.jpg"
             alt="Brasão da Prefeitura Municipal de Penápolis">

        <h1>Controle de Pedidos</h1>

        <h3 class="mb-4">Prefeitura Municipal de Penápolis</h3>

        <router-link tag="button" class="btn btn-primary" :to="{name: 'login'}">
          <i class="bi bi-box-arrow-in-right"></i> Entrar na Aplicação
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inicio',
};
</script>
