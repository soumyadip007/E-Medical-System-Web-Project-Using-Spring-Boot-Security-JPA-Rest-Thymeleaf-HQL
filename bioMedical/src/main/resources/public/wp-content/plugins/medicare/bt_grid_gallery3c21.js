(function( $ ) {

	$( document ).ready(function() {
	
		$( '.tilesWall.btGridGallery' ).each(function() {
			var $c = $( this );
			$c.find( '.gridItem' ).css( 'opacity', '1' );
			$c.imagesLoaded(function() {
				$c.packery({
					itemSelector: '.gridItem',
					columnWidth: '.gridSizer',
					gutter: 0,
					percentPosition: true,
					transitionDuration: 0,
					isResizeBound: false
				});
				bt_packery_tweak( $c, 'tiled' );
				/*setTimeout(function() {
					bt_packery_tweak( $c, 'tiled' );
				}, 150 );*/
			});
		});
	});
	
	$( window ).load(function() {
		$( '.tilesWall.btGridGallery' ).each(function() {
			var $c = $( this );
			$c.find( '.gridItem' ).css( 'opacity', '1' );
			bt_packery_tweak( $c, 'tiled' );
			setTimeout(function() {
				bt_packery_tweak( $c, 'tiled' );
			}, 150 );
		});
	});
	
	$( window ).resize(function() {
		$( '.tilesWall.btGridGallery' ).each(function() {
			var $c = $( this );
			bt_packery_tweak( $c, 'tiled' );
			setTimeout(function() {
				bt_packery_tweak( $c, 'tiled' );
			}, 150 );
		});
	});

})( jQuery );