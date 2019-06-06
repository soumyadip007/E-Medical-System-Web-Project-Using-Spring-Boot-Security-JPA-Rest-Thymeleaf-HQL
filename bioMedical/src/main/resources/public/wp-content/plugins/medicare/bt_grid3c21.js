(function( $ ) {
	
	var BT_Grid = function() {
		this.bt_no_posts = false;
		this.bt_loading_grid = false;
		this.bt_ajax_req = [];
		this.bt_ajax_elems_all = [];
	};
	
	var BT_Grid_array = [];

	$( document ).ready(function() {
	
		$( '.tilesWall.btAjaxGrid' ).each(function() {
			
			var root = $( this ).closest( '.btGridContainer' );
			
			root.data( 'index', BT_Grid_array.length );
			
			var grid = new BT_Grid();
			BT_Grid_array.push( grid );

			grid.bt_scroll_loading = $( this ).data( 'scroll-loading' ) == 'yes' ? true : false;
			grid.bt_grid_type = $( this ).data( 'grid-type' );
			grid.bt_tiled_format = $( this ).data( 'format' ) + '';
			if ( grid.bt_tiled_format != '' ) {
				grid.bt_tiled_format = grid.bt_tiled_format.split( ',' );
			} else {
				grid.bt_tiled_format = [];
			}
			
			if ( grid.bt_scroll_loading ) {
				root.height( window.innerHeight );
			}

			$( this ).packery({
				itemSelector: '.gridItem',
				columnWidth: '.gridSizer',
				gutter: 0,
				percentPosition: true,
				transitionDuration: 0,
				isResizeBound: false
			});

		});
		
		bt_load_posts( $( '.tilesWall.btAjaxGrid' ) );
		
		$( '.btCatFilterItem.all' ).addClass( 'active' );
		
		$( '.btCatFilter' ).on( 'click', '.btCatFilterItem:not(.active)', function() {
			
			var root = $( this ).closest( '.btGridContainer' );
			
			$( this ).closest( '.btCatFilter' ).find( '.btCatFilterItem' ).removeClass( 'active' );
			$( this ).addClass( 'active' );
			root.find( '.tilesWall.btAjaxGrid' ).data( 'cat-slug', $( this ).data( 'slug' ) );
			
			for ( var n = 0; n < BT_Grid_array[ root.data( 'index' ) ].bt_ajax_req.length; n++ ) {
				BT_Grid_array[ root.data( 'index' ) ].bt_ajax_req[ n ].abort();
			}
			BT_Grid_array[ root.data( 'index' ) ].bt_ajax_req = [];
			
			root.height( root.height() );
			
			var $container = root.find( '.tilesWall.btAjaxGrid' ).packery();
			$container.packery( 'remove', $( '.gridItem' ) );
			$container.packery();

			BT_Grid_array[ root.data( 'index' ) ].bt_grid_offset = 0;

			BT_Grid_array[ root.data( 'index' ) ].bt_no_posts = false;
			
			root.find( '.btNoMore' ).hide();
			root.find( '.btLoaderGrid' ).show();
			
			bt_load_posts( root.find( '.tilesWall.btAjaxGrid' ) );
		});
		
	});
	
	$( window ).resize(function() {
		$( '.tilesWall.btAjaxGrid' ).each(function() {
			$c = $( this );
			var root = $c.closest( '.btGridContainer' );
			var index = root.data( 'index' );			
			bt_packery_tweak( $c, BT_Grid_array[ index ].bt_grid_type );
			setTimeout(function() {
				bt_packery_tweak( $c, BT_Grid_array[ index ].bt_grid_type );
			}, 150 );
		});
	});
	
	$( window ).scroll(function() {
		$( '.btGridContainer' ).each(function() {
			if ( bt_is_load_scroll( $( this ).data( 'index' ) ) && BT_Grid_array[ $( this ).data( 'index' ) ].bt_scroll_loading && ! BT_Grid_array[ $( this ).data( 'index' ) ].bt_no_posts && ! BT_Grid_array[ $( this ).data( 'index' ) ].bt_loading_grid ) {
				BT_Grid_array[ $( this ).data( 'index' ) ].bt_loading_grid = true;
				bt_load_posts( $( this ).find( '.tilesWall.btAjaxGrid' ) );
			}
		});
	});

	var bt_is_load_scroll = function( index ) {
		var $c = $( '.btGridContainer' ).eq( index ).find( '.tilesWall.btAjaxGrid' );
		var height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
		if ( $( window ).scrollTop() + height > $c.offset().top + $c.height() ) {
			return true;
		}
		return false;
	}

	// ajax loader
	
	var bt_load_posts = function( target ) {
		target.each(function() {
			
			var parent_element = $( this );
			var root = parent_element.closest( '.btGridContainer' );
			var index = root.data( 'index' );
		
			if ( typeof BT_Grid_array[ index ].bt_grid_offset === 'undefined' ) BT_Grid_array[ index ].bt_grid_offset = 0;
			var num = parent_element.data( 'num' );
			var data = {
				'action': 'bt_get_grid',
				'number': num,
				'offset': BT_Grid_array[ index ].bt_grid_offset,
				'cat_slug': parent_element.data( 'cat-slug' ),
				'post_type': parent_element.data( 'post-type' ),
				'grid_type': parent_element.data( 'grid-type' ),
				'tiles_title': parent_element.data( 'tiles-title' ),
				'related': parent_element.data( 'related' ),
				'sticky_in_grid': parent_element.data( 'sticky' ),
				'format': BT_Grid_array[ index ].bt_tiled_format.slice( BT_Grid_array[ index ].bt_grid_offset, BT_Grid_array[ index ].bt_grid_offset + num ).join()
			};
			BT_Grid_array[ index ].bt_grid_offset = BT_Grid_array[ index ].bt_grid_offset + num;
			$( '.btLoaderGrid' ).css( 'opacity', '1' );
			BT_Grid_array[ index ].bt_ajax_req.push($.ajax({
				type: 'POST',
				url: window.BoldThemesAJAXURL,
				data: data,
				async: true,
				success: function( response ) {
				
					var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
					
					if ( ! BT_Grid_array[ index ].bt_scroll_loading ) $( '.btLoaderGrid' ).hide();

					if ( response.indexOf( 'no_posts' ) == 0 ) {
						$( '.btLoaderGrid' ).css( 'opacity', '0' );
						$( '.btLoaderGrid' ).hide();
						if ( BT_Grid_array[ index ].bt_scroll_loading ) $( '.btNoMore' ).fadeIn();
						BT_Grid_array[ index ].bt_no_posts = true;
						return;
					}
					
					$post = JSON.parse( response );

					BT_Grid_array[ index ].bt_ajax_elems = [];
					
					$( '.btLoaderGrid' ).css( 'opacity', '0' );

					for ( var i = 0; i < $post.length; i++ ) {
						var elem = document.createElement( 'div' );
						elem.className = $post[ i ].container_class;

						$( elem ).append( $post[ i ].html );
						
						BT_Grid_array[ index ].bt_ajax_elems.push( elem );
						BT_Grid_array[ index ].bt_ajax_elems_all.push( elem );
						
						$( elem ).attr( 'data-i', i );
						
						imagesLoaded( BT_Grid_array[ index ].bt_ajax_elems_all[ BT_Grid_array[ index ].bt_ajax_elems_all.length - 1 ], function() {
							var n = $( this.elements[0] ).attr( 'data-i' );
							$( this.elements[0] ).css( { 'transition-delay': .1 + n * .1 + 's' } );
							$( this.elements[0] ).addClass( 'btGridItemLoaded' );
						});
					}

					for ( var i = 0; i < BT_Grid_array[ index ].bt_ajax_elems.length; i++ ) {

						parent_element.append( BT_Grid_array[ index ].bt_ajax_elems[ i ] );
						
						var $container = parent_element.packery();
						$container.packery( 'appended', BT_Grid_array[ index ].bt_ajax_elems[ i ] );
						
						bt_packery_tweak( parent_element, BT_Grid_array[ index ].bt_grid_type );
						
						if ( BT_Grid_array[ index ].bt_grid_type == 'classic' ) {
							$( '.btMediaBox' ).each(function() {
								if ( $( this ).attr( 'data-hw' ) != undefined ) {
									$( this ).height( $( this ).outerWidth( true ) * $( this ).attr( 'data-hw' ) );
								}
							});
						}
						
						bt_packery_tweak( parent_element, BT_Grid_array[ index ].bt_grid_type );
						
						$( '.btAjaxGrid .boldPhotoSlide:not(.btFeaturedPostsSlider)' ).each(function() {
							if ( ! $( this ).hasClass( 'slick-initialized' ) ) {
								$( this ).slick({
									dots: false,
									arrows: true,
									infinite: false,
									speed: 300,
									slide: '.bpbItem',
									slidesToShow: 1,
									slidesToScroll: 1,
									useTransform: true,
									prevArrow: window.boldthemes_prevArrowHtml_simple,
									nextArrow: window.boldthemes_nextArrowHtml_simple
								});
							}
						});

						$( '.btAjaxGrid .boldPhotoSlide.btFeaturedPostsSlider' ).each(function() {
							if ( ! $( this ).hasClass( 'slick-initialized' ) ) {
								$( this ).slick({
									dots: false,
									arrows: true,
									infinite: false,
									speed: 300,
									slide: '.bpbItem',
									slidesToShow: 3,
									slidesToScroll: 3,
									prevArrow: window.bt_prevArrowHtml,
									nextArrow: window.bt_nextArrowHtml,
									responsive: [
										{
											breakpoint: 880,
											settings: {
												slidesToShow: 1,
												slidesToScroll: 1
											}
										}
									]
								});
							}
						});
					}

					BT_Grid_array[ index ].bt_loading_grid = false;
					
					$( '.btGridContainer' ).css( 'height', 'auto' );

					if ( bt_is_load_scroll( index ) && BT_Grid_array[ index ].bt_scroll_loading && ! BT_Grid_array[ index ].bt_no_posts ) {
						bt_load_posts( parent_element );
					}

				},
				error: function( xhr, status, error ) {
					parent_element.find( '.btLoaderGrid' ).css( 'opacity', '0' );
				}
				
			}));
		});
	}

})( jQuery );