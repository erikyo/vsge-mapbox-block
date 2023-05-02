import mapboxgl from 'mapbox-gl';
import { addMarkers } from '../Markers';

export function setMapElevation( map: mapboxgl.Map, hasElevation: boolean ) {
	if ( map ) {
		if ( hasElevation ) {
			if ( ! map.getSource( 'mapbox-dem' ) ) {
				map.addSource( 'mapbox-dem', {
					type: 'raster-dem',
					url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
					tileSize: 512,
					maxzoom: 14,
				} );
			}

			// add the DEM source as a terrain layer with exaggerated height
			map.setTerrain( {
				source: 'mapbox-dem',
				exaggeration: 1.5,
			} );
		} else {
			// unset terrain elevation
			map.setTerrain();
			// unload the DEM source
			if ( map.getSource( 'mapbox-dem' ) )
				map.removeSource( 'mapbox-dem' );
		}
	}
}

export function setMapThreeDimensionality(
	map: mapboxgl.Map,
	hasThreeDimensionality: boolean
) {
	if ( map ) {
		if ( hasThreeDimensionality ) {
			// enable map rotation using right click + drag
			map.dragRotate.enable();

			// enable map rotation using touch rotation gesture
			map.touchZoomRotate.enableRotation();
		} else {
			// disable map rotation using right click + drag
			map.dragRotate.disable();

			// disable map rotation using touch rotation gesture
			map.touchZoomRotate.disableRotation();
		}
	}
}

export function setMapWheelZoom( map: mapboxgl.Map, mouseWheelZoom: boolean ) {
	if ( map ) {
		if ( mouseWheelZoom ) {
			map.scrollZoom.enable();
		} else {
			map.scrollZoom.disable();
			map.touchZoomRotate.disable();
		}
	}
}

/**
 * The function initializes a Mapbox map with specified attributes and adds a terrain layer if
 * specified.
 *
 * @param {HTMLElement} mapRef     The HTML element that will contain the map.
 * @param {Object}      attributes An object containing various attributes for initializing the map, including
 *                                 latitude, longitude, pitch, bearing, mapZoom, mapStyle, and freeViewCamera.
 * @param               defaults
 * @param               markers
 * @return {mapboxgl.Map} a mapboxgl.Map object.
 */
export function initMap( mapRef, attributes, defaults, markers = [] ) {
	const {
		latitude,
		longitude,
		pitch,
		bearing,
		mapZoom,
		mapStyle,
		mouseWheelZoom,
		freeViewCamera,
		mapboxOptions,
	} = attributes;

	const map = new mapboxgl.Map( {
		container: mapRef,
		style: 'mapbox://styles/mapbox/' + mapStyle,
		antialias: true,
		center: [ longitude, latitude ],
		zoom: mapZoom,
		bearing,
		pitch,
		scrollZoom: mouseWheelZoom,
		dragRotate: freeViewCamera,
	} );

	map.on( 'load', function () {
		// Set the map's terrain layer.
		setMapElevation( map, attributes.elevation );

		// Set up the language.
		if ( map.getLayer( 'country-label' ) )
			map.setLayoutProperty( 'country-label', 'text-field', [
				'get',
				'name_' + defaults?.language?.substring( 0, 2 ) || 'en',
			] );

		// Add a GeoJSON source for the stores
		map.addSource( 'geojson-stores', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [ mapboxOptions.listings ],
			},
		} );

		// Add a layer showing the places.
		map.addLayer( {
			id: 'geojson-stores',
			type: 'symbol',
			source: 'geojson-stores',
			layout: {
				'icon-allow-overlap': true,
			},
		} );

		// Add navigation control (the +/- zoom buttons)
		map.addControl( new mapboxgl.NavigationControl(), 'top-right' );

		setMapThreeDimensionality( map, attributes.freeViewCamera );
	} );

	return map;
}
