import React, { useState } from 'react';
import dancer from '../media/dancer.png'

function SpotifySearch(props) {

    const [searchText,setSearchText]=useState('')

    //future addition, add a radio button to generate a random playlist based on song recommendation
    //clear out the text of the input field aas soon as you click into it and it's active

    function handleSubmit(e) {
        e.preventDefault();

        if (searchText==='' || searchText===' ') {return}
        setSearchText('');

        let authParameters = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ props.accessToken
            }
        }

        const searchArray = searchText.split(" ")
        const baseUrl = 'https://api.spotify.com/v1/search?q=remaster%2520track%3A'
        const endUrl = '&type=track&market=US&limit=10&offset=0'

        //We are safe to add the first element because the beginning statement made sure there waas at least one word
        let url=baseUrl+searchArray[0];

        //This converts the search input into the fetch url
        //It only runs if there is more than one word
        for (let i=1; i<searchArray.length; i++) {
            if (i%2===0) {
                url=url+'%3A'+searchArray[i];
            } else {
                url=url+'%2520'+searchArray[i];
            }

        }

        //final url
        url=url+endUrl;
        console.log(url);

        fetch(url,authParameters)
            .then(result => result.json())
            .then(data => {
                props.setSearchResults(data.tracks.items);
                console.log(data.tracks.items)
            })
            .catch(error => {
                console.error(error)})
    }


    function handleChange(e) {
        setSearchText(e.target.value);
    }


    return (
        <div onSubmit={handleSubmit} className="spotify-search">
            <img src={dancer} alt='logo' className='logo'/>
            <form>
                <h1>TRACK SEARCH</h1>
                <input 
                    type="text"
                    name="search-input"
                    id="search-input"
                    onChange={handleChange}
                    value={searchText} />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SpotifySearch;