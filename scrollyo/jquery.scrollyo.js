/**
 * jQuery scroll, yo!
 * Remind users to scroll when there’s overflow.
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/jquery-scroll-yo
 * @copyright Copyright (c) 2014 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 0.1.0
 * @date 2014/08/31
 */

/* jshint unused:vars */

// https://raw.githubusercontent.com/mhulse/jquery-scrollyo/5cb7a704b3b4735d55acc7d32de0114cf06cb78c/source/files/jquery.scrollyo.js
(function($) {
	
	'use strict';
	
	var defaults = {
		foo: 'bar'
	};
	
	var console = window.console || { log: $.noop, warn: $.noop };
	
	var _horiz = function() {
		
		return (this[0].clientWidth < this[0].scrollWidth) ? true : false;
		
	};
	
	var _scrollyo = function(settings) {
		
		var $this = $(this);
		var $that = $this.parent('.scrollyo-wrap').find('.scrollyo-overlay');
		
		console.log('scrollyo');
		
		if (_horiz.call($this)) {
			
			console.log('horiz', settings.foo);
			
			$that.show();
			
		} else {
			
			$that.hide();
			
		}
		
	};
	
	var methods = {
		
		init: function(options) {
			
			var $this = $(this);
			var settings = $.extend(true, {}, defaults, $.fn.scrollyo.defaults, options);
			var $scroll = $('.scrollyo');
			var $scroll_wrap = $('<div />', { 'class': 'scrollyo-wrap' });
			var $scroll_overlay = $('<div />', { 'class': 'scrollyo-overlay' });
			var timer;
			
			$scroll.wrap($scroll_wrap);
			$scroll_overlay
				.text('Scroll')
				.hide()
				.insertAfter($scroll);
			
			$(this).on('scrollyo', function() {
				
				_scrollyo.call(this, settings);
				
			});
			
			$(window).load(function() {
				
				$this.trigger('scrollyo');
				
			});
			
			$(window).resize(function() {
				
				clearTimeout(timer);
				
				timer = setTimeout(function() {
					
					$this.trigger('scrollyo');
					
				}, 500);
				
			});
			
			return this;
			
		},
		
		destroy: function() {
			
			// destroy plugin here.
			
		}
		
	};
	
	$.fn.scrollyo = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.%s thinks that %s doesn\'t exist', 'scrollyo', method);
			
		}
		
	};
	
	$.fn.scrollyo.defaults = defaults;
	
}(jQuery));
