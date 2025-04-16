<template>
  <ion-page>
    <!-- Encabezado -->
    <ion-header>
      <IonToolbar>
        <HeaderForgotPassword></HeaderForgotPassword>
      </IonToolbar>

    </ion-header>

    <!-- Contenido -->
    <ion-content class="ion-padding" fullscreen="true">
      <div class="d-flex justify-content-center align-items-center vh-100 centered">
        <ion-card class="p-4 shadow-lg">
          <ion-card-header class="text-center">
            <ion-card-title class="fs-4 font-bold"> <h2>Reset Your Password </h2></ion-card-title>
            <p>Enter your email to receive a password reset link.</p>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="sendResetLink">
              <!-- Email -->
              <ion-item lines="none">
                <div class="label-container">
                                 
                <ion-input
                  v-model.trim="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  @ionInput="email = $event.target.value"
                ></ion-input></div>
              </ion-item>

              <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>

              <!-- Botón -->
              <ion-button expand="full" type="submit" class="mt-3">
                Send Reset Link
              </ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { alertController, IonToolbar } from '@ionic/vue'
import HeaderForgotPassword from '../components/HeaderForgotPassword.vue'



const email = ref('')
const router = useRouter()



const showAlert = async (header, message) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ['OK'],
  })
  await alert.present()
}

const sendResetLink = async () => {
  const trimmedEmail = email.value ? email.value.trim() : ''
  console.log('Email value:', email.value)
  console.log('Trimmed email value:', trimmedEmail)
  
  if (!trimmedEmail) {
    return showAlert('Missing Email', 'Please enter your email address.')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    return showAlert('Invalid Email', 'Please enter a valid email address.')
  }

  try {
    const response = await fetch('https://dev.genlabs.us/api/account/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Error sending reset link')
    }

    await showAlert('Link Sent', 'Please check your email for password reset instructions.')
    router.push('/login')
  } catch (error) {
    await showAlert('Error', error.message || 'Error sending reset link. Please try again later.')
  }
}
</script>

<style scoped>
:root {
  --background-color: #f0f4f8;
  --form-bg: #ffffff;
  --text-color: #1f2937;
  --input-bg: #f9fafb;
  --input-border: #d1d5db;
  --button-bg: #003366;
  --button-hover: #002244;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

.dark {
  --background-color: #111827;
  --form-bg: #1f2937;
  --text-color: #f3f4f6;
  --input-bg: #374151;
  --input-border: #4b5563;
  --button-bg: #2563eb;
  --button-hover: #1d4ed8;
  --shadow-light: rgba(255, 255, 255, 0.05);
}

/* Fondo principal */
ion-content {
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  height: 100vh;
}

/* Contenedor */
.container {
  background: var(--form-bg);
  max-width: 360px;
  width: 100%;
  padding: 30px 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px var(--shadow-light);
  text-align: center;
  color: var(--text-color);
}

/* Header */
.header {
  margin-bottom: 10px;
}

.h2 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: var(--text-color);
}

.header p {
  font-size: 14px;
  color: #6b7280;
  margin: 10px 0 20px;
}

/* Inputs */
ion-item {
  background-color: var(--input-bg);
  border-radius: 10px;
  --padding-start: 14px;
  --padding-end: 14px;
  border: 1px solid var(--input-border);
  margin-bottom: 20px;
}

ion-input {
  --background: transparent;
  --color: var(--text-color);
}

.label-container {
  text-align: left;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-top: 10px;
  }

/* Botón */
ion-button {
  --background: var(--button-bg);
  --color: white;
  --border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
}

ion-button:hover {
  --background: var(--button-hover) !important;
}

/* Modo oscuro compatibilidad extra */
.dark ion-page {
  background-color: var(--background-color);
}

.dark ion-content,
.dark .container {
  background-color: var(--form-bg);
}

.dark ion-item {
  --background: var(--input-bg);
  border: 1px solid var(--input-border);
}

.dark ion-input {
  --color: var(--text-color);
}

.text-center {
  text-align: center;
}

.fs-4 font-bold {
  font-size: 1.5rem;
  font-weight: bold;
}

</style>
