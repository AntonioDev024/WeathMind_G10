<template>
  <ion-list>
    <ion-item>
      <ion-label position="stacked">Tipo</ion-label>
      <ion-input placeholder="Gasto" disabled></ion-input>
    </ion-item>
    
    <ion-item>
      <ion-label position="stacked">Monto</ion-label>
      <ion-input type="number" placeholder="$0.00"></ion-input>
    </ion-item>
    
    <ion-item>
      <ion-label position="stacked">Fecha</ion-label>
      <ion-input placeholder="dd/mm/aaaa"></ion-input>
    </ion-item>
    
    <ion-item>
      <ion-label position="stacked">Categoría</ion-label>
      <ion-select placeholder="Seleccionar categoría">
        <ion-select-option value="comida">Comida</ion-select-option>
        <ion-select-option value="transporte">Transporte</ion-select-option>
        <ion-select-option value="salud">Salud</ion-select-option>
      </ion-select>
    </ion-item>
    
    <ion-item>
      <ion-label position="stacked">Tipo de cuenta</ion-label>
      <ion-select placeholder="Seleccionar tipo de cuenta">
        <ion-select-option value="debito">Débito</ion-select-option>
        <ion-select-option value="credito">Crédito</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  
  <ion-button expand="full" color="primary" class="button">Guardar</ion-button>
</template>

<script setup>
import {  IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

</script>

<style>
ion-list {
background: #ffffff;
padding: 20px;
border-radius: 12px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

ion-item {
--background: transparent; /* Hace que el fondo sea transparente */
--color: #333;
--padding-start: 20px;
--padding-end: 20px;
--border-radius: 0; /* Elimina bordes del ion-item */
--box-shadow: none; /* Quita cualquier sombra en el ion-item */
border: none; /* Asegura que no haya bordes extra */
margin-bottom: 15px;
}

ion-label {
font-weight: 600;
font-size: 16px;
color: #555;
margin-bottom: 5px;
}

ion-input,
ion-select {
--background: #ffffff;
--border-radius: 8px;
--padding-start: 16px;
--padding-end: 16px;
--color: #333;
--box-shadow: none;
height: 48px;
font-size: 14px;

}

ion-select::placeholder,
ion-input::placeholder {
color: #999;
}

ion-button {
display: block; 
margin: 25px auto; 

color: #fff; 
border-radius: 30%; 
font-size: 16px;
font-weight: 600;
padding: 12px;
width: 50%; 
box-shadow: none; 
border-radius: 2px; 
transition: background-color 0.3s ease, transform 0.2s ease, border-color 0.3s ease;
}

ion-button:hover {
transform: translateY(-3px); /* Efecto sutil al pasar el cursor */
}

ion-item:last-child {
margin-bottom: 0;
}

a {
text-decoration: none;
display: inline-block;
padding: 16px 32px;
}

a:hover {
background-color: #f5f2f2;
color: blue;
}

.previous {
background-color: #ffffff;
color: blue;
}

.next {
background-color: #0e2ee2;
color: white;
}

.round {
border-radius: 50%;
}
</style>


