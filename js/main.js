if (/(msie|trident)/i.test(navigator.userAgent)) {
	var innerhtml_get = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML").get;
	var innerhtml_set = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML").set;
	
	Object.defineProperty(HTMLElement.prototype, "innerHTML", {
		get: function () {return innerhtml_get.call (this)},
		set: function(new_html) {
			while (this.firstChild)
				this.removeChild(this.firstChild);
			innerhtml_set.call (this, new_html);
		}
	});
}

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
