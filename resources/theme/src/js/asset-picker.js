/*
    I feel this JS belongs in the 'laravel-asset-manager' package but I dont know how to set this up. - CC.

    This JS is a direct copy from the Comedy website and is due for a refactor.
 */

var addAssetMarkup = 
    "\
        <a class='asset-add' href=''>\
            <svg class='icon icon-file'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-file'></use></svg> \
            Add asset\
        </a>\
    ",
    clearAssetMarkup = 
    "\
    <a class='asset-clear' href=''>\
        <svg class='icon icon-cross'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-cross'></use></svg> \
        Clear asset\
    </a>\
    ";

// Asset Form Element
$(document).ready(function() {
    // Init any asset elements on page load
    assetInit();

    // Click event listener for adding or updating an asset
    $(document).on('click', '.asset-add, .asset-img', function(e) { 
        e.preventDefault();

        assetOpen($(this).parent().attr("data-id"), $(this).parent().attr("data-title")); 
    });

    // Click event listener for clearing asset
    $(document).on('click', '.asset-clear', function(e) {
        e.preventDefault();

        $(this).parent().parent().find("input").val("");
        assetInit();
    });
});

function assetInit() {
    $(".asset").each(function(index) {
        var URL = $(this).parent().find("input").val();

        // Input is empty, show 'add asset' markup
        if (URL === "")
        {
            $(this).html(addAssetMarkup);
        }

        // Input has a value, show the 'clear asset' markup
        else
        {
            $(this).html(clearAssetMarkup + "<img class='asset-img' src='" + URL + "' />");
        }
    });
}

function assetOpen(caller, title) {
    $('.asset-picker-iframe').attr('src', window.assetModalURL + "?id=" + caller);
    var modal = $('#asset-picker-modal').modal();
}

function assetSelected(caller, URL) {
    var escapedCaller = caller.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1" );

    console.log('Asset selected');
    console.log('Selected asset url: ', URL);
    console.log('Selected caller id: ', escapedCaller);
    console.log('Items matching called id: ', $('#' + escapedCaller));


    $("#" + escapedCaller).val(URL);
    assetInit();
}

function assetClose() {
    $('.asset-picker-iframe').attr('src', 'about:blank');
    $('.modal.in').modal('hide');
}