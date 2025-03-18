<template>
    <ion-page>
        <ion-header>
            <div class="transaction-header">
                <div class="text-content">
            <h2>Statistic</h2>
            <p>Tu saldo actual</p>
            <h1>$125,000</h1>
        </div>
    </div>
        </ion-header>

        <ion-content>
                      
            <!-- Aquí se muestra la gráfica -->
            <div class="estadistica">
                <PieChart />
            </div>
            <div class="consumo-mes">
                <ConsumeDelMes />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import PieChart from '@/components/PieChart.vue'; // IMPORTANTE: Importa el componente aquí
import ConsumeDelMes from '../components/ConsumoDelMes.vue';

</script>

<style scoped>
ion-content {
    --background:rgb(255, 255, 255);
}

.estadistica {
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
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
</style>