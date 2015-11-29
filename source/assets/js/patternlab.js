/* global JOY949 */
(function( window, undefined ){
	var jQuery;
	var $;

	JOY949.loadJs( 'https://code.jquery.com/jquery-2.1.4.min.js' );
	waitingFor$();

	function init(){
		fillFonts();
		swatches();
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

	function swatches(){
		var $colors = $( '.sg-colors' );
		var $swatches = $colors.find( '.sg-swatch' );

		$swatches.each( showHexCode );

		function showHexCode() {
			var $swatch = $( this );
			var $value  = $swatch.next();
			var color   = $swatch.css( 'backgroundColor' );

			$value.text( rgb2hex( color ).toUpperCase() );
		}

		function rgb2hex(rgb) {
			if (/^#[0-9A-F]{6}$/i.test(rgb)) {
				return rgb;
			}

			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ('0' + parseInt(x, 10).toString(16)).slice(-2);
			}
			return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
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