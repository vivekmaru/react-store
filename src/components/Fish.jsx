import React, { Component } from 'react';
import { formatPrice } from '../helpers.js';

class Fish extends Component {
    render() {
        const {details, index } = this.props;
        const isAvailable = details.status === 'available';
        const buttonText =  isAvailable? 'Add to order' : 'Sold Out!';
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                </h3>
            <span className="price">{formatPrice(details.price)}</span>
            <p>{details.desc}</p>
            <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
}

export default Fish;