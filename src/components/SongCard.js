import React from "react";

function SongCard(props) {

    if (props.playlist.find(track=>track.id===props.id)) {
        
    }

    const handlePlaylistButton = () => {
        if (props.playlist.find(track=>track.id===props.id)) {
            const newPlaylist = props.playlist.filter(track => track.id!==props.id);
            props.setPlaylist(prevPlaylist => newPlaylist);
            return;
        }
        const trackObj = {
            id: props.id,
            artistName: props.artistName,
            songName: props.songName,
            songDuration: props.songDuration,
            preview: props.preview
        }
        props.setPlaylist(prevPlaylist => [...prevPlaylist, trackObj])
    }

    function songDuration(songDuration) {
        let leftOver;
        const min=Math.floor(songDuration/60000)
        leftOver=songDuration-min*60000;
        const sec=Math.ceil(leftOver/1000)
    
        return `${min}:${sec}`
    }

    return (
        <tr className="song-card-row">
            <td className="song-card-data-cell" onClick={handlePlaylistButton}>
                {props.songName} - {props.artistName} - {songDuration(props.songDuration)}
            </td>
            <td className="preview-cell" onClick={handlePlaylistButton}>
                <audio controls src={props.preview}></audio>
            </td>
            <td className="playlisted-button-cell">
                {props.playlist.find(track=>track.id===props.id) ? (
                    <button className="playlisted clicked" onClick={handlePlaylistButton} style={{backgroundColor:'#5DFFE9'}}> </button>
                ) : (
                    <button className="playlisted not-clicked" onClick={handlePlaylistButton}> </button>
                )}
            </td>
        </tr>
    )
}

export default SongCard;