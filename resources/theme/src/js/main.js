
// Main.js
// ==================================
// General javascript for the project should go in this file. All .js files in
// this folder will be concatenated into the build\app.min.js so if this file
// gets too long, you can break it up into multiple files.

$(document).ready(function() {
    console.log('Project main.js loaded');

    // Find all fields with class 'ckeditor' and init CKEditor on them
    var $wysiwygFields = $('.ckeditor');

    if ($wysiwygFields.length > 0 && typeof CKEDITOR != "undefined") {
        // warnIfChange will bind an event to fire on CKEDITOR instances loaded
        //$('form.warn-on-change').warnIfChanged();
        $wysiwygFields.each(function(index) {
            // Select a CK configuration based on an extra class
            var ckConfigClass = this.className.match(/ckeditor-(.*)( |$)/)[0] || 'ckeditor-full';

            // Init CKEDITOR with the chosen configuration
            if (ckeditorConfig[ckConfigClass]) {
                CKEDITOR.replace(this.name, ckeditorConfig[ckConfigClass]);
            }
        });
    } else {
        // If no CKEDITOR fields on this page, we can run warnIfChanged normally
        //$('form.warn-on-change').warnIfChanged();
    }

    $('form.warn-on-change').warnIfChanged();

    if (typeof CKEDITOR != "undefined") {
        CKEDITOR.on('dialogDefinition', function(ev) {
            var editor = ev.editor;
            var dialogName = ev.data.name;
            var dialogDefinition = ev.data.definition;

            if (dialogName == 'image') {
                var infoTab = dialogDefinition.getContents('info');
                infoTab.remove('txtBorder'); //Remove Element Border From Tab Info
                infoTab.remove('txtHSpace'); //Remove Element Horizontal Space From Tab Info
                infoTab.remove('txtVSpace'); //Remove Element Vertical Space From Tab Info
                //infoTab.remove('txtWidth');  //Remove Element Width From Tab Info
                //infoTab.remove('txtHeight'); //Remove Element Height From Tab Info

                //Remove tab Link
                dialogDefinition.removeContents( 'Link' );
            }
        });
    }
});



function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : "";
}

function is_url_valid(url) {
    // http://stackoverflow.com/questions/2723140/validating-url-with-jquery-without-the-validate-plugin/2723190#2723190
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

var ckeditorConfig = {
    // http://ckeditor.com/tmp/4.5.0-beta/ckeditor/samples/toolbarconfigurator/index.html#basic
    'ckeditor-full': {
        toolbarGroups: [
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others', groups: [ 'others' ] },
            '/',
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] }
        ],
        removeButtons: 'Underline,Subscript,Superscript,Cut,Copy,Paste,SpecialChar,Maximize,About',
        filebrowserBrowseUrl : '/backstage/2017/assets/editor',
        allowedContent : true
    },
    'ckeditor-basic': {
        toolbar: [
            {name: 'basicstyles', items: ['Bold', 'Italic']},
            {name: 'links', items: ['Link', 'Unlink']}
        ]
    },
    'ckeditor-simple': {
        toolbar: [
            {name: 'basicstyles', items: ['Bold', 'Italic']}
        ]
    },
    'ckeditor-simple-hr': {
        toolbar: [
            {name: 'basicstyles', items: ['Bold', 'Italic', 'HorizontalRule']}
        ]
    }
};

// Asset Form Element
$(document).ready(function()
{
    assetInit();
});

function assetInit()
{
    $(".asset").each(function(index)
    {
        var URL = $(this).parent().find("input").val();
        if (URL === "")
        {
            if ($(this).hasClass("video"))
            {
                $(this).html("<div class='asset-add'><svg class='icon icon-file'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-file'></use></svg> ADD ASSET</div><b>- OR -</b><br><textarea class='asset-video' placeholder='Add Video Embed Code'></textarea>");

                $(this).find(".asset-video").blur(function() { assetSelected($(this).parent().attr("data-id"), $(this).val()); });
            }
            else
            {
                $(this).html("<div class='asset-add'><svg class='icon icon-file'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-file'></use></svg> ADD ASSET</div>");
            }

            $(this).find(".asset-add").click(function() { assetOpen($(this).parent().attr("data-id"), $(this).parent().attr("data-title")); });
        }
        else
        {
            var sURL = URL.toLowerCase();
            if (sURL.indexOf("youtube.com") >= 0) //YouTube embed
            {
                $(this).html("<div class='asset-clear'><svg class='icon icon-cross'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-cross'></use></svg> CLEAR ASSET</div>"+URL);
            }
            else if (sURL.indexOf("vimeo.com") >= 0) //Vimeo embed
            {
                $(this).html("<div class='asset-clear'><svg class='icon icon-cross'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-cross'></use></svg> CLEAR ASSET</div>"+URL);
            }
            else if ((sURL.indexOf(".jpeg") >= 0) || (sURL.indexOf(".jpg") >= 0) || (sURL.indexOf(".png") >= 0) || (sURL.indexOf(".gif") >= 0)) //Image
            {
                $(this).html("<div class='asset-clear'><svg class='icon icon-cross'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-cross'></use></svg> CLEAR ASSET</div><img class='asset-img' width='300px' height:='auto' src='"+URL+"' />");

                $(this).find(".asset-img").click(function() { assetOpen($(this).parent().attr("data-id"), $(this).parent().attr("data-title")); });
            }
            else //Document
            {
                $(this).html("<div class='asset-clear'><svg class='icon icon-cross'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-cross'></use></svg> CLEAR ASSET</div><a href='"+URL+"' target='blank'>"+URL+"</a>");
            }

            $(this).find(".asset-clear").click(function() {
                $(this).parent().parent().find("input").val(""); assetInit();
            });
        }
    });
}

function assetOpen(caller, title)
{
    $("body").css("overflow-y", "hidden");

    $.colorbox({
        iframe:true,
        top:0,
        width:"1000px",
        height:"100%",
        href:window.assetModalURL + "?id=" + caller + "&title=" + title,
        onClosed:function() {
            $("body").css("overflow-y", "scroll");
        }
    });
}

function assetSelected(caller, URL)
{
    $("#"+caller).val(URL);

    assetInit();
}

function assetClose()
{
    $.colorbox.close();
}


$(".chosen-select").chosen({search_contains: true, disable_search_threshold: 8});
$(".chosen-select-plain").chosen({disable_search: true, inherit_select_classes: true});


// We can call this when the dataTables have been setup
function onTableSetup() {
    setupConfirmModal();
}

// Setup confirmation modal
var confirmForm = 0;
function setupConfirmModal() {
    $("form.confirm button[type='submit']").click(function () {
        confirmForm = $(this).closest("form.confirm");

        $.colorbox({
            inline: true,
            width: "30%",
            href: "#confirm_content"
        });

        return false;
    });
}

// Capture confirmation modal choice
$(".confirm_link").click(function () {
    var selection = $(this).text();

    if (selection == "Yes") {
        $(confirmForm).submit();
        $.colorbox.close();
    }
    else { //if (selection == "No") {
        $.colorbox.close();
    }
});

$(function() {
    // Call this immediately in case we're not using dataTables here
    setupConfirmModal();

    // Setup focus helper for Chosen dropdown plugin
    $('body').on('focus', '.chosen-container-single input', function(e) {
        //console.log(document.activeElement);
        if (!$(this).closest('.chosen-container').hasClass('chosen-container-active')) {
            var $chosenCont = $(this).closest('.chosen-container');
            $($chosenCont).find("ul.chosen-results").attr("tabindex", "-1");
            $($chosenCont).trigger('mousedown');
        }
    });
});


// Setup "Show more" on help
$(".help__more").click(function () {

    $(this).closest(".help__text").hide();

    var fullHelp = $(this).closest(".help").find(".help__full");
    $(fullHelp).hide();
    $(fullHelp).addClass("open");
    $(fullHelp).slideDown(200);

});