<template>
	<g transform="translate(111.5 112)">
		<text class="speedtext" transform="translate(14,25)" :fill="fontcolor">{{digit1}}</text>
		<text class="speedtext" transform="translate(31,25)" :fill="fontcolor">{{digit2}}</text>
		<text class="speedtext" transform="translate(48,25)" :fill="fontcolor">{{digit3}}</text>
	</g>
</template>
<script>
import {ETCSColors} from '../etcsdefns.js';
export default {
	name: 'DigitalSpeedIndicator',
	props: ['Vtrain', 'bgcolor'],
	computed: {
		fontcolor: function() {
			if (this.bgcolor == ETCSColors.red) return ETCSColors.white;
			return ETCSColors.black;
		},
		digit1: function() {
			if (this.Vtrain <= 99) return "";
			return Math.floor(this.Vtrain/100);
		},
		digit2: function() {
			if (this.Vtrain <= 9) return "";
			return Math.floor((this.Vtrain % 100)/10);
		},
		digit3: function() {
			return Math.floor(this.Vtrain % 10);
		}
	}
}
</script>  
<style>
.speedtext {
	text-anchor: end;
	alignment-baseline: central;
	font-size: 18px;
}
</style>