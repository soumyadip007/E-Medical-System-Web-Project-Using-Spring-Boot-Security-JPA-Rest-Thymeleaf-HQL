function bt_gmap_init( id, lat, lng, zoom, icon, primary_color, secondary_color, water_color, custom_style ) {

	var myLatLng = new google.maps.LatLng( lat, lng );
	var mapOptions = {
		zoom: zoom,
		center: myLatLng,
		scrollwheel: false,
		scaleControl:true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		streetViewControl: true,
		mapTypeControl: true
	}
	var map = new google.maps.Map( id , mapOptions );

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: icon
	});

	if ( ( primary_color != '' && secondary_color != '' && water_color != '' ) || custom_style != '' ) {
		
		var style_array = [
			{
				featureType: "all",
				stylers: [
					{ hue: primary_color },  
					{ saturation: 100 }
				]
			},{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{ hue: secondary_color },
					{ saturation: 0 }
				]
			},{
				featureType: "water",
				elementType: 'all',
				stylers: [
					{ color: water_color },
					{ saturation: 0 }
				]
			},{
				featureType: "poi.business",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			}
		];
		
		if ( custom_style != '' ) {
			style_array = JSON.parse( atob( custom_style ) );
		}
		
		var customMapType = new google.maps.StyledMapType( style_array, {
			name: 'Custom Style'
		});

		var customMapTypeId = 'custom_style';
		map.mapTypes.set( customMapTypeId, customMapType );
		map.setMapTypeId( customMapTypeId );
	}

	
}