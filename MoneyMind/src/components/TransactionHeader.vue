<template>
  <div class="transaction-header">
    <router-link to="/tabs/homepage" class="back-button">&#8249;</router-link>

    <div class="text-content"> 
      <h2>Transacciones</h2><!-- Contenido de texto 
      <p>Tu saldo total</p>
      <p class="transaction-total">Total de transacciones filtradas: ${{ transactionTotal.toLocaleString() }}</p>
      <p class="transaction-total">Saldo total de productos: ${{ totalBalance.toLocaleString() }}</p>
      <p class="transaction-total">Saldo total de productos filtrados: ${{ transactionTotal.toLocaleString() }}</p>
      <h1>${{ totalBalance.toLocaleString() }}</h1>-->
    </div>

       <div class="balance-types">
      <div
        v-for="(amount, type) in balanceByType"
        :key="type"
        class="balance-item"
      >
        <span class="icon">{{ productTypeMap[type]?.icon || '💼' }}</span>
        <span class="label">{{ productTypeMap[type]?.name || type }}</span>
        <span class="amount">${{ amount.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  getUserBalance();
});

// Variables reactivas
const totalBalance = ref(0);
const balanceByType = ref({});

// Mapeo visual de tipo de producto
const productTypeMap = {
  Saving: { name: 'Ahorro', icon: '💰' },
  Cash: { name: 'Efectivo', icon: '💵' },
  CreditCard: { name: 'Crédito', icon: '💳' },
  Loan: { name: 'Préstamo', icon: '🏦' },
  Investment: { name: 'Inversión', icon: '📈' }
};

// Función para decodificar JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Obtener productos y agrupar balances
const getUserBalance = async () => {
  const token = localStorage.getItem('jwtToken');
  const decoded = parseJwt(token);
  if (!decoded || !decoded.userId) return;

  try {
    const res = await fetch(`https://dev.genlabs.us/api/product/user/${decoded.userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();

    if (res.ok && Array.isArray(data)) {
      const grouped = {};
      let total = 0;

      data.forEach(product => {
        const type = product.productType;
        const balance = product.balance || 0;
        total += balance;
        if (!grouped[type]) grouped[type] = 0;
        grouped[type] += balance;
      });

      totalBalance.value = total;
      balanceByType.value = grouped;
    } else {
      console.error('Error al obtener productos:', data);
    }
  } catch (err) {
    console.error('Error al obtener balance:', err);
  }
};



defineProps({
  transactionTotal: {
    type: Number,
    default: 0
  }
});

</script>

<style scoped>
.transaction-header {
  position: relative;
  background-color: #ffffff;
  padding: 16px 16px 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0 0 16px 16px;
}

.back-button {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 24px;
  left: 24px;
  top: 20px;
  font-size: 24px;
  color: #0a2f73;
  border: 1px solid #0a2f73;
  background-color: #ffffff;
  padding: 8px 14px;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
  justify-content: center;
  display: flex;
  align-items: center;  
}

.back-button:hover {
  background-color: #f1f3f4;
  transform: scale(1.05);
}

.text-content {
  text-align: center;
  margin-top: 10px;
}

.text-content h2 {
  font-size: 22px;
  color: #0a2f73;
  margin: 0;
  font-weight: 600;
}

.text-content p {
  color: #6b7280;
  font-size: 14px;
  margin: 8px 0 0;
}

.text-content h1 {
  font-size: 26px;
  color: #0a2f73;
  font-weight: bold;
  margin-top: 6px;
}

.balance-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
  margin-top: 24px;
  text-align: center;
}

.balance-item {
  background-color: #f1f3f4;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 20px;
  display: block;
  margin-bottom: 6px;
}

.label {
  font-size: 14px;
  color: #4b5563;
}

.amount {
  font-weight: bold;
  font-size: 16px;
  color: #0a2f73;
}
</style>
