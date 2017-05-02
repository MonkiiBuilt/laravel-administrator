// Search Component JS
// ==================================

(function($){
    $.fn.expandableSearch = function (options) {
        let settings = $.extend({
            type: ''
        }, options);

        // Adding options
        this.data({
            type: settings.type
        });

        function expandSearch (event) {
            $(event.target).addClass('search__input--expanded');
        }

        function contractSearch (event) {
            if ($(event.target).val() === '') {
                $(event.target).removeClass('search__input--expanded');
            }
        }

        function toggleSearch (event) {
            if ($(event.target).closest('.search__btn').length) {
                if ($(event.target).closest('.search__group').hasClass('search__group--hidden')) {
                    event.preventDefault();
                }
                else {
                    // Allow click to go through, as it is an expanded search
                    return true;
                }
            }

            $(event.target).closest('.search__group').toggleClass('search__group--hidden').toggleClass('search__group--shown');

            $(event.target).closest('.search__group').children('.search__input, .search__close').prop('disabled', function(index, value) { return !value; });
        }

        return this.each(() => {
            const type = this.data('type');

            switch (type) {
                case 'expand':
                    this.children('.search__input')
                        .on('focus', expandSearch)
                        .on('blur', contractSearch);
                    break;

                case 'toggle':
                    this.children('.search__btn, .search__close')
                        .on('click', toggleSearch);
                    break;

                default:
                    console.log('Unknown search setting type: `'+ type +'`');
                    break;
            }
    })
    };

})(jQuery);

// Eventual goal is to have fun with ES2015 and replace these charming little
// IIFEs with an export, and actually think about the dependencies between
// components... of course :)