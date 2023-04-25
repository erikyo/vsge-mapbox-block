import { useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes } from '@wordpress/blocks';
import { Map } from './components/Mapbox/Map';
import { getDefaults } from './utils';
import { Listing } from './components/Mapbox/Listing';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/**
 * The save function defines the way in which the different attributes should be combined into the final markup, which is then serialized into post_content.
 *
 * @param    props
 * @param    props.attributes - the block attributes
 * @param    props.map
 * @function Object() { [native code] }
 */
function Save( { attributes }: BlockAttributes ): JSX.Element {
	const blockProps = useBlockProps.save( {
		className: classNames( 'wp-block-vsge-mapbox', 'block-mapbox' ),
	} );

	const defaults = getDefaults();

	return (
		<div
			{ ...blockProps }
			data-mapbox-attributes={ JSON.stringify( attributes ) }
			data-mapbox-listings={ JSON.stringify(
				attributes.mapboxOptions.listings
			) }
			data-mapbox-tags={ JSON.stringify( attributes.mapboxOptions.tags ) }
			data-mapbox-filters={ JSON.stringify(
				attributes.mapboxOptions.filters
			) }
		>
			{ attributes.sidebarEnabled ? (
				<div className={ 'map-sidebar' }>
					{ attributes.geocoderEnabled === true && defaults ? (
						<div id="geocoder" className="geocoder"></div>
					) : null }
					<div className="feature-listing">
						{ attributes.mapboxOptions.listings.map(
							( data: any, index: number ) => (
								<Listing { ...data } key={ index } />
							)
						) }
					</div>
				</div>
			) : null }
			<div className={ 'map-container' }>
				<div className={ 'map-topbar' }>
					{ attributes.fitView ? (
						<button
							className={
								'button button-secondary outlined has-white-background-color fit-view'
							}
						>
							fit-view
						</button>
					) : null }

					{ attributes.tagsEnabled ? (
						<select className={ 'filter-by-partnership' }>
							<option value="" selected>
								{ __( 'Filters' ) }
							</option>
							{ attributes.mapboxOptions.filters.map(
								( option: any ) => (
									<option
										value={ option.value }
										key={ option.key }
									>
										{ option.value }
									</option>
								)
							) }
						</select>
					) : null }

					{ attributes.filtersEnabled ? (
						<select className={ 'filter-by-tag' }>
							<option value="" selected>
								{ __( 'Tags' ) }
							</option>
							{ attributes.mapboxOptions.tags.map(
								( option: any ) => (
									<option
										value={ option.value }
										key={ option.key }
									>
										{ option.value }
									</option>
								)
							) }
						</select>
					) : null }
					<Map mapRef={ null } />
				</div>
			</div>
		</div>
	);
}
export default Save;
