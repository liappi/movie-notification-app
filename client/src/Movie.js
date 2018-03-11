import React, { Component } from "react";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }
  getRating() {
    var ratings = "";
   for (var i = 0; i < this.props.movie.Ratings.length; i++) {
    ratings += `${this.props.movie.Ratings[i].Source}: ${this.props.movie.Ratings[i].Value} `;
   } 
   return ratings;
  }

  getMovie() {
    if (!this.props.movie) return null;
    var ratings = this.getRating();
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{this.props.movie.Title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.movie.Year}</h6>
          <p className="card-text">{this.props.movie.Plot}</p>
          <p className="card-text">{ratings}</p>
          <button type="button" className="btn btn-primary btn-sm">Add to Favourites</button>
        </div>
      </div>
    )


  }
  render() {
    return this.getMovie();
  }
}
export default Movie
