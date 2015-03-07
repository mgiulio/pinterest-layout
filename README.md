# About
				
This is an implementation of a masonry layout inspired by [Pinterest](http://www.pinterest.com/mgiulio/).
			
# Requirements
			
The items(*pins/cards*) must be displayed left-to-right, top-to-bottom according to their order in the page markup.

The number of used columns varies depending on the available viewport width based on a target column width of 200px, and the 
width of a column is fluid. So:
					
* in the range [0, 399] there is only one column, with 100% width
* in the range [400, 599] there are two columns, each with 50% width.
* in the range [600, 699] there are three columns, each with 1/3 of the viewport width
* ... and so on ...
				
# CSS-only Solutions
				
The columns requirement could be easily meet with [CSS MultiColumns], but then the items are not arranged in the wanter display order but 
top-to-bottom, left-to-right, like in te columns of a newspaper.
			
Flexbox doesn't semm to help, because it mantains regoral row lines as in inline formatting.
								
# JavaScript solution
	
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
			
and with this CSS:
			
```CSS
.items .column {
	list-style: none;
	padding: 0 10px;
	float: left;
	width: 100%;
	box-sizing: border-box;
}

@for $i from 2 through 16 {
	.items.col-#{$i} .column {
		width: 1 / $i * 100%;
	}
}
```
				
then a first idea is to manually create and manage the columns with the DOM manipulations and ditributing the items between them in the required order:
	
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
			
It works but a disvantage is that we started with a list in the markup and now we have n of them, with the items <em>jumping</em> around them. 
So we have lost the original markup structure and it semanticity.
		
To avoid this issue and preserve the markup I think the only way it is to use absolutly positioning items(*coming soon, I hope*).
			
# Some code comments
				
VanillaJS

IE innerHTML shim
			
No need for window resize throttling
