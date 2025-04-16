<template>
  <ion-page>
    <IonHeader>
      <IonToolbar>
        <HeaderMyProfile />
      </IonToolbar>
    </IonHeader>

    <ion-content fullscreen="true" class="ion-padding">
      <div class="profile-container">
        <ion-card class="profile-card center">
          <ion-card-header class="text-centered">
            <div class="avatar-container">
              <ion-avatar class="foto-perfil">
                <img :src="user.avatarUrl" alt="avatar" />
                <ion-icon
                  class="edit-icon"
                  name="camera-outline"
                  @click="changeAvatar"
                ></ion-icon>
              </ion-avatar>
            </div>
          </ion-card-header>

          <ion-card-content>
            <ion-list lines="none">
              <ion-item>
                <ion-label position="stacked">Full Name</ion-label>
                <ion-input
                  v-if="editMode"
                  v-model="user.fullName"
                  placeholder="Enter full name"
                />
                <h3 v-else>{{ user.fullName }}</h3>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Username</ion-label>
                <ion-input
                  v-if="editMode"
                  v-model="user.username"
                  placeholder="Enter username"
                />
                <h3 v-else>{{ user.username }}</h3>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Email</ion-label>
                <ion-input
                  v-if="editMode"
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                />
                <h3 v-else>{{ user.email }}</h3>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Phone Number</ion-label>
                <ion-input
                  v-if="editMode"
                  v-model="user.phone"
                  placeholder="Enter phone"
                />
                <h3 v-else>{{ user.phone }}</h3>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Address</ion-label>
                <ion-input
                  v-if="editMode"
                  v-model="user.address"
                  placeholder="Enter address"
                />
                <h3 v-else>{{ user.address }}</h3>
              </ion-item>
            </ion-list>

     
            <ion-button
              expand="block"
              color="primary"
              v-if="editMode"
              @click="saveProfile"
            >
              <ion-icon slot="start" name="save-outline"></ion-icon>
              Guardar cambios
            </ion-button>
                   <div class="profile-financial-stats">
              <div class="stat">
                <h4>RD$ {{ user.finances.income }}</h4>
                <p>Ingresos</p>
              </div>
              <div class="stat">
                <h4>RD$ {{ user.finances.expenses }}</h4>
                <p>Gastos</p>
              </div>
          
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Botón flotante -->
      <ion-button class="edit-button" @click="toggleEdit">
        <ion-icon :name="editMode ? 'eye-outline' : 'create-outline'" />
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { IonHeader, IonToolbar } from "@ionic/vue";
import HeaderMyProfile from "../components/HeaderMyProfile.vue";

// Mock usuario
const user = ref({
  avatarUrl: "https://i.pravatar.cc/150?img=5",
  fullName: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  phone: "+1 (555) 987-6543",
  address: "456 Main St, City, Country",
  finances: {
    income: 50000,
    expenses: 38000,
    savings: 120000,
  },
});

const editMode = ref(false);

function toggleEdit() {
  editMode.value = !editMode.value;
}

function saveProfile() {
  console.log("Guardado:", user.value);
  editMode.value = false;
}

function logout() {
  console.log("Cerrar sesión...");
}

function changeAvatar() {
  console.log("Cambiar avatar...");
}
</script>

<style scoped>
:root {
  --background-color: #f8f9fa;
  --header-bg: #ffffff;
  --text-color: #212529;
  --list-bg: #ffffff;
  --border-color: #e0e0e0;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

ion-content {
  --background: var(--background-color);
}

.profile-container {
  display: flex;
  justify-content: center;
  padding: 0px 10px 70px;
}

.profile-card {
  width: 100%;
  max-width: 400px;
  margin-top: 0px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 2px 8px var(--shadow-light);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.foto-perfil {
  width: 100px;
  height: 100px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  color: #007bff;
  border-radius: 50%;
  font-size: 18px;
  padding: 5px;
  box-shadow: 0px 2px 5px var(--shadow-light);
}

ion-list {
  background-color: var(--list-bg);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}

ion-item {
  --background: transparent;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

ion-item:last-child {
  border-bottom: none;
}

h3, ion-input {
  margin: 5px 0 0;
  font-size: 16px;
}

ion-input {
  font-size: 18px; /* Tamaño de la fuente */
  height: 40px; /* Ajuste de altura */
  width: 100%; /* Asegura que los inputs ocupen todo el espacio disponible */
  max-width: 100%; /* Ajusta el ancho al máximo disponible */
}

h3 {
  display: inline-block;
}

.profile-financial-stats {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  width: 100%;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-top: 15px;
}

.stat h4 {
  margin: 0;
  font-size: 16px;
  color: #1e3a8a;
  text-align: center;
}

.stat p {
  margin: 0;
  font-size: 13px;
  color: gray;
  text-align: center;
}

.edit-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 22px;
  box-shadow: 0px 2px 10px var(--shadow-light);
  z-index: 10;
}
</style>
