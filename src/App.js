import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Col } from 'react-bootstrap';
import Profile from './component/Profile';
import Gallery from './component/Gallery';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            query: '',
            artist: null,
            tracks: null
        };

        this.search = this.search.bind(this);
    }

    search(){
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        fetch(FETCH_URL,{
            method: 'GET',
        })
        .then(response =>{
            return response.json();
        })
        .then(json => {
            const getArtist = json.artists.items[0];
            console.log(getArtist)
            this.setState({
                artist : getArtist
            });
            FETCH_URL = `${ALBUM_URL}${getArtist.id}/top-tracks?country=ES`
            fetch(FETCH_URL,{
                method: 'GET'
            })
            .then(response =>{
                return response.json();
            })
            .then(json =>{
                const {tracks} = json;
                this.setState({tracks : tracks});
            })
            .catch(error =>{
                alert('Not Fount!');
            });
        })
        .catch(error =>{
            alert('Try again!');
        });
    }
    render(){
        return(
            <div className="App">
                <div style={{width:'500px',margin:'0 auto'}}>
                    <div className="App-title">Music Master</div>
                    <FormGroup>
                        <InputGroup style={{/*width:'30%',margin:'0 auto'*/}}>
                            <FormControl
                                type="text"
                                placeholder="Search for an artist"
                                value={this.state.query}
                                onChange={event => {this.setState({query: event.target.value})}}
                                onKeyPress={event => {
                                    if(event.key === 'Enter'){
                                        this.search()
                                    }
                                }}
                            />
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>

                    {
                        this.state.artist !== null
                            ?
                            <React.Fragment>
                                <div className="Gallery">
                                    Gallery
                                </div>
                                <Profile
                                artist={this.state.artist}
                                />
                            </React.Fragment>
                            :
                                <div></div>

                    }

                    {
                        this.state.tracks !== null
                            ?
                            <React.Fragment>
                                <Gallery
                                    tracks={this.state.tracks}
                                />
                            </React.Fragment>
                            :
                            <div></div>

                    }

                </div>
            </div>
        );
    };
}

export default App;