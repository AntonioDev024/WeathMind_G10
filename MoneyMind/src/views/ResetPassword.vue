<template>
  <ion-page>
    <ion-header>
      <IonToolbar>
        <ion-title>Reset Password</ion-title>
      </IonToolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="d-flex justify-content-center align-items-center vh-100 centered">
        <ion-card class="p-4 shadow-lg">
          <ion-card-header class="text-center">
            <ion-card-title class="fs-4 font-bold">Set Your New Password</ion-card-title>
            <p>Please enter and confirm your new password.</p>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="changePassword">
              <!-- New Password -->
              <ion-item>
                <ion-label position="floating">New Password</ion-label>
                <ion-input v-model="newPassword" type="password" required placeholder="Enter new password"></ion-input>
              </ion-item>

              <!-- Confirm Password -->
              <ion-item>
                <ion-label position="floating">Confirm Password</ion-label>
                <ion-input v-model="confirmPassword" type="password" required placeholder="Confirm new password"></ion-input>
              </ion-item>

              <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>

              <!-- Submit Button -->
              <ion-button expand="full" type="submit" class="mt-3">
                Change Password
              </ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  alertController
} from '@ionic/vue';

const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();
const route = useRoute();

const showAlert = async (header, message) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ['OK'],
  });
  await alert.present();
};

const validatePassword = (password) => {
  const hasLowerCase = /[a-z]/.test(password);
  if (!hasLowerCase) {
    return 'La contraseña debe tener al menos una letra minúscula (a-z).';
  }
  return null;
};

const changePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = 'Ambos campos son requeridos.';
    return;
  }

  const passwordError = validatePassword(newPassword.value);
  if (passwordError) {
    errorMessage.value = passwordError;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  const token = route.query.token;
  const email = route.query.email;

  if (!token || !email) {
    await showAlert('Error', 'Invalid reset link.');
    return;
  }

  try {
    const response = await fetch('https://dev.genlabs.us/api/account/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        email,
        newPassword: newPassword.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to reset password.');
    }

    await showAlert('Success', 'Your password has been reset successfully.');
    router.push('/login');
  } catch (error) {
    await showAlert('Error', error.message || 'Failed to reset password.');
  }
};
</script>

<style scoped>
:root {
  --background-color: #f8f9fa;
  --form-bg: #ffffff;
  --text-color: #212529;
  --input-bg: #f1f3f4;
  --input-border: #ced4da;
  --button-bg: #0056b3;
  --button-hover: #003f7f;
  --shadow-light: rgba(0, 0, 0, 0.2);
}

.dark {
  --background-color: #121212;
  --form-bg: #1e1e1e;
  --text-color: #ffffff;
  --input-bg: #333;
  --input-border: #444;
  --button-bg: #0a84ff;
  --button-hover: #0056b3;
  --shadow-light: rgba(255, 255, 255, 0.1);
}

ion-content {
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  height: 100vh;
}

ion-item {
  background-color: var(--input-bg);
  border-radius: 8px;
  margin-bottom: 16px;
  --padding-start: 14px;
  --padding-end: 14px;
  border: 1px solid var(--input-border);
}

ion-input {
  --background: transparent;
  --color: var(--text-color);
}

ion-button {
  --background: var(--button-bg) !important;
  --color: white !important;
  --border-radius: 8px;
  --border: 1px solid var(--button-hover);
  font-weight: bold;
  text-transform: uppercase;
}
</style>