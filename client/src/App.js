import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from './MovieList';
import Movie from './Movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectMovies = this.selectMovies.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.state = {
      movie: null 
    };
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

  sendEmail() {
    fetch('/email')
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <button type="button" className="btn btn-primary" onClick={() =>this.sendEmail()}>Request an email!</button>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 ">
              <MovieList selectMovies={this.selectMovies} />
            </div>

            <div className="col-md-6">
              <Movie movie={this.state.movie} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
