// Close Component JS
// ==================================

(function($){

	// Call this on the closable (parent) element
	$.fn.closable = function (options) {
		let settings = $.extend({
			closeElement: null,
		}, options);

		return this.each((index) => {
			let self = $(this[index]);
			let closeElement = settings.closeElement || $('.close', self);

			if (closeElement.length) {
				self.addClass('closable');

				closeElement.one('click', function () {
					// We could use .remove() or .hide()
					// Instead, let's keep it in the DOM but add a class so we can use CSS transitions
					self.addClass('closable--closed');
				});
			}
		});
	};

})(jQuery);
