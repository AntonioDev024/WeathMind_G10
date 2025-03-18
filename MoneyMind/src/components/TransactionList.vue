<template>
  <div class="transaction-list">
    <!-- Filtros de tiempo -->
    <div class="time-filter">
      <span v-for="filter in filters" :key="filter" 
        :class="{'active': selected === filter}" 
        @click="selected = filter">
        {{ filter }}
      </span>
      
      
    </div>

    <!-- Encabezado de Mes -->
    <h3 class="month-title">{{ selectedMonth }}</h3>

    <!-- Lista de Transacciones -->
    <div class="transaction-card" v-for="(item, index) in filteredTransactions" :key="index">
      <div class="icon-wrapper">
        <ion-icon :name="item.icon" class="transaction-icon"></ion-icon>
      </div>
      <div class="transaction-details">
        <h4>{{ item.title }}</h4>
        <p>{{ item.date }} - {{ item.time }}</p>
      </div>
      <div :class="item.type === 'expense' ? 'amount-negative' : 'amount-positive'">
        {{ item.amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';

const selected = ref('Month');
const filters = ['24h', 'Week', 'Month', 'Year'];
const selectedMonth = ref('October');

const transactions = ref([
  { title: 'Electricity Bill', date: '20 Oct 2024', time: '3:15 pm', amount: '-$250.00', type: 'expense', icon: 'flash-outline' },
  { title: 'Freelance Payment', date: '21 Oct 2024', time: '1:00 pm', amount: '+$500.00', type: 'income', icon: 'briefcase-outline' },
  { title: 'Grocery Shopping', date: '22 Oct 2024', time: '5:30 pm', amount: '-$120.00', type: 'expense', icon: 'cart-outline' },
  { title: 'Gym Membership', date: '23 Oct 2024', time: '8:00 am', amount: '-$60.00', type: 'expense', icon: 'barbell-outline' }
]);

const filteredTransactions = computed(() => {
  switch (selected.value) {
    case '24h':
      return transactions.value.slice(0, 1);
    case 'Week':
      return transactions.value.slice(0, 2);
    case 'Month':
      return transactions.value;
    case 'Year':
      return transactions.value;
   
  }
});

const toggleCalendar = () => {
  console.log('Abrir calendario');
};
</script>

<style scoped>
.transaction-list {
  padding: 20px; /* Agrega espacio alrededor del contenedor */
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.time-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  gap: 10px; /* Espacio entre los elementos */
  padding: 0 10px; /* Añadir espacio a los lados */
  flex-wrap: wrap; /* Permite que los elementos se ajusten */
  overflow: hidden; /* Evita el desbordamiento */
}

.time-filter span {
  padding: 16px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #e0e7ff;
  color: #4338ca;
  font-weight: 500;
  transition: background-color 0.3s ease;
  flex-shrink: 0; /* Evita que los botones se encojan */
}

.time-filter .active {
  background-color: #4338ca;
  color: #fff;
}


.month-title {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  padding-left: 10px; /* Agrega espacio a la izquierda */
}

.transaction-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  padding-left: 20px; /* Agrega espacio a la izquierda */
  padding-right: 20px; /* Agrega espacio a la derecha */
}

.transaction-card:hover {
  transform: translateY(-5px);
}

.icon-wrapper {
  background-color: #eef2ff;
  padding: 12px;
  border-radius: 50%;
}

.transaction-icon {
  font-size: 24px;
  color: #4338ca;
}

.transaction-details {
  flex-grow: 1;
  margin-left: 15px;
}

.transaction-details h4 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #1f2937;
}

.transaction-details p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.amount-negative {
  color: #dc2626;
  font-weight: bold;
}

.amount-positive {
  color: #16a34a;
  font-weight: bold;
}

</style>
