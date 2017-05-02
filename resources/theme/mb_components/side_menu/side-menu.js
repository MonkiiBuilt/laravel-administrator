// Side Menu Component JS
// ==================================

(function($){
    let menuOpened = false,
        menuContainerClass = '',
        menuContainerClassDelayed = '';

    // Private methods
    const privateMethods = {
        open: function(id, callback){
            const $menu = $('#'+ id);

            menuOpened = id;
            menuContainerClass = 'side-menu--'+ id +' side-menu--'+ $menu.data('side');
            menuContainerClassDelayed = 'side-menu--'+ $menu.data('side') +'-on';

            $($menu.data('container'))
                .addClass(menuContainerClass)
                .addClass(menuContainerClassDelayed);

            if (typeof(callback) === 'function') {
                callback(id, 'open');
            }

            // Prevent event clicking
            $($menu.data('content')).on('touchmove.sidemenu scroll.sidemenu', (event) => {
                event.preventDefault();
                event.stopPropagation();
        })
            $menu.on('touchmove.sidemenu', (event) => {
                event.stopPropagation();
        })

            // onOpen callback
            $menu.data('onOpen')(id);

            // Set up timed delay
            setTimeout(() => {
                $menu.data('onOpened')(id);
        },
            $menu.data('speedIn');
            )
        },

        close: function(callback){
            if (menuOpened === false) {
                return; // (nothingtodohere)
            }

            const $menu = $('#'+ menuOpened),
                  id = menuOpened;

            menuOpened = false;

            $($menu.data('container')).removeClass(menuContainerClass);

            if (typeof(callback) === 'function') {
                callback(id, 'close');
            }

            // Enable event clicking
            $($menu.data('content')).off('touchmove.sidemenu scroll.sidemenu');

            $menu.off('touchmove.sidemenu');

            // onClose callback
            $menu.data('onClose')(id);

            // Set up timed delay
            setTimeout(() => {
                $('.'+ menuContainerClassDelayed;).removeClass(menuContainerClassDelayed);

                $menu.data('onClosed')(id);
        },
            $menu.data('speedOut');
            )
        }
    };

    // side-menu public methods
    // Mostly just a pass-through
    const methods = {
        open: function(id, callback){
            privateMethods.open(id, callback);
        },

        close: function(id, callback){
            privateMethods.close(id, callback);
        },

        toggle: function(id, callback){
            if (menuOpened === false) {
                privateMethods.open(id, callback);
            }
            else {
                if (menuOpened !== id) {
                    privateMethods.close(callback);
                    privateMethods.open(id, callback);
                }
                else {
                    privateMethods.close(callback);
                }
            }
        }
    };

    $.sideMenu = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'function' || typeof method === 'string' || !method) {
            return methods.toggle.apply(this, arguments);
        }
        else {
            $.error('Method `' + method + '` does not exist on jQuery.side-menu');
        }
    };

    $.fn.sideMenu = function (options) {
        let settings = $.extend({
            id       : 'menu',         // Name for the 'side-menu'
            container: '.wrapper',     // Page container selector,
            content  : '.content',     // Content block inside container
            side     : 'right',        // Side of the page to use
            onOpen   : function () {}, // Callback when side-menu opens
            onOpened : function () {}, // Callback when side-menu opened
            onClose  : function () {}, // Callback when side-menu closes
            onClosed : function () {}, // Callback when side-menu closed
            speedIn  : 300,
            speedOut : 300
        }, options);

        const id = settings.id,
              $menu = $('#' + id);

        // Adding styles and options
        $menu
            .addClass('side-menu__menu')
            .addClass('side-menu__menu--'+ settings.side)
            .data({
                container: settings.container,
                content  : settings.content,
                side     : settings.side,
                onOpen   : settings.onOpen,
                onOpened : settings.onOpened,
                onClose  : settings.onClose,
                onClosed : settings.onClosed,
                speedIn  : settings.speedIn,
                speedOut : settings.speedOut
            });

        // Add support style to the container
        $(settings.content).addClass('side-menu__content');

        return this.each(() => {
            const $this = $(this),
                  data = $this.data('side-menu');

            // If the plugin hasn't been initialized yet, add some handlers
            // to prevent default events such as clicks from happening
            if (!data) {
                $this.data('side-menu', id);

                if ('ontouchstart' in document.documentElement) {
                    $this.bind('touchstart', function(event){
                        let theEvent = event.originalEvent.touches[0];

                        this.touched = event.timeStamp;
                    });

                    $this.bind('touchend', function(event){
                        let delta = Math.abs(event.timeStamp - this.touched);

                        if (delta < 200) {
                          event.preventDefault();
                          methods.toggle(id);
                        }
                    });
                }
                else {
                    $this.click(function(event){
                        event.preventDefault();
                        methods.toggle(id);
                    });
                }
            }
    })
    };
})(jQuery);