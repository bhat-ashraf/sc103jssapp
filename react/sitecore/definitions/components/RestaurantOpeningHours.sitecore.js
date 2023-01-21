// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the RestaurantOpeningHours component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'RestaurantOpeningHours',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'OpeningHours', type: CommonFieldTypes.SingleLineText },
      { name: 'ClosingHours', type: CommonFieldTypes.SingleLineText },
    ],
  });
}
