/* global JOY949 */
(function( window, undefined ){
	var jQuery;
	var $;
	
	JOY949.loadJs( 'https://code.jquery.com/jquery-2.1.4.min.js' );
	waitingFor$();
	
	function init(){
		fillFonts();
	}

	function waitingFor$(){
		var test = function(){
			return ( 'undefined' !== typeof window.jQuery );
		};
		
		var callback = function() {
			jQuery = window.jQuery.noConflict();
			$ = jQuery;
			init();
		};
		
		wait( test, callback );
	}
	
	function fillFonts(){
		var test = function(){
			return $( 'html' ).hasClass( 'wf-opensans-i7-active' );
		};
		
		var callback = function(){
			var $fonts = $( '.sg-js-font' );

			$fonts.each( function(){
				var $font = $( this );
				var fontFamily = $font.css( 'fontFamily' );
				$font.html( fontFamily );
			} );
		};
		
		wait( test, callback );
	}
	
	function wait( test, callback, tryFor, tryEvery ) {
		var testVal;
		if ( 'function' !== typeof test ) {
			testVal = test;
			test = function(){ return testVal; };
		}

		if ( 'function' !== typeof callback ) {
			return;
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
	
})(window);