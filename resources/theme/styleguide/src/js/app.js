
// Styleguide app.js
// ==================================
// Javascript to power the styleguide belongs in this file, e.g. styleguide menu
// toggles and SVG sprite sheet injection.
//
// The code in this file should not affect the components in any way.

$(document).ready(function() {
	console.log('Styleguide app.js loaded');

    // Mobile nav toggle
	$(".sg-menu-toggle").on("click", function() {
	    $(".sg-header").toggleClass("menu-nav--active");
	});

	// SVG sprite loader
	// Embeds a .svg file into the page, includes caching
	var BASE = '../';
	$.get(BASE + 'svg/icons.svg', function(data) {
	    var div = document.createElement("div");
	    div.className = 'icons-svg';
	    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	    document.body.insertBefore(div, document.body.childNodes[0]);
	    $(document).trigger('icons:ready');
	});
});