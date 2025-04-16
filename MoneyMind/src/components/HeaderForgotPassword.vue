<template>
  <div class="header">
    <router-link to="/tabs/homepage" class="previous round">&#8249;</router-link>
    <div class="text-content">
      <h2>Forgot Password</h2>
      <p>Update your password</p>
      <h1>MoneyMind</h1>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.header {
  text-align: center;
  padding: 30px 20px 5px;
  background-color: #f9fafb;
  position: relative;
}

.text-content h2 {
  color: #1f2937;
  font-weight: 600;
  font-size: 22px;
  margin: 0;
}

.text-content p {
  color: #6b7280;
  margin-top: 6px;
  font-size: 14px;
}

.text-content h1 {
  color: #1e3a8a;
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
}

/* Botón de regresar */
a {
  text-decoration: none;
  display: inline-block;
}

.previous {
  background-color: #ffffff;
  color: #1783ff;
  border: 1px solid #1783ff;
  font-size: 18px;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.previous:hover {
  background-color: #1783ff;
  color: #ffffff;
}

.round {
  border-radius: 50%;
}
</style>
