import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const RestaurantOpeningHours = (props) => (
  <div>
    <p>RestaurantOpeningHours Component</p>
    <br />
    <br />
    Open at: {props.fields.data.contextItem.openingTime.value}
    <br />
    close at: {props.fields.data.contextItem.closingTime.value}
  </div>
);

export default RestaurantOpeningHours;
