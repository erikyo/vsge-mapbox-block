import { Feature, Geometry } from '@turf/turf';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { Dispatch, RefObject, SetStateAction } from 'react';

export type CoordinatesDef = [ number, number ];

export type MapboxBlockDefaults = {
	accessToken: string;
	siteurl: string;
	language: string;
};

export type MapFilter = { id: number; value: string };

export interface MarkerIcon {
	id: number;
	name: string;
	content: SVGElement;
}

export type MapboxOptions = {
	icons: MarkerIcon[];
	tags: MapFilter[];
	filters: MapFilter[];
	listings: MapBoxListing[];
};

export type MapAttributes = {
	align: string;
	latitude: number;
	longitude: number;
	pitch: number;
	bearing: number;
	mapZoom: number;
	mapStyle: string;
	mapProjection: string;
	mapHeight: string;
	sidebarEnabled: boolean;
	geocoderEnabled: boolean;
	filtersEnabled: boolean;
	tagsEnabled: boolean;
	fitView: boolean;
	elevation: boolean;
	freeViewCamera: boolean;
	mouseWheelZoom: boolean;
	mapboxOptions: MapboxOptions;
};

export interface MapItem extends Feature {
	geometry: Geometry;
	properties: MarkerProps;
	distance?: {
		value: number;
		writable: boolean;
		enumerable: boolean;
		configurable: boolean;
	} | null;
}

export type MountedMapsContextValue = {
	map: mapboxgl.Map | null;
	lngLat?: LngLat;
	markers?: MapBoxListing[];
	setMap: Dispatch< SetStateAction< mapboxgl.Map | null > >;
	listings?: MapBoxListing[];
	setListings: Dispatch< SetStateAction< mapboxgl.Map | null > >;
	setLngLat: Dispatch< SetStateAction< LngLat | null > >;
	setMarkers: Dispatch< SetStateAction< MapBoxListing[] > >;
	setGeoCoder?: SetStateAction< any >;
	mapRef?: RefObject< HTMLDivElement >;
	geocoderRef?: RefObject< HTMLDivElement >;
	mapDefaults?: MapboxBlockDefaults;
};

export type selectOptions = {
	label: string;
	value: string;
};

export interface MapBoxListing {
	id: number;
	properties: MarkerProps;
	geometry: {
		type: string;
		coordinates: CoordinatesDef;
	};
}

/**
 * the mapbox single listing
 *
 * @type {MapBoxListing}
 * @property {number}   id          the id
 * @property {string}   name        the name
 * @property {string}   description the description
 * @property {string=}  city        the city
 * @property {string=}  postalCode  the postal code
 * @property {string=}  country     the country
 * @property {string=}  address     the address
 * @property {string=}  state       the state
 * @property {string=}  website     the website
 * @property {string[]} tags        the tags
 * @property {string[]} filters     the filters
 */
export interface MarkerProps {
	name: string;
	description?: string;
	telephone?: string;
	address?: string;
	city?: string;
	postalCode?: string;
	country?: string;
	state?: string;
	emailAddress?: string;
	website?: string;
	icon?: string;
	iconSize?: number;
	iconColor?: string;
	itemTags?: MapFilter[];
	itemFilters?: MapFilter[];
}

export interface MarkerPropsCustom {
	children: JSX.Element;
}

export interface MarkerItem {
	geometry: Geometry;
	properties?: MarkerProps;
	element?: HTMLElement;
}

export interface MarkerHTMLElement extends HTMLElement {
	dataset: {
		id: string;
		markerName: string;
	};
}
