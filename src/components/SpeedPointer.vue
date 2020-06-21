<template>
	<g>
		<path d="M 0 0 L 0 1.5 L 15 1.5 L 23 4.5 L 80 4.5 A 25 25 0 0 0 129.59 0 A 25 25 0 0 0 80 -4.5 L 23 -4.5 L 15 -1.5 L 0 -1.5 z" stroke="transparent" :fill="color" :transform="`translate(32.41 137) rotate(${angle},104.59,0)`"></path>
		<DigitalSpeedIndicator :Vtrain="Vtrain" :bgcolor="color"></DigitalSpeedIndicator>
	</g>
</template>
<script>
import DigitalSpeedIndicator from './DigitalSpeedIndicator.vue';
import {mapVelocity} from '../SpeedMap.js';
import {ETCSColors, Mode, Status, State} from '../etcsdefns.js';
export default {
	name: 'SpeedPointer',
	props: ['Vtrain', 'Vtarget', 'Vperm', 'Vint', 'mode', 'status', 'state'],
	computed: {
		angle: function() {
			return mapVelocity(this.Vtrain)+90
		},
		color: function() {
			if (this.mode == Mode.FS || this.mode == Mode.OS || this.mode == Mode.SR || this.mode == Mode.UN || this.mode == Mode.SH || this.mode == Mode.RV) {
				if (this.status == Status.CSM && (this.state == State.NoS || (this.state == State.IntS && this.Vtrain < this.Vperm))) return ETCSColors.grey;
				if (this.status == Status.PIM || this.status == Status.TSM) {
					if (this.Vtrain < this.Vtarget) {
						if (this.state == State.NoS) return ETCSColors.grey;
						if (this.state == State.IndS) return ETCSColors.grey;
						if (this.state == State.IntS) return ETCSColors.grey;
					} else if (this.Vtrain < this.Vperm) {
						if (this.state == State.NoS) return ETCSColors.white;
						if (this.state == State.IndS) return ETCSColors.yellow;
						if (this.state == State.IntS) return ETCSColors.yellow;
					}
				}
				if (this.state == State.IntS && this.Vtrain > this.Vperm) return ETCSColors.red;
				if (this.state == State.OvS || this.state == State.WaS) return ETCSColors.orange;
				console.log("ft")
				return ETCSColors.red;
			}
			if (this.mode == Mode.NL || this.mode == Mode.SB || this.mode == Mode.PT) {
				return ETCSColors.grey;
			}
			if (this.mode == Mode.TR) {
				return ETCSColors.red;
			}
			return ETCSColors.red;
		}
	},
	components: {DigitalSpeedIndicator}
}
</script>
<style>
</style>