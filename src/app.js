import React from 'react';
import Papa from 'papaparse';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: [],
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    for (let i = 0; i < result.length; i++) {
                        let song = {
                            id: result[i].id,
                            title: result[i].title,
                            danceability: result[i].danceability,
                            energy: result[i].energy,
                            key: result[i].key,
                            loudness: result[i].loudness,
                            mode: result[i].mode,
                            acousticness: result[i].acousticness,
                            instrumentalness: result[i].instrumentalness,
                            liveness: result[i].liveness,
                            valence: result[i].valence,
                            tempo: result[i].tempo,
                            duration_ms: result[i].duration_ms,
                            time_signature: result[i].time_signature,
                            num_bars: result[i].num_bars,
                            num_sections: result[i].num_sections,
                            num_segments: result[i].num_segments,
                            class: result[i].class
                        }
                        this.setState({ playlist: [...this.state.playlist, song] })
                    }
                    this.setState({ isLoaded: true });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, playlist } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Danceability</th>
                            <th scope="col">Energy</th>
                            <th scope="col">Key</th>
                            <th scope="col">Loudness</th>
                            <th scope="col">Mode</th>
                            <th scope="col">Acousticness</th>
                            <th scope="col">Instrumentalness</th>
                            <th scope="col">Liveness</th>
                            <th scope="col">Valence</th>
                            <th scope="col">Tempo</th>
                            <th scope="col">Duration in MS</th>
                            <th scope="col">Time Signature</th>
                            <th scope="col">Number of Bars</th>
                            <th scope="col">Number of Sections</th>
                            <th scope="col">Number of Segments</th>
                            <th scope="col">Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist.map(item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.danceability}</td>
                                <td>{item.energy}</td>
                                <td>{item.key}</td>
                                <td>{item.loudness}</td>
                                <td>{item.mode}</td>
                                <td>{item.acousticness}</td>
                                <td>{item.instrumentalness}</td>
                                <td>{item.liveness}</td>
                                <td>{item.valence}</td>
                                <td>{item.tempo}</td>
                                <td>{item.duration_ms}</td>
                                <td>{item.time_signature}</td>
                                <td>{item.num_bars}</td>
                                <td>{item.num_sections}</td>
                                <td>{item.num_segments}</td>
                                <td>{item.class}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
}