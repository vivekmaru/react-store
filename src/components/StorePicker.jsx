import React, { Component } from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends Component {
    goToStore(e) {
        e.preventDefault();
        const storeID  = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeID}`);
    }

    render() {
        return (
            <form action="" className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Plese enter a store</h2>
                <input type="text" placeholder="Store Name" required defaultValue={getFunName()} ref={(input) => this.storeInput = input } />
                <button type="Submut">Visit Store</button>
            </form>
        )
    }
}

//to make router available to the component
StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;