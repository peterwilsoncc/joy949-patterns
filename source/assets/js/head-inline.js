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

	loadJs( config.assetsPath + '/js/fontfaceobserver.js' );



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
		HTML.className=HTML.className.replace(/\bno-js\b/,'')+' js wf-inactive';

		// replace script queue
		initScriptQueue();

		// configure webfont Classes
		config.webFontClasses = {
			'opensans' : [ 'n4' /*, 'i4', 'n7', 'i7' */ ],
			'oswald'   : [ 'n4'/*, 'n7' */ ]
		};
		addClasses( config.webFontClasses );
	}

	function addClasses( webFontClasses ){
		var webFontState = 'inactive';
		if ( 'set' === getCookie( 'joy949webfonts' ) ) {
			webFontState = 'active';
		}
		var classes = [ 'wf-' + webFontState ];
		var fontClasses;
		var i,l;
		for ( var webFont in webFontClasses ) {
			fontClasses = webFontClasses[ webFont ];
			for ( i=0, l=fontClasses.length; i<l; i++ ) {
				classes.push( 'wf-' + webFont + '-' + fontClasses[i] + '-' + webFontState );
			}
		}
		HTML.className += ' ' + classes.join( ' ' );
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

	function yep() {
		return mustard;
	}

	return {
		mustard: mustard,
		config: window.JOY949_config,
		scripts: scripts,
		loadJs: loadJs,
		loadJS: loadJs, // allow for typos
		yep: yep
	};
}( window ));
