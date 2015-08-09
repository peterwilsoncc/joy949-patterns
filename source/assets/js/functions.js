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

	if ( false === JOY949.mustard ) {
		// Browser failed cuts mustard check in header
		return;
	}

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
	/* end building of console */

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

	// these are to pass early jshint :D
	console.log( config, $$('body'), $('body'));
}( window ));