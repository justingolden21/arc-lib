// https://stackoverflow.com/a/18473154/4907950

function polarToCartesian(cx, cy, r, deg) {
	let rad = (deg-90) * Math.PI / 180;

	return {
		x: cx + (r * Math.cos(rad) ),
		y: cy + (r * Math.sin(rad) )
	};
}

function describeArc(x, y, r, startAngle, endAngle){
	let start = polarToCartesian(x, y, r, endAngle);
	let end = polarToCartesian(x, y, r, startAngle);
	let largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

	return [
		'M', start.x, start.y, 
		'A', r, r, 0, largeArcFlag, 0, end.x, end.y
	].join(' ');
}

// https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/

function describeCircle(cx, cy, r) {
	return [
		'M', (cx-r), cy,
		'a', r, r, 0, 1, 0, (r*2), 0,
		'a', r, r, 0, 1, 0, (-r*2), 0
	].join(' ');
}

// public function
function getArc(percent, options) {
	if(!options) options = {};
	let size = options.size || 32;
	let strokeWidth = options.strokeWidth || 8;
	let strokeColor = options.strokeColor || 'black';
	let startAngle = options.startAngle || 0;
	let fill = options.fill || false;

	if(fill)
		strokeWidth = size/2;

	let d;
	if(percent==1) {
		d = describeCircle(size/2,size/2,size/2-strokeWidth/2);
	}
	else {
		d = describeArc(size/2,size/2,size/2-strokeWidth/2,0+startAngle,percent*360+startAngle);
	}

	return `
		<svg width="${size}px" height="${size}px">
			<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}px"/>
		</svg>
	`;
};

const append = (elm, str) => elm.innerHTML += str;
const prepend = (elm, str) => elm.innerHTML = str + elm.innerHTML;
const update = (elm, str) => elm.innerHTML = str;

// public function
function addArc(percent, options, elm, addMode='append') {
	let str = getArc(percent, options);
	if(addMode=='append')
		append(elm, str);
	else if(addMode=='prepend')
		prepend(elm, str);
	else if(addMode=='update') {
		// if update is called without an svg, update the elm, otherwise find the svg and update it
		if(elm.querySelector('svg')==null)
			update(elm, str);
		else
			update(elm.querySelector('svg'), str);
	}

	return str;
}

// todo add error checking

let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');

// getArc example
let options = {size: 40, strokeWidth: 6, strokeColor:'green', fill:true, startAngle:20};
let svg = getArc(.60, options);
container1.innerHTML += svg;

// addArc example
addArc(0.8, {size: 24, strokeWidth: 3}, container2, 'prepend');

// addArc update example
setTimeout( ()=> {
	addArc(0.4, {size: 24, strokeWidth: 3}, container2, 'update');
}, 500);
