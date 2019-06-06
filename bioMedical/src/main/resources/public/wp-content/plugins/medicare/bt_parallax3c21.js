(function( $ ) {
	$( document ).ready(function() {

		if ( $( '.btParallax' ).length > 0 ) {
					
			window.bt_raf_lock = false;

			$( window ).on( 'mousewheel', function( e ) {

			});
				
			$( window ).on( 'scroll', function() {
				if ( ! window.bt_raf_lock ) {
					window.bt_raf_lock = true;
					bt_requestAnimFrame( bt_raf_loop );
				}
			});
		
			window.bt_requestAnimFrame = function() {
				return (
					window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function( callback ) {
						window.setTimeout( callback, 1000 / 60 );
					}
				);
			}();
			
			bt_raf_loop = function() {

				$( '.btParallax' ).each(function() {
					var bounds = this.getBoundingClientRect();
					if ( bounds.top < window.innerHeight && bounds.bottom > 0 ) {
						var speed = $( this ).data( 'parallax' ) + 0.0001;
						var offset = 0;
						if( window.innerWidth > 1024 ) offset= parseFloat( $( this ).data( 'parallax-offset' ) );
						var ypos = ( bounds.top ) * speed;
						$( this ).css( 'background-position', '50% ' + ( ypos + offset ) + 'px' );
					}
					
				});
				
				window.bt_raf_lock = false;

			}
			
			bt_requestAnimFrame( bt_raf_loop );	
			
		}
	});
	
})( jQuery );