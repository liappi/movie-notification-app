import React, { Component } from "react";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch("/movies")
      .then(res => res.json())
      .then(
        result => {
          this.setState({ movies: result });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  
  selectMovies(movie) {
    fetch("/movie/" + movie)
      .then(res => res.json())
      .then(
        result => {
          this.setState({ movie: result });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getMoviesList() {
    return this.state.movies.map(movie => {
      return (
        <a href="#" className="list-group-item" onClick={() =>this.props.selectMovies(movie.Name)} key={movie.Name}>
          <h4 className="list-group-item-heading">{movie.Name}</h4>
          <p className="list-group-item-text">{movie.ReleaseDate}</p>
        </a>
      );
    });
  }

  render() {
    return <div className="list-group">{this.getMoviesList()}</div>;
  }
}

export default MovieList;
