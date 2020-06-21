var anglerange = 144 + 144;
var startangle = -144;
var nmarks = 15;
var speedrange = 140;
var speedstep = speedrange/(nmarks-1);

var ticks = []
var callouts = []

var currentspeed = 0;
for (var i = 0; i < nmarks; i++) {
	if (i % 2 == 0) 
		callouts.push(currentspeed)
	else 
		ticks.push(currentspeed)
	currentspeed += speedstep;
}

function mapVelocity(speed) {
	return startangle + anglerange * (speed/speedrange)
}
function whichTicks() {
	return ticks
}
function whichCallouts() {
	return callouts
}
export {mapVelocity, whichTicks, whichCallouts};
