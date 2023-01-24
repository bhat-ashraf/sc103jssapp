import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const CustomTagList = (props) => {
  const MappedTagList = props.fields.mappedTagList;
  return (
    <div>
      <p>CustomTagList Component</p>
      {MappedTagList.tagslist &&
        MappedTagList.tagslist.map((item, index) => (
          <a key={index} href={`/search?searchQuery=${item.tagitem}`}>
            <b>{item.tagitem}</b>&nbsp;&nbsp;&nbsp;
          </a>
        ))}
    </div>
  );
};

export default CustomTagList;
