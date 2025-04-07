<template>
  <button @click="testStore(true, false)">Run Test (only direct)</button><br>
  <button @click="testStore(false, true)">Run Test (only patch)</button><br>
  <button @click="testStore(true, true)">Run Test (direct + patch)</button><br>
  <button @click="resetStore()">Reset</button><br>
  <br>
  <div>direct_counter = {{ store.direct_counter }}</div>
  <div>direct_subscribe = {{ subscribeCounter['direct'] }}</div>
  <div>patch_counter = {{ store.patch_counter }}</div>
  <div>patch_subscribe = {{ subscribeCounter['patch'] }}</div>
</template>

<script setup>
import { useStore, initStore, testStore, resetStore, subscribeCounter } from './store.js'
initStore();
const store = useStore();
</script>

<style>
* {
  background-color: black;
  font-size: larger;
  margin: 10px;
}

div {
  color: white;
}

button {
  color: black;
  background-color: white;
}
</style>
