import React, {useState, useEffect} from "react";
import SpotifySearch from "./SpotifySearch";
import ResultsDisplay from "./ResultsDisplay";
import PlaylistDisplay from "./PlaylistDisplay";
import dancer from '../media/dancer.png'


function PlaylistCreator() {
    const [searchResults,setSearchResults]=useState([]);
    const [playlist,setPlaylist]=useState([]);
    const [accessToken,setAccessToken]=useState('');
    const [userID,setUserID]=useState('');


    const CLIENT_ID = '828085bf8fc44b4e97b61c9f65774413'
    const REDIRECT_URI = 'http://localhost:3000'
    const SCOPE = 'playlist-read-private playlist-modify-private playlist-modify-public user-read-private user-read-email'


    function token() {
        
        if (!accessToken) {
            let url = 'https://accounts.spotify.com/authorize?response_type=token';
            url += '&client_id=' + encodeURIComponent(CLIENT_ID);
            url += '&scope=' + encodeURIComponent(SCOPE);
            url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);

            window.location = url;
        }
    }


    useEffect(() => {
        let response=window.location.hash;
        
        let hashParams = {};
        response.split('&').forEach(function(item) {
            const parts = item.split('=');
            hashParams[parts[0]] = parts[1];
        });
        
        setAccessToken(hashParams['#access_token'])
    },[])


    useEffect(() => {
        //Authorization Parameters to get the current user ID
        let authParametersUserID = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ accessToken,
            },
        }
        
        //Get the current user's ID
        fetch('https://api.spotify.com/v1/me', authParametersUserID)
            .then(result => result.json())
            .then(response => {
                console.log(response.id)
                setUserID(response.id)
            })
            .catch(error => console.log(error))
    },[accessToken])


    return (
        <>
            {
                <div className="playlist-creator">
                    {
                        !accessToken ? 
                            <>
                                <img src={dancer} alt='logo' className='logo'/>
                                <h1>TRACK SEARCH</h1>
                                <button onClick={token} className="login">Login to Spotify</button>
                            </>
                        :

                        <SpotifySearch setSearchResults={setSearchResults} accessToken={accessToken}/>
                    }
                    <div className="result-playlist-display">
                        <ResultsDisplay searchResults={searchResults} playlist={playlist} setPlaylist={setPlaylist} />
                        <PlaylistDisplay playlist={playlist} setPlaylist={setPlaylist} accessToken={accessToken} userID={userID} />
                    </div>
                    <div className="signature">
                        <p>TKO Productions</p>
                    </div>
                </div>
            }
        </>
    )
}


export default PlaylistCreator;