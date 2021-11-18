import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: ""
        }
    }

    createOrder = (event) => {
        event.preventDefault();
        const order = {
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order);
        console.log(order);
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                { cartItems.length === 0 ?
                <div className="cart cart-header">Cart is Empty</div> 
                : 
                <div  className="cart cart-header">You Have { cartItems.length } Items in Cart</div>
                }
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-item">
                                {cartItems.map(item => 
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className="button" onClick={() => { this.props.removeFromCart(item)}}>Remove</button>
                                        </div>
                                    </div>
                                </li>)}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                TOTAL: {" "}
                                { formatCurrency(cartItems.reduce((total, currentItem) => (total + currentItem.price) * currentItem.count, 0)) } {" "}
                            </div>
                            <button onClick={() => { this.setState({showCheckout: true}) }} className="button primary">Proceed</button>
                        </div>
                    </div>
                    {this.state.showCheckout && (
                        <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>E-mail:</label>
                                        <input type="email" name="email" required onChange={this.handleInput} />
                                    </li>
                                    <li>
                                        <label>Name:</label>
                                        <input type="text" name="name" required onChange={this.handleInput} />
                                    </li>
                                    <li>
                                        <label>Address:</label>
                                        <input type="address" name="address" required onChange={this.handleInput} />
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">Checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </Fade>
                    )}
                    </div>
                    )}
                </div>
            </div>
        )
    }
}
