
// CKEditor config and init
// =========================
// The vendor file for CKEditor is included via CDN in the layout view.

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

$(document).ready(function() {
    // Find all fields with class 'ckeditor' and init CKEditor on them
    var $wysiwygFields = $('.ckeditor');

    if ($wysiwygFields.length > 0 && typeof CKEDITOR != "undefined") {
        $wysiwygFields.each(function(index) {
            // Select a CK configuration based on an extra class
            var ckConfigClass = this.className.match(/ckeditor-(.*)( |$)/)[0] || 'ckeditor-full';

            // Init CKEDITOR with the chosen configuration
            if (ckeditorConfig[ckConfigClass]) {
                CKEDITOR.replace(this.name, ckeditorConfig[ckConfigClass]);
            }
        });
    }

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