/* global JOY949PL */
window.console = window.console || {
	log: function(){}
};
window.JOY949 = window.JOY949 || {};
(function( window, undefined ){
	// avoid scope look ups
	var document = window.document,
		JOY949 = window.JOY949,
		config = JOY949.config,
		console = {};

	if ( JOY949.yep() ) {
		initialise();
	}

	function initialise() {
		localConsole();
		loadSecondaryFonts();
	}

	function localConsole() {
		/* build up a console that only runs when using the pattern library */
		function myConsole( method ) {
			if ( typeof window.console[method] === 'function' ) {
				console[method] = function(){
					if ( JOY949PL && ( true === JOY949PL.debug ) ) {
						window.console[method].apply( window.console, arguments );
					}
				};
			}
			else {
				console[method] = window.console[method];
			}
		}

		for( var method in window.console ) {
			myConsole( method );
		}
	}
	
	function qsaContext( context ) {
		if ( undefined === context ) {
			// the context was not passed, default to document
			context = document;
		}
		else if ( !context.childNodes ) {
			return null;
		}
		return context;
	}

	// shortcut for querySelector
	function $(selector, context) {
		context = qsaContext( context );
		if ( null === context ) {
			return null;
		}
		return context.querySelector( selector );
	}
	
	// shortcut for querySelectorAll
	function $$(selector, context) {
		context = qsaContext( context );
		if ( null === context ) {
			return null;
		}
		return context.querySelectorAll( selector );
	}

	function loadSecondaryFonts() {
		var tryFor = 30000; // 30 seconds;
		var tryEvery = 100; // 0.1 seconds;
		var webFontConfig = {
			google: { families: [ 'Open+Sans:400italic,700,700italic:latin', 'Oswald:700:latin' ] }
		};

		tryLoading();

		function tryLoading(){
			if ( tryFor >= 0 ) {
				tryFor = tryFor - tryEvery;
				if ( config.loadSecondaryFonts && ( true === config.loadSecondaryFonts ) ) {
					JOY949.loadWebFonts( webFontConfig );
				}
				else {
					window.setTimeout( tryLoading, tryEvery );
				}
			}
		}
	}

	// these are to pass early jshint :D
	console.log( config, $$('body'), $('body'));
}( window ));