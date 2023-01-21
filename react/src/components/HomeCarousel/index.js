import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import Carousel from 'react-bootstrap/Carousel';

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Carousel>
        {this.props.fields.data.datasource.carouselItems.targetItems &&
          this.props.fields.data.datasource.carouselItems.targetItems.map((carouselItem, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={carouselItem.image.jsonValue.value.src}
                alt={carouselItem.image.jsonValue.value.alt}
              />
              <Carousel.Caption>
                <h3>
                  <a href={carouselItem.url.url}>{carouselItem.title.value}</a>
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    );
  }
}
export default HomeCarousel;
