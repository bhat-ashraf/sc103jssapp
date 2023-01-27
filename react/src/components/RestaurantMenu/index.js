import React from 'react';
import { withSitecoreContext, Text } from '@sitecore-jss/sitecore-jss-react';

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isPriceLoaded: false,
      menuListWithPrices: [],
      menuListWithoutPrices: props.sitecoreContext.route.fields.Menu,
    };
    this.ShowPrices = this.ShowPrices.bind(this);
  }
  ShowPrices() {
    let contextItemId = this.props.sitecoreContext.route.itemId;
    let contextDatabase = this.props.sitecoreContext.route.databaseName;
    let contextLanguage = this.props.sitecoreContext.route.itemLanguage;
    if (contextDatabase === 'available-in-connected-mode') {
      contextItemId = '{03230724-225E-4882-9FD7-E726E4EAFA93}';
      contextDatabase = 'master';
      contextLanguage = 'en';
    }
    let requestPayload = {
      ContextItemId: contextItemId,
      ContextDatabaseName: contextDatabase,
      ContextLanguageName: contextLanguage,
    };
    let requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload),
    };
    console.log(JSON.stringify(requestPayload));
    fetch('https://sc103.jss.app/datamaticsapi/Restaurant/FetchMenuPrice', requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isPriceLoaded: true,
            menuListWithPrices: result,
            menuListWithoutPrices: [],
          });
        },
        (error) => {
          console.log(error);
          alert('api call failed');
        }
      );
  }
  render() {
    return (
      <div>
        <h1>
          <Text field={this.props.fields.ComponentTitle} />
        </h1>

        <button key="showpricesbtn" onClick={this.ShowPrices}>
          Show Prices
        </button>

        <div style={{ backgroundColor: this.props.fields.ComponentBackground.value }}>
          {this.state.menuListWithPrices &&
            this.state.menuListWithPrices.map((menuItem, index) => {
              return (
                <div key={index}>
                  <article className="menu-item" key={index}>
                    <h3 className="mains-name">{menuItem.ItemName}</h3>
                    <h5 className="mains-name">{menuItem.ItemType}</h5>
                    <strong className="mains-price" style={{ float: 'right' }}>
                      {menuItem.ItemPrice}
                    </strong>
                    <p className="mains-description">{menuItem.ItemQuantity}</p>
                  </article>
                </div>
              );
            })}

          {this.state.menuListWithoutPrices &&
            this.state.menuListWithoutPrices.map((menuItem, index) => {
              return (
                <div key={index}>
                  <article className="menu-item" key={index}>
                    <h3 className="mains-name">{menuItem.fields.ItemName.value}</h3>
                    <h5 className="mains-name">{menuItem.fields.ItemType.value}</h5>
                    <p className="mains-description">{menuItem.fields.ItemQuantity.value}</p>
                  </article>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default withSitecoreContext()(RestaurantMenu);
