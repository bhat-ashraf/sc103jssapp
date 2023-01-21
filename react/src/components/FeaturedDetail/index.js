import React from 'react';
import Slider from 'react-slick';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
class FeaturedDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3 };
    return (
      <div>
        {this.props.fields.data.datasource && (
          <div>
            <br />
            <h3>Featured Detail</h3>
            <br />
            <Slider {...settings}>
              {this.props.fields.data.datasource.featuredPages.targetItems &&
                this.props.fields.data.datasource.featuredPages.targetItems.map(
                  (featuredItems, index) => (
                    <div key={index}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={featuredItems.image.jsonValue.value.src} />
                        <Card.Body>
                          <Card.Title>
                            <div>{featuredItems.title.value}</div>
                          </Card.Title>
                          <Card.Text>
                            {featuredItems.adventureType && (
                              <div>
                                Adventure Type:
                                <h3>{featuredItems.adventureType.value}</h3>
                                <br />
                              </div>
                            )}

                            {featuredItems.adventureOpeningHours && (
                              <div>
                                Age Limit:<h3>{featuredItems.adventureOpeningHours.value}</h3>
                                <br />
                              </div>
                            )}

                            {featuredItems.leisureType && (
                              <div>
                                Leisure Type:<h3>{featuredItems.leisureType.value} </h3>
                                <br />
                              </div>
                            )}

                            {featuredItems.dressCode && (
                              <div>
                                Dress Code:<h3>{featuredItems.dressCode.value} </h3>
                                <br />
                              </div>
                            )}

                            {featuredItems.phonenumber && (
                              <div>
                                <h3>{featuredItems.phonenumber.value} </h3>
                                <br />
                              </div>
                            )}

                            {featuredItems.openingTime && (
                              <div>
                                Opens at:<h3>{featuredItems.openingTime.value} </h3>
                                <br />
                              </div>
                            )}
                            {featuredItems.closingTime && (
                              <div>
                                Closes at:<h3>{featuredItems.closingTime.value} </h3>
                                <br />
                              </div>
                            )}
                          </Card.Text>
                          <Button variant="primary">Go to the page</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                )}
            </Slider>
          </div>
        )}
      </div>
    );
  }
}
export default FeaturedDetail;
