/* jshint -W083, unused: vars */

// https://raw.githubusercontent.com/mhulse/jquery-scrollyo/5cb7a704b3b4735d55acc7d32de0114cf06cb78c/source/files/jquery.scrollyo.js
(function($, window, undefined) {
	
	'use strict';
	
	var loaded;
	
	var defaults = {
		foo: 'bar'
	};
	
	var NS = 'scrollyo';
	
	var console = window.console || { log: $.noop, warn: $.noop };
	
	var methods = {
		
		init: function(options) {
			
			return this.each(function() {
				
				var $this = $(this);
				var data = $(this).data(NS);
				var data_local;
				var settings;
				
				if ( ! data) {
					
					settings = $.extend(true, {}, defaults, $.fn[NS].defaults, options);
					
					data_local = $this.data(NS + 'Options');
					
					if (typeof data_local == 'object') {
						
						$.extend(true, settings, data_local);
						
					}
					
					$this.data(NS, {
						init: false,
						settings: settings,
						target: $this
					});
					
					data = $this.data(NS);
					
				}
				
				//console.log(settings);
				
				if ( ! data.init) {
					
					data.init = true;
					
					install.call(this, data);
					
					$this.on(NS + '.scroll', function() {
						
						console.log('scrollyo', $this, settings.foo);
						
						flip.call(this, data);
						
					});
					
					watch.call(this, data);
					
				} else {
					
					console.warn('jQuery.%s thinks it\'s already initialized on %o.', NS, this);
					
				}
				
			});
			
		},
		
		destroy: function() {
			
			uninstall.call(this);
			
			$(this).off(NS + '.scroll');
			
		}
		
	};
	
	var install = function(data) {
		
		var $this = $(this);
		var $scrollyo_wrap = $('<div />', { 'class': 'scrollyo-wrap' });
		var $scrollyo_overlay = $('<div />', { 'class': 'scrollyo-overlay' });
		
		$this.wrap($scrollyo_wrap);
		$scrollyo_overlay
			.text('Scroll')
			.hide()
			.insertAfter($this);
		
	};
	
	var uninstall = function() {
		
		var $this = $(this);
		var $scrollyo_wrap = $this.parent('.scrollyo-wrap');
		
		$scrollyo_wrap
			.children('.scrollyo-overlay')
			.remove();
		
		$this.unwrap($scrollyo_wrap);
		
	};
	
	var watch = function(data) {
		
		var $this = $(this);
		var $window = $(window);
		var timer;
		
		if (loaded) {
			
			// After page load:
			$this.trigger(NS + '.scroll');
			
		} else {
			
			// Wait for entire page to load (especially child images):
			$window
				.load(function() {
					
					loaded = true;
					
					$this.trigger(NS + '.scroll');
					
				});
			
		}
		
		$window.resize(function() {
			
			clearTimeout(timer);
			
			timer = setTimeout(function() {
				
				$this.trigger(NS + '.scroll');
				
			}, 100);
			
		});
		
	};
	
	var flip = function(data) {
		
		var $scrollyo_overlay = $(this).parent('.scrollyo-wrap').children('.scrollyo-overlay');
		
		if (this.clientWidth < this.scrollWidth) {
			
			//console.log('scroll', $(this), data.settings.foo);
			
			$scrollyo_overlay.show();
			
		} else {
			
			$scrollyo_overlay.hide();
			
		}
		
	};
	
	$.fn[NS] = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.%s thinks that %s doesn\'t exist', NS, method);
			
		}
		
	};
	
	$.fn[NS].defaults = defaults;
	
}(jQuery, window));
