import React, { Component } from 'react';

class AddNewFish extends Component {
    createFish(e) {
        e.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addFish(fish);
    }

    render() {
        return (
            <div>
                <form className="fish-edit" onSubmit={(e) => this.createFish(e)}>
                    <input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
                    <input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
                    <select ref={(input) => this.status = input}>
                        <option value="available">Fresh!</option>
                        <option value="unavailable">Sold Out!</option>
                    </select>
                    <textarea ref={(input) => this.desc = input} placeholder="Fish Name" ></textarea>
                    <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
                    <button type="Submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddNewFish;