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

/* jshint -W083, unused: vars */

//----------------------------------

// Notes to self:
//console.profile('profile foo');
// ... code here ...
//console.profileEnd('profile foo');
// ... or:
// console.time('timing foo');
// ... code here ...
// console.timeEnd('timing foo');

//----------------------------------

(function($, window, undefined) {
	
	/**
	 * Function-level strict mode syntax.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
	 */
	
	'use strict';
	
	//--------------------------------------------------------------------------
	//
	// Local "globals":
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Javascript console.
	 *
	 * @see http://www.paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	 */
	
	var console = window.console || { log : $.noop, warn : $.noop };
	
	//----------------------------------
	
	/**
	 * The plugin namespace.
	 */
	
	var NS = 'scrollyo';
	
	//--------------------------------------------------------------------------
	//
	// Defaults/settings:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Public defaults.
	 *
	 * @type { object }
	 */
	
	var defaults = {
		
	}; // defaults
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Methods object.
	 *
	 * @type { object }
	 */
	
	var methods = {
		
		/**
		 * Init constructor.
		 *
		 * @type { function }
		 * @param { object } options Options object literal.
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		init : function(options) {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare, hoist and initialize:
				//----------------------------------
				
				var $this = $(this);       // Target object.
				var data = $this.data(NS); // Namespace instance data.
				var settings;              // Settings object.
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if ( ! data) {
					
					//----------------------------------
					// Initialize:
					//----------------------------------
					
					settings = $.extend(true, {}, defaults, $.fn[NS].defaults, options, $this.data(NS + 'Options')); // Recursively merge defaults, options and HTML5 `data-` attribute options.
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					$this.data(NS, {
						
						init     : false,    // Plugin initialization flag.
						settings : settings, // Merged plugin settings.
						target   : $this     // Target element plugin has been initialized on.
						
					});
					
					//----------------------------------
					// Easy access:
					//----------------------------------
					
					data = $this.data(NS);
					
				}
				
				//----------------------------------
				// Data initialization check:
				//----------------------------------
				
				if ( ! data.init) {
					
					//----------------------------------
					// Call main:
					//----------------------------------
					
					_main.call($this, data);
					
				} else {
					
					//----------------------------------
					// Ouch!
					//----------------------------------
					
					console.warn('jQuery.%s thinks it\'s already initialized on %o.', NS, this);
					
				}
				
			});
			
		} // init
		
	}; // methods
	
	//--------------------------------------------------------------------------
	//
	// Private methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Called after plugin initialization.
	 *
	 * @private
	 * @type { function }
	 * @param { object } data Parent data object literal.
	 * @this { object.jquery }
	 */
	
	var _main = function(data) {
		
		//----------------------------------
		// Plugin initialization flag:
		//----------------------------------
		
		data.init = true;
		
		var $scroll = $('.scrollyo'),
		    $scroll_wrap = $('<div />', { 'class': 'scrollyo-wrap' }),
		    $scroll_overlay = $('<div />', { 'class': 'scrollyo-overlay' }),
		    resizeTimer;
		
		$scroll.wrap($scroll_wrap);
		$scroll_overlay
			.text('Scroll')
			.hide()
			.insertAfter($scroll);
		
		$scroll.on('scrollyo', function() {
			
			var $this = $(this),
			    $that = $this.parent('.scrollyo-wrap').find('.scrollyo-overlay');
			
			if (_hasHorizontalScrollBar.call($this)) {
				$that.show();
				//console.log('show');
			} else {
				$that.hide();
				//console.log('hide');
			}
			
		});
		
		$(window).load(function() {
			
			$scroll.trigger('scrollyo');
			
		});
		
		$(window).resize(function() {
			
			clearTimeout(resizeTimer);
			
			resizeTimer = setTimeout(function() {
				
				$scroll.trigger('scrollyo');
				
			}, 100);
			
		});
		
	}; // _main
	
	// var _hasVerticalScrollBar = function () {
	// 	return (this[0].clientHeight < this[0].scrollHeight) ? true : false;
	// }; // _hasVerticalScrollBar
	
	var _hasHorizontalScrollBar = function() {
		return (this[0].clientWidth < this[0].scrollWidth) ? true : false;
	}; // _hasHorizontalScrollBar
	
	//--------------------------------------------------------------------------
	//
	// Method calling logic:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Boilerplate plugin logic.
	 *
	 * @constructor
	 * @see http://learn.jquery.com/plugins/
	 * @type { function }
	 * @param { string } method String method identifier.
	 * @return { method } Calls plugin method with supplied params.
	 */
	
	$.fn[NS] = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.%s thinks that %s doesn\'t exist', NS, method);
			
		}
		
	}; // $.fn[NS]
	
	//--------------------------------------------------------------------------
	//
	// Default settings:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Public defaults.
	 *
	 * Example (before instantiation):
	 *
	 * $.fn.worf.defaults.classOn = 'foo';
	 *
	 * @see http://stackoverflow.com/questions/11306375/plugin-authoring-how-to-allow-myplugin-defaults-key-value
	 *
	 * @type { object }
	 */
	
	$.fn[NS].defaults = defaults;
	
}(jQuery, window)); // Booyah!
