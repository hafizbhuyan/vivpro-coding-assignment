import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { CSVLink } from 'react-csv';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: [],
            isLoaded: false,
            error: null,
            searchItem: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let counter = 1
                    for (let i = 0; i < result.length; i++) {
                        let song = {
                            ID: counter,
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
                        counter++
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

    // handleChange = event => {
    //     this.setState({ searchItem: event.target.value })
    // }

    render() {
        const { error, isLoaded, playlist } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{margin: '2% 0% 2% 0%'}}>
                    {/* <div className="input-group mb-3">
                        <input className="form-control" type="text" placeholder="Enter a song title..." />
                    </div> */}
                    <DataGrid
                        columns={[
                            {field: 'id', headerName: 'ID', width: 100},
                            {field: 'title', headerName: 'Title', width: 150},
                            {field: 'danceability', headerName: 'Danceability', width: 175},
                            {field: 'energy', headerName: 'Energy', width: 150},
                            {field: 'key', headerName: 'Key', width: 150},
                            {field: 'loudness', headerName: 'Loudness', width: 150},
                            {field: 'mode', headerName: 'Mode', width: 150},
                            {field: 'acousticness', headerName: 'Acousticness', width: 175},
                            {field: 'instrumentalness', headerName: 'Instrumentalness', width: 175},
                            {field: 'liveness', headerName: 'Liveness', width: 150},
                            {field: 'valence', headerName: 'Valence', width: 150},
                            {field: 'tempo', headerName: 'Tempo', width: 150},
                            {field: 'duration_ms', headerName: 'Duration in MS', width: 200},
                            {field: 'time_signature', headerName: 'Time Signature', width: 200},
                            {field: 'num_bars', headerName: 'Number of Bars', width: 200},
                            {field: 'num_sections', headerName: 'Number of Sections', width: 200},
                            {field: 'num_segments', headerName: 'Number of Segments', width: 200},
                            {field: 'class', headerName: 'Class', width: 150}
                        ]}
                        rows={this.state.playlist}
                        autoHeight={true}
                        rowHeight={50}
                        pagination={true}
                        pageSize={10}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
                        <CSVLink data={this.state.playlist} className="btn btn-primary">Download as CSV</CSVLink>                    
                    </div>
                </div>
            );
        }
    }
}