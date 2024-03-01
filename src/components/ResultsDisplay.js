import React from "react";
import SongCard from "./SongCard";

function ResultsDisplay({searchResults, playlist, setPlaylist}) {


    return (
        <div className="results-display">
            <h2>Results</h2>
            <table className="result-list">
                <tbody>
                    <tr>
                        <th>Artist - Song - Time</th>
                        <th>Preview</th>
                        <th></th>
                    </tr>
                    {searchResults=='' ? <p>Search for tracks to add to your playlist.</p> : ''}
                    {searchResults.map((track) => (
                        <SongCard 
                            artistName={track.artists[0].name}
                            key={track.id}
                            id={track.id}
                            songName={track.name}
                            songDuration={track.duration_ms}
                            playlist={playlist}
                            setPlaylist={setPlaylist}
                            preview={track.preview_url}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResultsDisplay;