import React from 'react';
import { Form, createDefaultFieldFactory } from '@sitecore-jss/sitecore-jss-react-forms';
import { withRouter } from 'react-router-dom';
import { sitecoreApiHost, sitecoreApiKey } from '../../temp/config';
const myCustomFormFactory = createDefaultFieldFactory();
myCustomFormFactory.setComponent('{72B22999-8509-49A1-BD0C-04D68A9131CD}', (props) => {
  console.log(props.field.model);
  return (
    <div>
      <label className={props.field.model.cssClass}>{props.field.model.title} : </label>
      <input
        className={props.field.model.cssClass}
        placeholder={props.field.model.placeholderText}
        value={props.field.model.value}
      />
      <br />
      <label className={props.field.model.cssClass}>{props.field.model.confirmEmailLabel} : </label>
      <input
        className={props.field.model.cssClass}
        placeholder={props.field.model.confirmEmailPlaceholder}
        value={props.field.model.confirmEmail}
      />
    </div>
  );
});
const EnquiryForm = (props) => (
  <Form
    form={props.fields}
    sitecoreApiHost={sitecoreApiHost}
    sitecoreApiKey={sitecoreApiKey}
    onRedirect={(url) => props.history.push(url)}
    fieldFactory={myCustomFormFactory}
  />
);
export default withRouter(EnquiryForm);
