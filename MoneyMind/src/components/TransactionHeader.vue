<template>
    <div class="transaction-header">
        <a href="#" class="previous round">&#8249;</a>
        <div class="text-content">
            <h2>Transacciones</h2>
            <p>Tu saldo actual</p>
            <h1>$125,000</h1>
        </div>
    </div>
</template>

<script setup>
import { IonButton, IonIcon } from '@ionic/vue';
</script>


<style scoped>

.transaction-header {
    text-align: center;
    padding: 30px;
    background: #f9fafb
   }

.text-content h2 {
    color: #1f2937;
    font-weight: semibold;
    margin: 0;
}

.text-content p {
    color: #9ca3af;
    margin: 0;
    font-size: 14px;
    margin-top: 5px;
}

.text-content h1 {
    color: #1e3a8a;
    font-size: 16px;
    font-weight: bold; 
    margin: 10px 0 0;
}

a {
   text-decoration: none;
  display: inline-block;
  padding: 16px 24px;
}

a:hover {
  background-color: #ffffff;
  color: black;
}

.previous {
  background-color: #ffffff;
  color: #1783ff;
  size: 20px;
  border: 0.5px solid #1783ff;
  position: absolute;
  top: 35px; /* Ajusta la distancia desde la parte superior */
  left: 25px; /* Ajusta la distancia desde la parte izquierda */
  padding: 10px 18px; /* Puedes ajustar el tamaño del botón si lo deseas */
}

.next {
  background-color: #04AA6D;
  color: white;
}

.round {
  border-radius: 50%;
}
</style>

