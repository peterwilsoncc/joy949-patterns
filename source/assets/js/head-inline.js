window.JOY949 = (function( window, undefined ){

	var document = window.document,
		HTML = document.documentElement,
		scripts = [],
		mustard = false,
		config = window.JOY949_config,
		i;


	function loadJs() {
		scripts.push.apply( scripts, arguments );
	}

	loadJs( 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js' );
	
	
	
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

		// configure webfonts
		var webFontClasses = {
			'opensans' : [ 'n4', 'i4', 'n7', 'i7' ],
			'oswald'   : [ 'n4', 'n7' ]
		};
		
		var webFontConfig = {
			google: { families: [ 'Open+Sans:400', 'Oswald:400:latin' ] },
			active: function() { config.loadSecondaryFonts = true; }
		};
		loadWebFonts( webFontConfig, webFontClasses );
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

	function loadWebFonts( webFontConfig, webFontClasses ) {
		var tryFor = 30000; // 30 seconds
		var tryEvery = 100; // 0.1 seconds
		
		if ( 'object' === typeof webFontClasses ) {
			addClasses( webFontClasses );
		}
		tryLoading();
		
		function addClasses( webFontClasses ){
			var classes = [ 'wf-inactive' ];
			var fontClasses;
			var i,l;
			for ( var webFont in webFontClasses ) {
				fontClasses = webFontClasses[ webFont ];
				for ( i=0, l=fontClasses.length; i<l; i++ ) {
					classes.push( 'wf-' + webFont + '-' + fontClasses[i] + '-inactive' );
				}
			}
			HTML.className += ' ' + classes.join( ' ' );
		}
		
		function tryLoading(){
			if ( tryFor >= 0 ) {
				tryFor = tryFor - tryEvery;
				if ( window.WebFont ) {
					window.WebFont.load( webFontConfig );
				}
				else {
					window.setTimeout( tryLoading, tryEvery );
				}
			}
		}
	}

	return {
		mustard: mustard,
		config: window.JOY949_config,
		scripts: scripts,
		loadWebFonts: loadWebFonts,
		loadJs: loadJs,
		loadJS: loadJs // allow for typos
	};
}( window ));
