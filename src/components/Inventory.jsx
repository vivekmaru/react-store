import React, { Component } from 'react';
import AddNewFish from './addNewFish';
import base from '../base.js';

class Inventory extends Component {
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state ={
            uid: null,
            owner: null
        }
    }
    componentDidMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler({user});
            }
        });
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
    }

    authenticate(provider) {
        base.auth().signInWithPopup(provider).then(this.authHandler).catch(function(err){
            console.log(1);
        });
    }

    logout() {
        base.unauth();
        this.setState({ uid: null })
    }

    authHandler(authData){
        //grab store Info
        const storeRef = base.database().ref(this.props.storeId);

        //query datase once
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            //if no owner, claim it in firebase
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }
            //set state locally
            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your stroe's inventory</p>
                <button className="github" onClick={() => this.authenticate(new base.auth.GithubAuthProvider())}>Log in with Github</button>
                <button className="facebook" onClick={() => this.authenticate(new base.auth.FacebookAuthProvider())}>Log in with Facebook</button>
            </nav>
        )
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input name="name" value={fish.name} type="text" placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
                <input name="price" value={fish.price} type="text" placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
                <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={fish.desc} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input name="image" value={fish.image} type="text" placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={(e) => this.props.removeFish(key)}>Remove fish</button>
            </div>

        )
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out</button>
        if(!this.state.uid) {
            //check if they are not logged in
            return <div>{this.renderLogin()}</div>
        }

        //check if tey are the owner of the current state
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {
                    Object.keys(this.props.fishes)
                        .map(this.renderInventory)
                }

                <AddNewFish addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Samples</button>
            </div>
        )
    }
}

export default Inventory;