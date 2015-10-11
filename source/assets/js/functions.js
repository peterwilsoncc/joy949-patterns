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
		makePolyfills( window );
		waitForActiveFonts();
	}


	function waitForActiveFonts() {
		function test() {
			if ( 'FontFaceObserver' in window &&
			     'Promise'          in window ) {
				return true;
			}
			return false;
		}

		function callback() {
			function switchClasses( fontClass ){
				var HTML = document.documentElement;
				var HTMLclassName = ' ' + HTML.className + ' ';
				var StartClassName = HTMLclassName;
				var activeClass = fontClass + '-active';
				var inactiveClass = fontClass + '-inactive';

				while ( HTMLclassName.indexOf( ' ' + inactiveClass + ' ' ) >= 0 ) {
					HTMLclassName = HTMLclassName.replace( ' ' + inactiveClass + ' ', ' ' );
				}

				if ( HTMLclassName.indexOf( ' ' + activeClass + ' ' ) < 0 ) {
					HTMLclassName += activeClass + ' ';
				}

				if ( StartClassName !== HTMLclassName ) {
					HTMLclassName = HTMLclassName.trim();
					HTML.className = HTMLclassName;
				}
			}

			function newPromise( fontName, config, fontClass ) {
				var fontObserver = new window.FontFaceObserver( fontName, config );
				window.Promise.all( [fontObserver.check()] ).then( function(){
					if ( fontClass ) {
						switchClasses( fontClass );
					}
				} );

				return fontObserver;
			}

			var openSansN4 = newPromise( 'Open Sans', {weight:400}, 'wf-opensans-n4' );
			var openSansI4 = newPromise( 'Open Sans', {weight:400,style:'italic'}/*, 'wf-opensans-i4' */ );

			var openSansN7 = newPromise( 'Open Sans', {weight:700}/*, 'wf-opensans-n7' */ );
			var openSansI7 = newPromise( 'Open Sans', {weight:700,style:'italic'}/*, 'wf-opensans-i7' */ );

			var oswaldN4 = newPromise( 'Oswald', {weight:400}, 'wf-oswald-n4' );
			var oswaldN7 = newPromise( 'Oswald', {weight:700}/*, 'wf-oswald-n7' */ );

			window.Promise
			.all( [
				openSansN4.check(),
				openSansI4.check(),
				openSansN7.check(),
				openSansI7.check(),
				oswaldN4.check(),
				oswaldN7.check()
			] )
			.then( function(){
				switchClasses( 'wf' );
				setCookie( 'joywebfonts', 'set', 5 );
			} );
		}

		wait( test, callback );
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

	function wait( test, callback, tryEvery, tryFor ) {
		var testVal;
		if ( 'function' !== typeof callback ) {
			return;
		}
		if ( 'function' !== typeof test ) {
			testVal = test;
			test = function(){ return testVal; };
		}
		if ( undefined === tryFor ) {
			tryFor = 30000; // 30 seconds
		}
		if ( undefined === tryEvery ) {
			tryEvery = 500; // 0.5 seconds
		}

		tryIt();

		function tryIt() {
			if ( tryFor >= 0 ) {
				tryFor = tryFor - tryEvery;
				if ( true === test() ) {
					callback();
				}
				else {
					window.setTimeout( tryIt, tryEvery );
				}
			}
		}


	}

	// cookies
	function setCookie(name, value, expires, path, domain) {
		var cookie = name + '=' + window.escape(value) + ';';

		if (expires) {
			// If it's a date
			if (expires instanceof Date) {
				// If it isn't a valid date
				if (isNaN(expires.getTime())) {
					expires = new Date();
				}
			} else {
				expires = new Date(new Date().getTime() + parseInt(expires, 10) * 1000 * 60 * 60 * 24);
			}

			cookie += 'expires=' + expires.toGMTString() + ';';
		}

		if (!path) {
			path = '/';
		}
		cookie += 'path=' + path + ';';
		if (domain) {
			cookie += 'domain=' + domain + ';';
		}

		document.cookie = cookie;
	}


	function getCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	}

	function deleteCookie(name) {
		setCookie(name,'',-1);
	}

	// little helpful polyfills
	function makePolyfills( window ) {

		if (!window.String.prototype.trim) {
		  window.String.prototype.trim = function () {
		    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		  };
		}

	}

	// these are to pass early jshint :D
	console.log( config, $$('body'), $('body'), getCookie, setCookie, deleteCookie );
}( window ));