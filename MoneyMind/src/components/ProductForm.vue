<template>
    <ion-modal :is-open="isOpen" @didDismiss="onClose">
      <ion-content class="ion-padding">
        <div class="form-container">
          <ion-button fill="clear" class="close-btn" @click="onClose">
            <ion-icon :icon="closeOutline" />
          </ion-button>
  
          <h2 class="text-center">{{ isEditMode ? 'Editar Producto' : 'Registrar Producto' }}</h2>
          <p class="text-center welcome-text font-bold">Ingresa los detalles del producto financiero</p>
  
          <ion-list>
            <div class="input-group">
              <label class="input-label">Nombre del producto</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model="localProduct.name" placeholder="Ej. Cuenta BHD" required />
              </ion-item>
            </div>
  
            <div class="input-group">
              <label class="input-label">Balance</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model.number="localProduct.balance" type="number" placeholder="$0.00" required />
              </ion-item>
            </div>
  
            <div class="input-group">
              <label class="input-label">Tipo de producto</label>
              <ion-item class="input-field" lines="none">
                <ion-select v-model="localProduct.productType" placeholder="Selecciona tipo">
                  <ion-select-option value="Loan">Loan</ion-select-option>
                  <ion-select-option value="CreditCard">Credit Card</ion-select-option>
                  <ion-select-option value="Saving">Saving</ion-select-option>
                  <ion-select-option value="Cash">Cash</ion-select-option>
                  <ion-select-option value="Investment">Investment</ion-select-option>
                </ion-select>
              </ion-item>
            </div>
  
            <!-- Campos dinámicos -->
            <div v-if="localProduct.productType === 'CreditCard'" class="input-group">
              <label class="input-label">Límite de crédito</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model.number="localProduct.extra.creditLimit" type="number" />
              </ion-item>
            </div>
  
            <div v-if="['CreditCard', 'Loan'].includes(localProduct.productType)" class="input-group">
              <label class="input-label">Deuda</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model.number="localProduct.extra.debt" type="number" />
              </ion-item>
            </div>
  
            <div v-if="['Loan', 'Investment'].includes(localProduct.productType)" class="input-group">
              <label class="input-label">Plazo (meses)</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model.number="localProduct.extra.termInMonths" type="number" />
              </ion-item>
            </div>
  
            <div v-if="['Loan', 'Investment'].includes(localProduct.productType)" class="input-group">
              <label class="input-label">Interés (%)</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model.number="localProduct.extra.interestRate" type="number" />
              </ion-item>
            </div>
  
            <div v-if="localProduct.productType === 'CreditCard'" class="input-group">
              <label class="input-label">Fecha de expiración</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model="localProduct.extra.expirationDate" type="date" />
              </ion-item>
            </div>
  
            <div v-if="localProduct.productType === 'Loan'" class="input-group">
              <label class="input-label">Fecha de cierre</label>
              <ion-item class="input-field" lines="none">
                <ion-input v-model="localProduct.extra.endDate" type="date" />
              </ion-item>
            </div>
          </ion-list>
  
          <ion-button expand="full" @click="submitForm">
            {{ isEditMode ? 'Actualizar Producto' : 'Guardar Producto' }}
          </ion-button>
        </div>
      </ion-content>
    </ion-modal>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { closeOutline } from 'ionicons/icons';
  import {
    IonModal, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption,
    IonButton, IonIcon
  } from '@ionic/vue';
  
  const props = defineProps({
    isOpen: Boolean,
    isEditMode: Boolean,
    product: Object,
  });
  
  const emit = defineEmits(['close', 'save']);
  const localProduct = ref({ name: '', balance: 0, productType: '', extra: {} });
  
  watch(() => props.product, (value) => {
    localProduct.value = JSON.parse(JSON.stringify(value || { name: '', balance: 0, productType: '', extra: {} }));
  }, { immediate: true });
  
  const onClose = () => emit('close');
  
  const submitForm = () => emit('save', localProduct.value);
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .input-label {
    font-weight: bold;
    margin: 10px 0 4px;
    text-align: left;
    display: block;
  }
  .input-field {
    margin-bottom: 12px;
    background: #f1f3f4;
    border-radius: 8px;
    --highlight-color-focused: #0a2f73;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    color: #1a1a1a;
    font-size: 20px;
  }
  .form-container {
    max-width: 400px;
    padding: 25px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: auto;
    margin-top: 40px;
  }
  </style>
  