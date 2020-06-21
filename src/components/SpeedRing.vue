<template>
	<g>
		<path :d="base_path" class="nspeed_base"></path>
		<path :d="permit_path" class="vpermit" :stroke="permit_fill"></path>
		<path :d="target_path" class="vtarget" :stroke="target_fill"></path>
		<path :d="permit_hook_path" class="permit_hook" :stroke="hook_fill"></path>
		<path :d="ovs_path" class="ovs" :stroke="ovs_fill"></path>
	</g>
</template>
<script>
import {mapVelocity} from '../SpeedMap.js'
import {ETCSColors, Status, State} from '../etcsdefns.js';
function calculate_pos(angle, length) {
	var deg2rad = Math.PI/180;
	var centerx = 137;
	var centery = 137; 
	return {x: centerx + Math.sin(angle * deg2rad)*length, y: centery - Math.cos(angle * deg2rad)*length}
}
function compute_path(start, end, radii) {
	var origin = calculate_pos(start, radii);
	var base = end;
	if (base > start + 180) {
		base = start + 180;
	}
	var endP = calculate_pos(base, radii);
	var path = "M " + origin.x + " " + origin.y + "A "+ radii + " " + radii + " 1 0 1 "+endP.x + " " + endP.y;
	if (end > start) {
		var secondEnd = calculate_pos(end, radii);
		path += "A 132.5 132.5 1 0 1" + secondEnd.x + " " + secondEnd.y;
	}
	return path
}
function hook(at) {
	var angular_setback = 6/117*180/Math.PI
	var endAngle = mapVelocity(at)
	var start = calculate_pos(endAngle - angular_setback, 127)
	var end = calculate_pos(endAngle, 127)
	return "M " + start.x + " " + start.y + "A 132.5 132.5 1 0 1 "+end.x+" " + end.y
	
}
function target_fill(ring) {
	if (ring.status == "TSM" && ring.state != "NoS") {
		return ETCSColors.yellow 
	}
	return ETCSColors.white
}
export default {
	name: 'SpeedRing',
	props: ['Vperm', 'Vtarget', 'Vint', 'status', 'state'],
	computed: {
		permit_path: function() {
			return compute_path(-144, mapVelocity(Math.min(this.Vperm, this.Vtarget)), 132.5);
		},
		target_path: function() {
			if (this.Vperm < this.Vtarget) return "";
			return compute_path(mapVelocity(this.Vtarget), mapVelocity(this.Vperm), 132.5);
		},
		base_path: function() {
			return compute_path(-149, -144, 132.5);
		},
		ovs_path: function() {
			if (this.state == State.NoS || this.state == State.IndS) return "";
			return compute_path(mapVelocity(this.Vperm), mapVelocity(this.Vint), 127);
		},
		permit_hook_path: function() {
			return hook(Math.max(this.Vperm, this.Vtarget));
		},
		permit_fill: function() {
			return ETCSColors.dark_grey
		},
		target_fill: function() {
			return target_fill(this)
		},
		hook_fill: function() {
			if (this.status != Status.CSM && this.Vperm > this.Vtarget) {
				return target_fill(this)
			}
			return ETCSColors.dark_grey
		},
		ovs_fill: function() {
			if (this.state == State.IntS) return ETCSColors.red;
			return ETCSColors.orange
		}
	}
}
//class="speed" cx="50%" cy="50%" r="132.5"
</script>
<style>
.vpermit {
	fill: transparent;
	stroke-width: 9;
}
.vtarget {
	fill: transparent;
	stroke-width: 9;
}
.nspeed_base {
	fill: transparent;
	stroke: rgb(85, 85, 85);
	stroke-width:9;
}
.permit_hook {
	stroke-width: 20;
}
.ovs {
	stroke-width: 20;
}
</style>