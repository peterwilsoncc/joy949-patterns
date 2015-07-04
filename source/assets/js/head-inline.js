/*jshint latedef: false */
(window.JOY949 = function( window, undefined ){
	/*jshint unused: false*/

	var document = window.document,
		HTML = document.documentElement,
		scripts = [],
		mustard = false,
		loadJS,
		i;


	function loadJs() {
		scripts.push.apply( scripts, arguments );
	}
	
	loadJs( 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js' );
	
	
	// cuts the mustard?
	// http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
	if ( 'querySelector'    in document &&
	     'localStorage'     in window &&
	     'addEventListener' in window ) {
		 mustard = true;
	}

	if ( true === mustard ) {
		// Browser is good
		initialise();
	}
	
	function initialise() {
		// should only run if the browser is good
		// but let's double check anyway
		if ( false === mustard ) {
			return;
		}
		
		// switch no-js from the HTML element class
		HTML.className=HTML.className.replace(/\bno-js\b/,'')+' js';

		// replace script queue
		initScriptQueue();
	}


	function loadSingle( src ) {
		var newScript = document.createElement( 'script' );
		newScript.async = newScript.src = src;
		document.head.appendChild( newScript );
	}
	
	function initScriptQueue() {
		var scriptQueue = {
			push : function() {
				var i,l;
				for ( i=0, l=arguments.length; i<l; i++ ) {
					loadSingle( arguments[i] );
				}
			}
		};
		
		var oldQueue = scripts;
		scripts = scriptQueue;

		for ( i=oldQueue.length-1; i>=0; i-- ) {
			loadSingle( oldQueue.shift() );
		}

	}

	return {
		mustard: mustard,
		config: window.JOY949_config,
		scripts: scripts,
		loadJs: loadJs,
		loadJS: loadJs // allow for typos
	};
}( window ));
