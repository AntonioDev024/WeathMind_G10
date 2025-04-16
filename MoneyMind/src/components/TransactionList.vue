<template>
  <div class="transaction-list">
    <!-- Filtros -->
    <div class="time-filter">
      <span
        v-for="filter in filters"
        :key="filter"
        :class="{ 'active': selected === filter }"
        @click="selected = filter"
      >
        {{ filter }}
      </span>
    </div>

    <!-- Encabezado de periodo con flechas -->
    <div class="date-header">
      <button class="arrow-button" @click="retrocederPeriodo">←</button>
      <h3 class="month-title">
        {{
          selected === 'Month'
            ? formattedSelectedMonth
            : selected === 'Week'
            ? formattedSelectedWeek
            : selected === 'Year'
            ? 'Año ' + selectedYear
            : selected
        }}
      </h3>
      <button class="arrow-button" @click="avanzarPeriodo">→</button>
    </div>

    <!-- Lista de transacciones -->
    <div class="transaction-scroll">
    <div
      v-if="filteredTransactions.length > 0"
      v-for="(item, index) in filteredTransactions"
      :key="index"
      class="transaction-card"
    >
      <div class="icon-wrapper">
        <ion-icon :name="getIcon(item)" class="transaction-icon"></ion-icon>
      </div>
      <div class="transaction-details">
        <h4>{{ item.description }}</h4>
        <p>{{ formatDate(item.trxDate) }}</p>
      </div>
      <div :class="item.type === 'Gasto' ? 'amount-negative' : 'amount-positive'">
        {{ formatAmount(item.amount, item.type) }}
      </div>
    </div>

    <!-- Imagen si no hay transacciones -->
    <div v-else class="no-transactions">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No transacciones"
        class="empty-img"
      />
      <p>No se encontraron transacciones en este período.</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { IonIcon } from '@ionic/vue';


const selected = ref('Year');
const filters = ['24h', 'Week', 'Month', 'Year'];

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedWeek = ref(getISOWeekString(new Date()));
const selectedYear = ref(new Date().getFullYear());

const allTransactions = ref([]);
const userId = localStorage.getItem('userId');
const jwt = localStorage.getItem('jwtToken');


// Al cambiar filtro, setea fecha por defecto
watch(selected, (newVal) => {
  setDefaultDateForFilter(newVal);
});

// Cargar transacciones
onMounted(async () => {
  setDefaultDateForFilter(selected.value);

  if (!jwt || !userId) return;

  try {
    const res = await fetch(`https://dev.genlabs.us/api/transaction?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    allTransactions.value = data;
  } catch (e) {
    console.error('Error al obtener transacciones', e);
  }
});

// Función para establecer la fecha predeterminada al seleccionar un filtro
const setDefaultDateForFilter = (filter) => {
  const now = new Date();

  if (filter === 'Month') {
    selectedMonth.value = now.toISOString().slice(0, 7);
  } else if (filter === 'Week') {
    selectedWeek.value = getISOWeekString(now);
  } else if (filter === 'Year') {
    selectedYear.value = now.getFullYear();
  }
};

// Navegación entre periodos
const avanzarPeriodo = () => {
  if (selected.value === 'Month') {
    const [year, month] = selectedMonth.value.split('-').map(Number);
    const date = new Date(year, month - 1);
    date.setMonth(date.getMonth() + 1);
    selectedMonth.value = date.toISOString().slice(0, 7);
  }

  if (selected.value === 'Week') {
    const [year, week] = selectedWeek.value.split('-W').map(Number);
    let date = getDateOfISOWeek(week, year);
    date.setDate(date.getDate() + 7);
    selectedWeek.value = getISOWeekString(date);
  }

  if (selected.value === 'Year') {
    selectedYear.value++;
  }
};

const retrocederPeriodo = () => {
  if (selected.value === 'Month') {
    const [year, month] = selectedMonth.value.split('-').map(Number);
    const date = new Date(year, month - 1);
    date.setMonth(date.getMonth() - 1);
    selectedMonth.value = date.toISOString().slice(0, 7);
  }

  if (selected.value === 'Week') {
    const [year, week] = selectedWeek.value.split('-W').map(Number);
    let date = getDateOfISOWeek(week, year);
    date.setDate(date.getDate() - 7);
    selectedWeek.value = getISOWeekString(date);
  }

  if (selected.value === 'Year') {
    selectedYear.value--;
  }
};

// Utilidades de fecha
function getISOWeekString(date) {
  const week = getISOWeek(date);
  return `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;

}



function getISOWeek(date) {
  const tmp = new Date(date.valueOf());
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  return 1 + Math.round(((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function getDateOfISOWeek(week, year) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

// Iconos dinámicos
const getIcon = (transaction) => {
  const type = transaction.type?.toLowerCase() || '';
  const desc = transaction.description?.toLowerCase() || '';
  if (type.includes('gasto') || desc.includes('expense') || desc.includes('compra')) return 'card-outline';
  if (type.includes('ingreso') || desc.includes('salary') || desc.includes('deposit')) return 'cash-outline';
  if (desc.includes('transfer')) return 'swap-horizontal-outline';
  if (desc.includes('investment') || desc.includes('shares')) return 'trending-up-outline';
  if (desc.includes('loan') || desc.includes('prestamo')) return 'briefcase-outline';
  return 'cash-outline';
};

// Monto
const formatAmount = (amount, type) => {
  const symbol = type === 'Gasto' || type === 'Expense' ? '-' : '+';
  return `${symbol}$${parseFloat(amount || 0).toFixed(2)}`;
};

// Fecha legible
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '0001-01-01T00:00:00') return 'Sin fecha disponible';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Títulos legibles
const formattedSelectedMonth = computed(() => {
  const [year, month] = selectedMonth.value.split('-').map(Number);
  const fecha = new Date(year, month - 1);
  return fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
});

const formattedSelectedWeek = computed(() => {
  const [year, weekStr] = selectedWeek.value.split('-W');
  return `Semana ${weekStr} de ${year}`;
});

// Filtro por fecha
const filteredTransactions = computed(() => {
  if (!allTransactions.value.length) return [];

  const now = new Date();

  return allTransactions.value.filter((tx) => {
    if (!tx.trxDate || tx.trxDate === '0001-01-01T00:00:00') return false;
    const txDate = new Date(tx.trxDate);

    switch (selected.value) {
      case '24h':
        return now - txDate <= 24 * 60 * 60 * 1000;
      case 'Week': {
        const [year, weekStr] = selectedWeek.value.split('-W');
        const start = getDateOfISOWeek(parseInt(weekStr), parseInt(year));
        const end = new Date(start);
        end.setDate(end.getDate() + 7);
        return txDate >= start && txDate < end;
      }
      case 'Month': {
        const [year, month] = selectedMonth.value.split('-').map(Number);
        return txDate.getFullYear() === year && txDate.getMonth() + 1 === month;
      }
      case 'Year':
        return txDate.getFullYear() === selectedYear.value;
      default:
        return true;
    }
  });
});



const emit = defineEmits(['updateTotal']);

watch(filteredTransactions, (newList) => {
  const total = newList.reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0);
  emit('updateTotal', total);
}, { immediate: true });


</script>

<style scoped>
.transaction-list {
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.time-filter {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.time-filter span {
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #e0e7ff;
  color: #4338ca;
  font-weight: 500;
  transition: 0.3s;
}

.time-filter .active {
  background-color: #4338ca;
  color: white;
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.arrow-button {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #4338ca;
  font-weight: bold;
  padding: 4px 10px;
  transition: 0.2s;
}

.arrow-button:hover {
  background-color: #e0e7ff;
  border-radius: 8px;
}

.month-title {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
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

.no-transactions {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #9ca3af;
}

.empty-img {
  width: 120px;
  height: auto;
  margin: 0 auto 20px;
  opacity: 0.8;
}

.transaction-scroll {
  max-height: 550px; /* o el tamaño que prefieras */
  overflow-y: auto;
  padding-right: 5px; /* para evitar que el scroll tape contenido */
}

</style>
