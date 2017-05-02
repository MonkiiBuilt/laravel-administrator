// Toggle Component JS
// ==================================

(function($){
    $.fn.togglable = function (options) {
        let settings = $.extend({
            style: 'down',
            // As a fallback, HTML will by default not have the offClass (so without JS, will show)
            // So let's have an option to initially default to off to hide
            defaultOff: true
        }, options);

        return this.each((index) => {
            var self = $(this[index]);

            // If defaultOff, add off class
            if (settings.defaultOff) {
                self.addClass('toggle--off');
            }

            // Add a 'style' class to be styled
            self.addClass('toggle--' + settings.style);

            // When switch is clicked, toggle a class on the wrapper
            // The .off() prevents it from firing more than once per click
            // (can happen for some reason unknown to me - bound twice somehow?)
            $('.toggle__switch', self).off().on('click', function() {
                self.toggleClass('toggle--off');
            });
    })
    };

})(jQuery);

// Eventual goal is to have fun with ES2015 and replace these charming little
// IIFEs with an export, and actually think about the dependencies between
// components... of course :)