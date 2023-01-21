import React from 'react';
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { withRouter } from 'react-router-dom';
import { sitecoreApiHost, sitecoreApiKey } from '../../temp/config';
const EnquiryForm = (props) => (
  <Form
    form={props.fields}
    sitecoreApiHost={sitecoreApiHost}
    sitecoreApiKey={sitecoreApiKey}
    onRedirect={(url) => props.history.push(url)}
  />
);
export default withRouter(EnquiryForm);
