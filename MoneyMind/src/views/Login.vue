<template>
  <ion-page :class="{ 'dark-mode': isDarkMode }">
    <ion-content class="ion-padding">
      <div class="form-container centered">
        <h2 class="text-center">{{ isLogin ? 'Sign In' : 'Sign Up' }}</h2>
        <p class="text-center welcome-text">{{ isLogin ? 'Welcome Back! 👋' : 'Create a new account 🎉' }}</p>
        
        <ion-list>
          <div v-if="!isLogin" class="input-group">
            <label class="input-label">Full Name</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="fullName" type="text" placeholder="Enter your full name" required></ion-input>
            </ion-item>
          </div>

          <div class="input-group">
            <label class="input-label">Email Address</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="email" type="email" placeholder="Enter your email address" required></ion-input>
            </ion-item>
          </div>

          <div class="input-group">
            <label class="input-label">Password</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required></ion-input>
              <ion-icon :icon="showPassword ? eyeOff : eye" slot="end" @click="togglePassword" class="eye-icon"></ion-icon>
            </ion-item>
            <p v-if="!isLogin" class="password-hint">
              Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
            </p>
          </div>

          <!-- Campo para OTP solo cuando se solicita -->
          <div v-if="showOtpInput" class="input-group">
            <label class="input-label">Enter OTP</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="otp" type="text" placeholder="Enter the OTP sent to your email" required></ion-input>
            </ion-item>
          </div>
        </ion-list>

        <!-- reCAPTCHA -->
        <div class="recaptcha-container">
          <vue-recaptcha 
            sitekey="YOUR_SITE_KEY" 
            @verify="onCaptchaVerified" 
            @expired="onCaptchaExpired" 
            ref="recaptchaRef"
          ></vue-recaptcha>
        </div>
        
        <!-- Botón para Login o Registro -->
        <ion-button v-if="!showOtpInput" expand="full" @click="isLogin ? login() : signUp()" class="form-btn" :disabled="!isCaptchaVerified">
          {{ isLogin ? 'Sign In' : 'Sign Up' }}
        </ion-button>


        <!-- Botón para verificar OTP -->
        <ion-button v-if="showOtpInput" expand="full" @click="verifyOtp()" class="form-btn verify-btn">
          Verify OTP
        </ion-button>

        <p class="text-center account-text">
          {{ isLogin ? `Don't have an account?` : `Already have an account?` }}
          <a href="#" @click.prevent="toggleForm" class="toggle-link">{{ isLogin ? 'Sign Up' : 'Sign In' }}</a>
        </p>


        
    
      </div>
    </ion-content>
  </ion-page>
</template>



<script>
import { ref } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { eye, eyeOff } from 'ionicons/icons';

export default {
  name: 'UserLogin',
  components: { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonIcon },
  setup() {
    const isLogin = ref(true);
    const fullName = ref('');
    const email = ref('');
    const password = ref('');
    const otp = ref('');
    const showPassword = ref(false);
    const isDarkMode = ref(false);
    const showOtpInput = ref(false); // Para mostrar el campo OTP

    // Validar contraseña segura
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
      showOtpInput.value = false;
    };

    // Función para solicitar OTP
    const requestOtp = async () => {
      try {
        const response = await fetch('https://api.tuapp.com/auth/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value })
        });

        if (!response.ok) throw new Error('Error al solicitar OTP');

        showOtpInput.value = true; // Muestra el input para OTP
        console.log('OTP enviado al email');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Función para verificar OTP y completar el login
    const verifyOtp = async () => {
      try {
        const response = await fetch('https://api.tuapp.com/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, otp: otp.value })
        });

        if (!response.ok) throw new Error('OTP incorrecto o expirado');

        console.log('Inicio de sesión exitoso');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Función de login con OTP
    const login = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
      }

      try {
        // Aquí podrías hacer la autenticación del usuario antes de solicitar OTP
        await requestOtp();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Función de registro con validación de contraseña segura
    const signUp = async () => {
      if (!fullName.value.trim() || !email.value.trim()) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      if (!validatePassword(password.value)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.');
        return;
      }

      try {
        const response = await fetch('https://api.tuapp.com/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: fullName.value,
            email: email.value,
            password: password.value
          })
        });

        if (!response.ok) throw new Error('Error al registrarse');

        console.log('Registro exitoso, por favor inicia sesión.');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return { 
      isLogin, fullName, email, password, otp, showPassword, togglePassword, login, signUp, 
      eye, eyeOff, toggleForm, isDarkMode, showOtpInput, verifyOtp 
    };
  }
};
</script>

<style>
:root {
  --background-color: #f8f9fa; /* Fondo general claro */
  --form-bg: #ffffff; /* Fondo blanco del formulario */
  --text-color: #000000; /* Texto negro */
  --input-bg: #f1f3f4; /* Fondo claro para inputs */
  --input-border: #ccc; /* Borde gris claro */
  --button-bg: #007bff; /* Azul para el botón */
  --button-hover: #0056b3; /* Azul más oscuro al pasar el mouse */
}

/* Estilos generales */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: Arial, sans-serif;
}

/* Contenedor del formulario */
.form-container {
  max-width: 400px;
  padding: 20px;
  text-align: center;
  background: var(--form-bg);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
}
/* Texto principal */
.text-center {
  text-align: center;
  color: var(--text-color);
}

/* Labels en color negro */
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-color);
}

/* Inputs */
.input-field {
  width: 100%;
  padding: 10px;
  border: none; /* 🔥 Elimina el borde estático */
  border-bottom: 2px solid var(--input-border); /* Solo un borde inferior */
  border-radius: 2px; /* 🔹 Evita esquinas redondeadas */
  background-color: var(--input-bg);
  color: var(--text-color);
  outline: none; /* 🔥 Evita el contorno azul predeterminado */
  transition: border-color 0.3s ease-in-out;
}

/* Efecto cuando el usuario selecciona el input */
.input-field:focus {
  border-bottom: 2px solid var(--button-bg); /* Color llamativo al hacer focus */
}


/* Botón */
.form-btn {
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.form-btn:focus {
  outline: none; /* 🔥 Evita el contorno azul al hacer clic */
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* ✨ Opcional: resalta con sombra */
}

.form-btn:hover {
  background-color: var(--button-hover);
}

/* Enlaces */
.toggle-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.toggle-link:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #121212;
    --form-bg: #1e1e1e;
    --text-color: #ffffff;
    --input-bg: #2c2c2c;
    --input-border: #444;
    --button-bg: #007bff;
    --button-hover: #0056b3;
  }
}

</style>
