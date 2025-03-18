<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const canvas = ref(null);

onMounted(() => {
  new Chart(canvas.value, {
    type: 'pie',
    data: {
      labels: ['Servicios', 'Educación', 'Compras Online', 'Seguros', 'Supermercado'],
      datasets: [
        {
          data: [21, 26, 21, 16, 16],
          backgroundColor: ['#9B59B6', '#2ECC71', '#34495E', '#3498DB', '#E67E22'],
          hoverBackgroundColor: ['#8E44AD', '#27AE60', '#2C3E50', '#2980B9', '#D35400'],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom', // Mueve la leyenda debajo del gráfico
          labels: {
            color: '#000',
            usePointStyle: true, // Hace que los iconos de la leyenda sean circulares
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}%`,
          },
        },
      },
    },
  });
});
</script>

<style scoped>
canvas {
  max-width: 400px;
  max-height: 400px;
}
</style>
