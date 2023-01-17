// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the RestaurantHero component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'RestaurantHero',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'PageTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'Image', type: CommonFieldTypes.SingleLineText },
      { name: 'ContactUsLink', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
