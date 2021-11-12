//feature-1
import React from 'react';
import Products from './components/products';
import data from './data.json'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a className="brand" href="/">Shopping App</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>
          All Rights Are Reserved
        </footer>
      </div>
    );
  }
}

export default App;
