/**
 * Created by aethr on 15/10/16.
 */

// IIFE automatically runs
(function ($, window) {


    // jQuery Extension
    // The handler is executed at most once for all elements for all event types.
    $.fn.warnIfChanged = function (options) {
        // Keep track of whether the page is "dirty", ie has changes
        var isDirty = false;

        this.each(function (index) {
            // Cache jQuery objects for the element and any child forms
            var $el = $(this),
                $form = ($el.is('form')) ? $el : $('form', $el);

            // Any change to a child form element marks the page dirty
            $("input, textarea, select", $el).on("change", function(event){
                isDirty = true;
            });

            // Special method for checking CKEditor
            if (typeof CKEDITOR != "undefined") {
                CKEDITOR.on('instanceReady', function (event) {

                    // Need to make sure CKEditor instances are in "warn-on-change" forms.
                    var el = $('textarea[name="'+ event.editor.name + '"]');

                    if ($(el).closest("form").hasClass("warn-on-change")) {

                        event.editor.on('change', function(e) {
                            if (this.checkDirty()) {
                                isDirty = true;
                            }
                        });

                    }
                });
            }

            // Successfully submitting a form clears the dirty flag
            $form.on("submit", function(event){
                isDirty = false;
            });
        });

        // If the page is dirty, throw a warning when the user tries to navigate
        $(window).bind('beforeunload ', function() {
            if (isDirty) {
                return "Are you sure you want to leave this page? Changes that you made may not have been saved.";
            }
        });

        // Allow chaining
        return this;
    };

})(jQuery, window);