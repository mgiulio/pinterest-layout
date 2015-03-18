# About
				
This is an implementation of a masonry layout inspired by [Pinterest](http://www.pinterest.com/mgiulio/).
			
# Requirements
			
The items(*pins/cards*) must be displayed left-to-right, top-to-bottom according to their order in the page markup.

The number of used columns must vary depending on the available viewport width and a target column width, and the 
width of a column is fluid. So, for a target column width of 200px:
					
* in the range [0, 399] there is only one column, with 100% width
* in the range [400, 599] there are two columns, each with 50% width.
* in the range [600, 699] there are three columns, each with 1/3 of the viewport width
* ... and so on ...

# CSS-only Solutions
				
The columns requirement could be easily met with the `column-width` property provided by the [CSS Multi-column Layout Module](http://www.w3.org/TR/css3-multicol/) (`column-width: 200px`), but then the items are not arranged in the desidered display order but 
top-to-bottom, left-to-right, flowing like in the columns of a newspaper.
			
Flexbox doesn't seem to help, because with `flow-direction: column` we'd have the same flowing isses as with CSS Multi-columns, and `flow-direction: row` doesn't allow to vertically pack the pins, having a behaviour similar to the positioning of boxes in an inline formatting context.
								
# JavaScript Solution
	
If we have this markup for the items:

```HTML
<ul class="items">
	<li class="item large">
		<h1 class="title">Card #1</h1>
		<div class="featured-image"></div>
		<p class="abstract">This is a short dummy description. This is a short dummy description.</p>
		<p class="tags">
			<span>atag</span>
			<span>anothertag</span>
			<span>yat</span>
		</p>
	</li>
	<!-- Other items here -->
</ul>
```				
			
and this CSS(Sass):
			
```CSS
.items .column {
	list-style: none;
	padding: 0 10px;
	float: left;
	width: 100%;
	box-sizing: border-box;
}

@for $i from 2 through 16/* arbitrary max value */ {
	.items.col-#{$i} .column {
		width: 1 / $i * 100%;
	}
}
```
				
then a first idea is to listen to the window resize event, compute the number of columns for the current viewport width and, if necessary, create them and redistribute the items in the required order:
	
```JavaScript
var 
	minColWidth = 200,
	numCols,
	itemsContainer,
	itemNodes
;

run();

function run() {
	itemsContainer = document.querySelector('.items');
	itemNodes = [].slice.call(itemsContainer.children, 0);
	
	numCols = 99;
	window.addEventListener('resize', computeNewCols, false);
	computeNewCols();
}

function computeNewCols() {
	var newNumCols = Math.floor(window.innerWidth / minColWidth);
	
	if (newNumCols != numCols) {
		numCols = newNumCols;
		buildCols(numCols);
	}
}

function buildCols(num) {
	itemsContainer.innerHTML = '';
	
	if (num === 1)
		itemsContainer.className = 'items';
	else
		itemsContainer.className = 'items col-' + num;
	
	var colNodes = [], i, col;
	for (i = 0; i < num; i++) {
		col = document.createElement('ul');
		col.className = 'column';
		itemsContainer.appendChild(col);
		colNodes.push(col);
	}
	
	itemNodes.forEach(function(n, i) {
		colNodes[i % colNodes.length].appendChild(n);
	});
}
```
			
It works but a drawback is that we started with a list in the markup and now we have `n` of them, with the items *jumping* around them, losing the original markup structure.
		
To avoid this issue and preserve the markup, in the next iteration of this demo/exercise I'll try with absolute positioning, reusing some of the code developed here.
