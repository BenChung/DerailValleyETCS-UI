<template>
	<text class="callout" :x="cx" :y="cy">{{speed}}</text>
</template>
<script>
// by Hugh Kennedy's ray-aabb-intersection
function intersection (out, ro, rd, aabb) {
  var d = distance(ro, rd, aabb)
  if (d === Infinity) {
    out = null
  } else {
    out = out || []
    for (var i = 0; i < ro.length; i++) {
      out[i] = ro[i] + rd[i] * d
    }
  }

  return out
}

function distance (ro, rd, aabb) {
  var dims = ro.length
  var lo = -Infinity
  var hi = +Infinity

  for (var i = 0; i < dims; i++) {
    var dimLo = (aabb[0][i] - ro[i]) / rd[i]
    var dimHi = (aabb[1][i] - ro[i]) / rd[i]

    if (dimLo > dimHi) {
      var tmp = dimLo
      dimLo = dimHi
      dimHi = tmp
    }

    if (dimHi < lo || dimLo > hi) {
      return Infinity
    }

    if (dimLo > lo) lo = dimLo
    if (dimHi < hi) hi = dimHi
  }

  return lo > hi ? Infinity : lo
}
//end lib code

// this is a horrifying hack but there's no good alternative
function getTextBBox(text) {
	var dummyCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	var textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");

	textEl.setAttribute("style", "text-anchor: middle; alignment-baseline: central");
	textEl.textContent = text;
	dummyCanvas.appendChild(textEl);
	document.body.appendChild(dummyCanvas);
	var bbox = textEl.getBBox();
	document.body.removeChild(dummyCanvas);
	return bbox;
}

function bump_labels(speed, angle, offs) {
	var deg2rad = Math.PI/180;
	var dir = [Math.sin(angle * deg2rad), -Math.cos(angle * deg2rad)];
	var svg_bbox = getTextBBox(String(speed));
	var aabb = [[svg_bbox.x, svg_bbox.y], [svg_bbox.x + svg_bbox.width, svg_bbox.y + svg_bbox.height]];
	var origin = [svg_bbox.x + svg_bbox.width/2, svg_bbox.y + svg_bbox.height/2];
	var out = [0,0];
	
	var align_point = intersection(out, origin, dir, aabb);
	return {x: align_point[0] - origin[0] - dir[0]*offs, y: align_point[1] - origin[1] - dir[1]*offs}
}

export default {
	name: 'SpeedCallout',
	mounted: function () {
		var bump_by = bump_labels(this.speed, this.angle, 2);
		this.cx = this.x + bump_by.x;
		this.cy = this.y + bump_by.y;
	},
	watch: {
		speed: function(newSpeed) {
			var bump_by = bump_labels(newSpeed, this.angle, 2);
			this.cx = this.x + bump_by.x;
			this.cy = this.y + bump_by.y;
		}
	},
	props: ['x', 'y', 'speed', 'angle'],
	data: function () { return {cx:0, cy:0} }
}
</script>
<style>
.callout {
	fill: white;
	text-anchor: middle;
	alignment-baseline: central;
	font-size: 16px;
}
</style>