import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import GraphQLData from '../../lib/GraphQLData';
import gql from 'graphql-tag';

const HEARER_QUAERY = gql`
  query HeaderComponent($headerSettingId: String) {
    headerNavQuery: item(language: "en", path: $headerSettingId) {
      ... on PageHeader {
        backgroundColor {
          value
        }
        headerTitle {
          value
        }
        homePageItemUrl {
          jsonValue
        }
        mainNavigationItems {
          targetItems {
            mainnavurl: url {
              url
            }
            ... on MetaBase {
              title {
                value
              }
            }
            children {
              results {
                id
                name
                subnavurl: url {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
class PageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {console.log(
          this.props.headerQ.headerNavQuery && this.props.headerQ.headerNavQuery.homePageItemUrl
        )}
        {this.props.headerQ.headerNavQuery && (
          <Navbar bg={this.props.headerQ.headerNavQuery.backgroundColor.value} expand="lg">
            <Container>
              <Navbar.Brand
                href={this.props.headerQ.headerNavQuery.homePageItemUrl.jsonValue.value.href}
              >
                {this.props.headerQ.headerNavQuery.headerTitle.value}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {this.props.headerQ.headerNavQuery.mainNavigationItems.targetItems &&
                    this.props.headerQ.headerNavQuery.mainNavigationItems.targetItems.map(
                      (mainnavitem, index) => (
                        <NavDropdown
                          key={index}
                          title={mainnavitem.__typename}
                          id="basic-nav-dropdown"
                        >
                          <Nav.Link href={mainnavitem.mainnavurl.url}>
                            {mainnavitem.jss}
                          </Nav.Link>

                          {mainnavitem.children.results &&
                            mainnavitem.children.results.map((subnavitem, index) => (
                              <NavDropdown.Item key={index} href={subnavitem.subnavurl.url}>
                                {subnavitem.name}
                              </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                      )
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </div>
    );
  }
}

export default GraphQLData(HEARER_QUAERY, {
  name: 'headerQ',
  options: {
    variables: {
      headerSettingId: '{A5F9596C-9260-4F05-A99D-1AEBD3690AD8}',
    },
  },
})(PageHeader);
