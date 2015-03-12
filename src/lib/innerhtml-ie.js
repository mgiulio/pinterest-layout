(function() {
	if (! /(msie|trident)/i.test(navigator.userAgent))
		return;

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
})();