import React from 'react';
import { Text, Image } from '@sitecore-jss/sitecore-jss-react';
import { withTranslation } from 'react-i18next';

class RestaurantHero extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const imageSrc = 'url(' + this.props.fields.Image.value.src + ')';
    const contactUrl = this.props.fields.ContactUsLink.value.href;
    const label = this.props.t('ContactUs');
    return (
      <header style={{ paddingLeft: 0 }}>
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage: imageSrc,
            height: 400,
          }}
        >
          <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">
                  <Text field={this.props.fields.Title} />
                </h1>
                <h4 className="mb-3">
                  <Text field={this.props.fields.PageTitle} />
                </h4>
                <a className="btn btn-outline-light btn-lg" href={contactUrl} role="button">
                  {label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default withTranslation()(RestaurantHero);
