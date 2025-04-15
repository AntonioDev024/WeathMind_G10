<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
            <TransactionHeader :transactionTotal="transactionTotal" />
          </ion-toolbar>
      </ion-header>
      
      <ion-content>
          <TransactionList />

          <!-- Botón flotante para ir a la vista de RegistroFinanzas -->
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button @click="goToRegistroFinanzas">
                  <ion-icon :icon="add"></ion-icon>
              </ion-fab-button>
          </ion-fab>
      </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import TransactionList from '../components/TransactionList.vue';
import TransactionHeader from '../components/TransactionHeader.vue';

const router = useRouter();

// Función para navegar a RegistroFinanzas.vue
const goToRegistroFinanzas = () => {
  router.push('/registro-finanzas'); // Asegúrate de que esta ruta existe en tu router.js
};
</script>

<style scoped>
/* Estilos del botón flotante */
ion-fab {
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
