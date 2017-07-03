/*
    I feel this JS belongs in the 'laravel-asset-manager' package but I dont know how to set this up. - CC.

    This JS is a direct copy from the Comedy website and is due for a refactor.
 */


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

var $modal;

function assetOpen(caller, title)
{
    // $("body").css("overflow-y", "hidden");
    // $.colorbox({
    //     iframe:true,
    //     top:0,
    //     width:"1000px",
    //     height:"100%",
    //     href:window.assetModalURL + "?id=" + caller + "&title=" + title,
    //     onClosed:function() {
    //         $("body").css("overflow-y", "scroll");
    //     }
    // });

    $modal = $('#asset-picker-modal').modal();

    var $modalBody = $modal.find('.modal-body');

    $modalBody.load(window.assetModalURL + "?id=" + caller, function(responseText, textStatus) {
        if ( textStatus === 'success' ||
            textStatus === 'notmodified')
        {
            $modal.show();
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
    $modal.modal('hide');
}