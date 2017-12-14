import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish';
import base from '../base.js';

class App extends Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.state = {
            fishes: {},
            order: {}
        };
    }

    addFish(fish) {
        //get existing fishes
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        //make new fish object
        fishes[`fish-${timestamp}`] = fish;
        //update fishes in the state
        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes}
        fishes[key] = null;
        this.setState({ fishes });
    }

    addToOrder(key) {
        const order = {...this.state.order};
        //update count of the fish ordered
        order[key]  = order[key] + 1 || 1;
        //update state
        this.setState({ order });

    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
        //check order in localstorege
        // check if there is any order in localStorage

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if(localStorageRef) {
            // update our App component's order state
            this.setState({
            order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                        Object
                            .keys(this.state.fishes)
                            .map(key => <Fish details={this.state.fishes[key]} key={key} index={key} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>

                <Order fishes={this.state.fishes}
                orders={this.state.order}
                params={this.props.params}
                removeFromOrder={this.removeFromOrder}
                />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish}
                storeId={this.props.params.storeId}/>
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;