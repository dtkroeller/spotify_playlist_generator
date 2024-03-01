import React, {useState} from "react";
import SongCard from "./SongCard";

function PlaylistDisplay({playlist, setPlaylist, accessToken, userID}) {


    const [playlistSaveName,setPlaylistSaveName] = useState('')


    function handleChange(e) {
        setPlaylistSaveName(e.target.value);
    }

    function handleSave(e) {
        e.preventDefault();
        if (playlistSaveName==='' || playlistSaveName===' ') {return};


        //Authorization Parameters to Cretae the Playlist
        let authParametersPlaylist = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": playlistSaveName,
                "description": "Playlist created from playlist creator",
                "public":false
            })
        }

         //Creating the array to add tracks to the new spotify playlist
         let playlistTrackArray=[];
         playlist.forEach((trackObj) => {
             playlistTrackArray.push(`spotify:track:${trackObj.id}`)
         })

        //Authorization Parameters to Add Tracks to the Playlist
        let authParametersAddTracks = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uris": playlistTrackArray,
                "position": 0
            })
        }

        //Create the playlist
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, authParametersPlaylist)
            .then(result => result.json())
            .then(response => {
                
                //Add all of the trcks into the playlist
                fetch(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, authParametersAddTracks)
                    .then((response) => {
                        if (response) {
                            setPlaylistSaveName('');
                            setPlaylist([])
                        }
                    })
                    .catch(error => {
                        alert(error)
                        console.error(error);
                    })
            })
            .catch(error => {
                alert(error)
                console.error(error)})

    }


    return (
        <div className="playlist-display">
            <h2>Playlist</h2>
            <table className="playlist-list">
                <tbody>
                    <tr>
                        <th>Artist - Song - Time</th>
                        <th>Preview</th>
                        <th></th>
                    </tr>
                    {playlist=='' ? <p>Click on songs from the results to add to your playlist.</p> : ''}
                    {playlist.map((track) => (
                        <SongCard
                            artistName={track.artistName}
                            key={track.id}
                            id={track.id}
                            songName={track.songName}
                            songDuration={track.songDuration}
                            playlist={playlist}
                            setPlaylist={setPlaylist}
                            preview={track.preview}
                        />
                    ))}
                </tbody>
            </table>
            <form onClick={handleSave}>
                <input onChange={handleChange} value={playlistSaveName}></input><button className="save-playlist">Save</button>
            </form>
        </div>
    )
};


export default PlaylistDisplay;