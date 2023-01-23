import React, { useEffect, useState } from 'react';
import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';
import { sitecoreApiHost, sitecoreApiKey, jssAppName } from '../../temp/config';

const language = 'en';
const sitecoreRoutePath = '/restaurants';

export const layoutService = new RestLayoutService({
  apiHost: sitecoreApiHost,
  apiKey: sitecoreApiKey,
  siteName: jssAppName,
  tracking: true,
});

const LayoutServiceRestTesting = (props) => {
  const [pageData, setPageData] = useState();
  useEffect(() => {
    layoutService.fetchLayoutData(sitecoreRoutePath, language).then((data) => {
      setPageData(data);
    });
  }, []);
  return (
    <div>
      <br />
      <h1>{pageData && pageData.sitecore.route.fields.Title.value} </h1>
      <p>LayoutServiceRestTesting Component</p>
    </div>
  );
};

export default LayoutServiceRestTesting;
