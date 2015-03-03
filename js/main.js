 var 
	minColWidth = 200,
	numCols,
	items,
	docFrag
;

run();

function run() {
	items = document.querySelector('.items');
	docFrag = document.createDocumentFragment();
	[].slice.call(items.children, 0).map(docFrag.appendChild.bind(docFrag));
	
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
	items.innerHTML = '';
	
	if (num === 1)
		items.className = 'items';
	else
		items.className = 'items col-' + num;
	
	var colNodes = [], i, col;
	for (i = 0; i < num; i++) {
		col = document.createElement('ul');
		col.className = 'column';
		items.appendChild(col);
		colNodes.push(col);
	}
	
	for (i = 0; i < docFrag.children.length; i++)
		colNodes[i % colNodes.length].appendChild(docFrag.children[i].cloneNode(true));
	
}
