import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { withTranslation } from 'react-i18next';

class RestaurantOpeningHours extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('props');
    console.log(this.props);
    const openAtLabel = this.props.t('Openat');
    const closeAtLabel = this.props.t('Closeat');
    return (
      <div>
        <p>RestaurantOpeningHours Component</p>
        {openAtLabel}: {this.props.fields.data.contextItem.openingTime.value}
        <br />
        {closeAtLabel}: {this.props.fields.data.contextItem.closingTime.value}
      </div>
    );
  }
}

export default withTranslation()(RestaurantOpeningHours);
