# arc-lib
 a simple lightweight library for drawing dynamic svg arcs in pure js

<img src="screenshot.png">

repo: https://github.com/justingolden21/arc-lib

demo: http://justingolden.me/arc-lib/

contact: contact@justingolden.me

CDN: http://justingolden.me/arc-lib/arc.js

<hr>

example / docs:

```
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
```