<template>
  <div id="dmi">
    <div id="A"></div>
    <SpeedDisplay id="B"></SpeedDisplay>
    <div id="C"></div>
    <div id="D"></div>
    <div id="E"></div>
    <div id="F"></div>
    <div id="G"></div>
    <div id="Z"></div>
    <div id="Y"></div>
    {{ message }}
  </div>
</template>

<script>
import SpeedDisplay from './components/SpeedDisplay.vue'

export default {
  name: 'App',
  components: {
    SpeedDisplay
  }
}
</script>

<style>
#dmi {
  position: absolute;
  width: 640px;
  height: 480px;
  background-color: rgb(3, 17, 34);
}
#dmi > div {
  font-family: sans-serif;
  border: 1px white solid;
}
#dmi > #A {
  position: absolute;
  width: 54px;
  height: 300px;
  top: 15px;
  left: 0px;
}
#dmi > #B {
  position: absolute;
  width: 280px;
  height: 300px;
  top: 15px;
  left: 54px;
}
#dmi > #C {
  position: absolute;
  width: 334px;
  height: 50px;
  top: 315px;
  left: 0px;
}
#dmi > #D {
  position: absolute;
  width: 246px;
  height: 300px;
  top: 15px;
  left: 334px;
}
#dmi > #E {
  position: absolute;
  width: 334px;
  height: 100px;
  top: 365px;
  left: 0px;
}
#dmi > #F {
  position: absolute;
  width: 60px;
  height: 450px;
  top: 15px;
  left: 580px;
}
#dmi > #G {
  position: absolute;
  width: 246px;
  height: 150px;
  top: 315px;
  left: 334px;
}
#dmi > #Z {
  position: absolute;
  width: 640px;
  height: 15px;
  top: 0px;
  left: 0px;
}
#dmi > #Y {
  position: absolute;
  width: 640px;
  height: 15px;
  top: 465px;
  left: 0px;
}
</style>
