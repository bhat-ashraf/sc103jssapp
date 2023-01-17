
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

export default function (manifest) {
  manifest.addComponent({
    name: 'HomeCarousel',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'CarouselItems', type: CommonFieldTypes.ContentList }],
  });
}
