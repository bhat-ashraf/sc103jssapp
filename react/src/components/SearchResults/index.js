import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const SearchResults = (props) => {
  const searchResultList = props.fields.tagListResults;
  return (
    <div>
      <p>SearchResults Component</p>
      {searchResultList &&
        searchResultList.map((item, index) => (
          <div key={index}>
            Title: <p>{item.title}</p>
            <br />
            Description: <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
