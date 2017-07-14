
// https://github.com/RubaXa/Sortable
//
// This is just a config file for our project using sortable.js, the library is 
// stored in the vendor directory.

$(document).ready(function() {

    // Generic sortable config
    $('.sortable').sortable({

    });

    // Page section specific config
    $('.page-sections--sortable').sortable({
        draggable: '.page-section',
        handle: '.panel-handle',
    });

});