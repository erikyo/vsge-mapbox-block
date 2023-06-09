import { Button, Icon, SelectControl } from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';
import { safeSlug } from '../../utils';
import { fitInView } from '../../utils/view';
import { MapFilter, MountedMapsContextValue } from '../../types';
import { MapboxContext } from './MapboxContext';

/**
 * trasform an array of strings into a select values that could be used with select control
 *
 * @param {string[]} selectValues       the select values to transform
 * @param            selectValues.id
 * @param            selectValues.value
 * @return {SelectControl.Option[]} the select values
 */
function topbarBuildSelectFromArray( selectValues: MapFilter[] ) {
	return selectValues.map( ( item ) => {
		return { label: item.value, value: safeSlug( item.value ) };
	} );
}

const centerViewIcon = () => (
	<Icon
		icon={ () => (
			<svg
				width={ 20 }
				height={ 20 }
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
			>
				<path d="M0 0h48v48H0z" fill="none" />
				<path d="M10 30H6v8a4 4 0 0 0 4 4h8v-4h-8v-8zm0-20h8V6h-8a4 4 0 0 0-4 4v8h4v-8zm28-4h-8v4h8v8h4v-8a4 4 0 0 0-4-4zm0 32h-8v4h8a4 4 0 0 0 4-4v-8h-4v8zM24 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
			</svg>
		) }
	/>
);

export const TopBar = ( attributes ) => {
	const { map, listings }: MountedMapsContextValue =
		useContext( MapboxContext );
	const { fitView, tagsEnabled, filtersEnabled, mapboxOptions } = attributes;
	const [ filter, setFilter ] = useState( '' );
	const [ tag, setTag ] = useState( '' );

	// if no special stuff is required, return null
	if ( fitView || filtersEnabled || tagsEnabled ) {
		return (
			<div className={ 'map-topbar' }>
				{ fitView ? (
					<Button
						icon={ centerViewIcon }
						isSmall={ true }
						className={ 'fit-view' }
						onClick={ () => fitInView( map, listings ) }
					>
						fit-view
					</Button>
				) : null }

				{ filtersEnabled ? (
					<SelectControl
						className={ 'mapbox-map-filter filter-by-partnership' }
						value={ filter }
						options={ [
							{
								value: '',
								label: 'Select a filter',
								disabled: true,
							},
							...topbarBuildSelectFromArray(
								mapboxOptions.filters
							),
						] }
						onChange={ ( selected ) => setFilter( selected ) }
						__nextHasNoMarginBottom
					/>
				) : null }

				{ tagsEnabled ? (
					<SelectControl
						className={ 'mapbox-map-filter filter-by-tag' }
						value={ tag }
						options={ [
							{
								value: '',
								label: 'Select a tag',
								disabled: true,
							},
							...topbarBuildSelectFromArray( mapboxOptions.tags ),
						] }
						onChange={ ( selected ) => setTag( selected ) }
						__nextHasNoMarginBottom
					/>
				) : null }
			</div>
		);
	}

	return null;
};
