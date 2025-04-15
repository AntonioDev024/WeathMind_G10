<template>
  <ion-menu side="start" content-id="main-content" id="MyProfile" swipe-gesture="true">
    <ion-content>
      <ion-header>
        <ion-toolbar class="menu-toolbar">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button fill="clear" class="close-button">
                <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title class="title">Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="profile-info">
        <ion-avatar class="profile-avatar">
          <img :src="userProfile.profilePicture" alt="User Avatar" />
        </ion-avatar>
        <h2>{{ userProfile.fullName }}</h2>
        <p>{{ userProfile.email }}</p>
      </div>

      <ion-list class="custom-list">
        <ion-item-divider>
          <ion-label>Personal Info</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/MyProfile')">
          <ion-icon slot="start" :icon="personOutline"></ion-icon>
          <ion-label>Your Profile</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/tabs/mycards')">
          <ion-icon slot="start" :icon="timeOutline"></ion-icon>
          <ion-label>History Transaction</ion-label>
        </ion-item>

        <ion-item-divider>
          <ion-label>Security</ion-label>
        </ion-item-divider>
          <ion-item button @click="goTo('/ChangePassword')">
          <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
       

        <ion-item-divider>
          <ion-label>General</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/notifications')">
          <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
          <ion-label>Notification</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/languages')">
          <ion-icon slot="start" :icon="globeOutline"></ion-icon>
          <ion-label>Languages</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/help-support')">
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
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonAvatar, IonButton, IonButtons, IonToggle, IonMenuToggle, menuController
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
  personOutline, timeOutline, fingerPrintOutline,
  lockClosedOutline, lockOpenOutline, notificationsOutline, globeOutline,
  helpCircleOutline, logOutOutline, closeOutline
} from 'ionicons/icons';


const router = useRouter();

const userProfile = ref({
  fullName: 'Usuario',
  email: 'user@email.com',
  profilePicture: 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
});

onMounted(() => {
  const stored = localStorage.getItem('userData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      userProfile.value.fullName = parsed.fullName || 'Usuario';
      userProfile.value.email = parsed.email || 'user@email.com';
      userProfile.value.profilePicture = parsed.profilePicture || userProfile.value.profilePicture;
    } catch (error) {
      console.error('Error al leer userData:', error);
    }
  }
});

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
.menu-toolbar {
  --background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.title {
  color: #1e1e1e;
  font-weight: 600;
  font-size: 20px;
}

.close-button {
  color: #007bff;
  font-size: 22px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4f8;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  margin-bottom: 12px;
  border: 3px solid #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  object-fit: cover;
}

.profile-info h2 {
  margin: 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.profile-info p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

ion-list.custom-list {
  padding: 8px;
}

ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --background: transparent;
  border-radius: 12px;
  margin: 6px 12px;
  transition: background-color 0.2s ease-in-out;
}

ion-item:hover {
  --background: #f0f0f0;
}

ion-item-divider {
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 13px;
  text-transform: uppercase;
  color: #888;
}

.logout-item {
  margin-top: 12px;
  --color: red;
}

.logout-item ion-icon {
  color: red;
}

</style>
