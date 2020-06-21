<template>
	<svg id="dial">
		<path class="dash" v-for="marker in dashes" v-bind:key="marker.speed" :d="marker.path"></path>
		<SpeedCallout v-for="callout in callouts" v-bind:key="callout.key" v-bind:x="callout.x" v-bind:y="callout.y" v-bind:speed="callout.speed" :angle="callout.angle"></SpeedCallout>	
		<circle class="ring" cx="50%" cy="50%" r="125"></circle>
		<SpeedRing :Vperm="Vperm" :Vtarget="Vtarget" :Vint="Vint" :mode="mode" :status="status" :state="state"></SpeedRing>
		<SpeedPointer :Vtrain="Vtrain" :Vperm="Vperm" :Vtarget="Vtarget" :Vint="Vint" :mode="mode" :status="status" :state="state"></SpeedPointer>
	</svg>
</template>

<script>
import SpeedCallout from './SpeedCallout.vue'
import SpeedRing from './SpeedRing.vue'
import SpeedPointer from './SpeedPointer.vue'

import {mapVelocity, whichTicks, whichCallouts} from '../SpeedMap.js'

function calculate_pos(angle, length) {
	var deg2rad = Math.PI/180;
	var centerx = 137;
	var centery = 137; 
	return {x: centerx + Math.sin(angle * deg2rad)*length, y: centery - Math.cos(angle * deg2rad)*length}
}

function calculate_path(angle, length) {
	var start = calculate_pos(angle, 125);
	var end = calculate_pos(angle, 125 - length);
	return "M " + start.x + " " + start.y + " L " + end.x + " " + end.y;
}

export default {
	name: 'SpeedDial',
	props: ['Vtrain', 'Vtarget', 'Vperm', 'Vint', 'mode', 'status', 'state'],
	data: function() {

		var dashes = [];
		var ticks = whichTicks();
		for (const tick of ticks) {
			dashes.push({speed: tick, path: calculate_path(mapVelocity(tick), 15)});
		}

		var callouts = [];
		var callouts_src = whichCallouts();
		for (const callout of callouts_src) {
			var callout_pos = calculate_pos(mapVelocity(callout), 100)
			callouts.push({key: "callout"+callout, speed: callout, angle: mapVelocity(callout), x: callout_pos.x, y: callout_pos.y})
			dashes.push({speed: callout, path: calculate_path(mapVelocity(callout), 25)});
		} 
		return {dashes: dashes, callouts: callouts}
	},
	components: {
		SpeedCallout,
		SpeedRing,
		SpeedPointer
	}
}
</script>
<style>
.ring {
	fill: transparent;
}
.dash {
	stroke: #FFF;
	stroke-width: 1;
}
</style>