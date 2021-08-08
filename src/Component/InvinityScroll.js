import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
          movies: [],
          totalResults:0,
          Response:false,
          loading: false,
          page: 1,
          pCari:'Batman',
          prevY: 1
    };
  }
  
  componentDidMount() {
    this.getMovies(this.state.page,this.state.pCari);
    var options = {
     root: null,
     rootMargin: "0px",
     threshold: 1.0
   };
   this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
  
  handleObserver(entities, observer) {

    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastMovie = this.state.movies[this.state.movies.length - 1];
      const curPage = lastMovie.albumId;
      this.getMovies(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });

  }
  
  getMovies(pCari,page) {
    this.setState({ loading: true });
    axios
      .get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=${pCari}&page=${page}`)
      .then(res => {
        this.setState({
          movies       :res.data.Search,
          totalResults :res.data.totalResults,
          Response     :res.data.Response
        })
        this.setState({ loading: false });
      });
  }

  render() {
    // // Additional css
    // const loadingCSS = {
    //   height: "100px",
    //   margin: "30px"
    // };
    // 
    // // To change the loading icon behavior
    // const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    // 
    return (
      <p>TEST</p>
    //   <div className="container">
    //     <div style={{ minHeight: "800px" }}>
    //       {this.state.movies.map(movie => (
    //         <img src={movie.poster} height="100px" width="200px" />
    //       ))}
    //     </div>
    // 
    //     <div
    //       ref={loadingRef => (this.loadingRef = loadingRef)}
    //       style={loadingCSS}
    //     >
    //       <span style={loadingTextCSS}>Loading...</span>
    //     </div>
    //   </div>
    
      
    );

  }
}
export default ScrollComponent;
