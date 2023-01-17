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
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
export default HomeCarousel;
