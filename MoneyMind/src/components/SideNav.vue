<template>
  <ion-menu side="start" content-id="main-content" id="MyProfile" swipe-gesture="true">
    <ion-content>
      <ion-header class="profile-header">
        <ion-toolbar>
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" name="close-outline"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          <ion-title class="title">Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Perfil -->
      <div class="profile-info">
        <ion-avatar class="profile-avatar">
          <img src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
        </ion-avatar>
        <h2>Tiana Saris</h2>
        <p>@Broklyn</p>
      </div>

      <!-- Lista de opciones -->
      <ion-list>
        <ion-item-divider>
          <ion-label>Personal Info</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/MyProfile')">
          <ion-icon slot="start" :icon="personOutline"></ion-icon>
          <ion-label>Your Profile</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/HistoryTransaction')">
          <ion-icon slot="start" :icon="timeOutline"></ion-icon>
          <ion-label>History Transaction</ion-label>
        </ion-item>

        <ion-item-divider>
          <ion-label>Security</ion-label>
        </ion-item-divider>
           <ion-item button @click="goTo('/change-password')">
          <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/forgot-password')">
          <ion-icon slot="start" :icon="lockOpenOutline"></ion-icon>
          <ion-label>Forgot Password</ion-label>
        </ion-item>

        <ion-item-divider>
          <ion-label>General</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/notifications')">
          <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
          <ion-label>Notification</ion-label>
        </ion-item>
          <ion-item button @click="goTo('/help')">
          <ion-icon slot="start" :icon="helpCircleOutline"></ion-icon>
          <ion-label>Help and Support</ion-label>
        </ion-item>

        <ion-item button @click="logout" class="logout-item">
          <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonAvatar, IonButton, IonToggle, menuController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { personOutline, timeOutline, fingerPrintOutline, lockClosedOutline, lockOpenOutline, notificationsOutline, globeOutline, helpCircleOutline, logOutOutline } from 'ionicons/icons';

const router = useRouter();

const goTo = async (path) => {
  await menuController.close();
  router.push(path);
};

const logout = async () => {
  await menuController.close();
  router.push('/login');
};
</script>

<style scoped>
.profile-header {
  --background: #ffffff;
  border-bottom: 1px solid #ddd;
}

s {
  color: #333;
  font-weight: bold;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 10px;
  margin: 10px;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  margin-bottom: 12px;
  border: 2px solid #007bff;
}

.profile-info h2 {
  margin: 5px 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.profile-info p {
  margin: 0;
  font-size: 14px;
  color: #777;
}

ion-item-divider {
  --background: #e9ecef;
  --color: #444;
  font-weight: bold;
  font-size: 14px;
}

ion-item {
  --background: #ffffff;
  --color: #333;
  font-size: 16px;
}

ion-item:hover {
  background: #f1f3f5;
}

.logout-item {
  --color: red;
  font-weight: bold;
}

.logout-item ion-icon {
  color: red;
}

.logout-item:hover {
  background: #ffe6e6;
}
</style>