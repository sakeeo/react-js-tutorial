import React from 'react';
import axios from 'axios';

export default class MovieList extends React.Component {
  state = {
    Search: [],
    totalResults:0,
    Response:false,
  }

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=`+this.props.cari+`&page=`+this.props.page)
      .then(res => {
        this.setState({
            Search       :res.data.Search,
            totalResults :res.data.totalResults,
            Response     :res.data.Response
        });
      })
  }

  render() {
    return (
            <div>
                <h3>LIST MOVIE</h3>
                <h3>TOTAL RESULT : {this.state.totalResults} </h3>
                <h3>RESPONSE: {this.state.Response} </h3>
              {
                this.state.Search.map((lm)=>(
                      <li key={lm.imdbID}>
                          <p>{lm.Title}</p>
                          <p>{lm.Type} - {lm.Year}</p>
                          <img src={lm.Poster} alt="Poster" with='100px' />
                      </li>
                ))
              }
            </div>

    )
  }
}

MovieList.defaultProps = {
  page: 1,
  cari:"Bat",
};
