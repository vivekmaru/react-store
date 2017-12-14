import React, { Component } from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends Component {
    constructor(){
        super();
        this.renderOrders = this.renderOrders.bind(this);
    }
    renderOrders(id) {
        const fish = this.props.fishes[id];
        const count = this.props.orders[id];
        const removeButton = <button onClick={(e) => this.props.removeFromOrder(id)}>&times;</button>
        if(!fish || fish.status === 'unavailable') {
            console.log(!fish);
            return <li key={id}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
        }
        return (
            <li key={id}>
                <span>
                    <CSSTransitionGroup
                        component="home"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>{count}</span>
                    </CSSTransitionGroup>
                    lbs of {fish.name} {removeButton}
                </span>

                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        const orderIDs = Object.keys(this.props.orders);
        const total = orderIDs.reduce((prevTotal, id) => {
            const fish = this.props.fishes[id];
            const count = this.props.orders[id];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            return prevTotal;

        } ,0)

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <CSSTransitionGroup
                component='ul'
                className="order"
                transitionName="order"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                    {orderIDs.map(this.renderOrders)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired,
}

export default Order;