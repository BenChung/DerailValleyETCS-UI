<template>
	<div id="B">
		<SpeedDial id="dial" v-bind:Vtrain="30" v-bind:Vperm="50" v-bind:Vtarget="40" v-bind:Vint="55" mode="FS" status="TSM" state="NoS"></SpeedDial>
		<div id="B3">B3</div>
		<div id="B4">B4</div>
		<div id="B5">B5</div>
		<div id="B6">B6</div>
		<div id="B7">B7</div>
	</div>
</template>

<script>
import SpeedDial from './SpeedDial.vue'

export default {
  name: 'SpeedDisplay',
  components: {
    SpeedDial
  }
}
</script>

<style>
div#B {
	color: white;
}
#dial {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 274px;
	height: 274px;
}
#B > div {
	text-align: center;
}
#B > #B3 {
	position: absolute;
	left: 86px;
	bottom: 8px;
	height: 36px;
	width: 36px;
}
#B > #B4 {
	position: absolute;
	left: 122px;
	bottom: 8px;
	height: 36px;
	width: 36px;
}
#B > #B5 {
	position: absolute;
	left: 158px;
	bottom: 8px;
	height: 36px;
	width: 36px;
}
#B > #B6 {
	position: absolute;
	left: 8px;
	bottom: 8px;
	height: 36px;
	width: 36px;
}
#B > #B7 {
	position: absolute;
	right: 8px;
	bottom: 8px;
	height: 36px;
	width: 36px;
}
</style>