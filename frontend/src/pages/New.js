import React, {Component} from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',

    };

    handleSubmit = async e =>{
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        // sending form data to api and then to our DB
        await api.post ('posts', data)

        // after the user hit the submit button, he'll be redirected to the main page (/)
        this.props.history.push('/');
    }


    handleImageChange = e =>{
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return (
            <form id="new-post"  onSubmit={this.handleSubmit}>
                <input
                    type="file"  onChange={this.handleImageChange}
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Post author"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input
                    type="text"
                    name="place"
                    placeholder="Post location"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Post description"
                    onChange={this.handleChange}
                    value={this.state.description}
                />

                <input
                    type="text"
                    name="hashtags"
                    placeholder="Post hashtags"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />
                
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default New;