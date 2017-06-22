// SVG sprite loader
// Embeds a .svg file into the page, includes caching
var BASE = '/vendor/laravel-administrator/';
$.get(BASE + 'svg/icons.svg', function(data) {
    var div = document.createElement("div");
    div.className = 'icons-svg';
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    document.body.insertBefore(div, document.body.childNodes[0]);
});