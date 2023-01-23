import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const AttractionPrices = (props) => {
  console.log('props: ' + props);
  return (
    <div>
      <br />
      <h1>Cost: </h1>
      {props.fields && props.fields.attractionPrice && <p>{props.fields.attractionPrice.price}</p>}
    </div>
  );
};

export default AttractionPrices;
