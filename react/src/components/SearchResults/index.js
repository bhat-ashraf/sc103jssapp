import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const SearchResults = (props) => (
  <div>
    <p>SearchResults Component</p>
    Title: <h4>{props.fields.Title} </h4>
    <br />
    Description: <h5>{props.fields.Description}</h5>
  </div>
);

export default SearchResults;
