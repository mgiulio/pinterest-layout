function run(){itemsContainer=document.querySelector(".items"),itemNodes=[].slice.call(itemsContainer.children,0),numCols=99,window.addEventListener("resize",computeNewCols,!1),computeNewCols()}function computeNewCols(){var a=Math.floor(window.innerWidth/minColWidth);a!=numCols&&(numCols=a,buildCols(numCols))}function buildCols(a){itemsContainer.innerHTML="",itemsContainer.className=1===a?"items":"items col-"+a;var b,c,d=[];for(b=0;a>b;b++)c=document.createElement("ul"),c.className="column",itemsContainer.appendChild(c),d.push(c);itemNodes.forEach(function(a,b){d[b%d.length].appendChild(a)})}!function(){if(/(msie|trident)/i.test(navigator.userAgent)){var a=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"innerHTML").get,b=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"innerHTML").set;Object.defineProperty(HTMLElement.prototype,"innerHTML",{get:function(){return a.call(this)},set:function(a){for(;this.firstChild;)this.removeChild(this.firstChild);b.call(this,a)}})}}();var minColWidth=200,numCols,itemsContainer,itemNodes;run();
//# sourceMappingURL=script.js.map