import React from 'react';
import { Text, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const MenuItemList = this.props.sitecoreContext.route.fields.Menu;
    return (
      <div style={{ backgroundColor: this.props.fields.ComponentBackground.value }}>
        <h1>
          <Text field={this.props.fields.ComponentTitle} />
        </h1>
        {MenuItemList &&
          MenuItemList.map((item, index) => (
            <article className="menu-item" key={index}>
              <h3 className="mains-name">{item.fields.ItemName.value}</h3>
              <strong className="mains-price">{item.fields.ItemQuantity.value}</strong>
              <p className="mains-description">{item.fields.ItemType.value}</p>
            </article>
          ))}
      </div>
    );
  }
}

export default withSitecoreContext()(RestaurantMenu);
