/**
* @jsx React.DOM
*/

// MVP
// DONE: User can add movies to list with: NAME, IMAGE, SCORE
// TODO: User can view added movies in table in order of their SCORE
// TODO: User can upvote or downvote movies to change their SCORE

const App = React.createClass({
  getInitialState () {
    return {
      movies: [],
      currentlyEditing: {}
    }
  },

  saveEntry (movie) {
    const { movies, currentlyEditing } = this.state;

    let current = [];
    current = movies.filter(movie => movie.id === currentlyEditing.id)

    let update = [];

    if (current.length === 0) {
      update = [...movies, movie]
    } else {
      update = movies.map((item) => {
        if (movie.id === item.id) {
          return movie
        } else {
          return item
        }
      })
    }

    this.setState({
      movies: update,
      currentlyEditing: {}
    })
  },

  changeRating (id) {
    const { movies, movie, currentlyEditing } = this.state;

    let current = movies.filter(movie => movie.id === id)

    let newRating;

    if (target.value = 'voteUp') {
      newRating = (parseInt(currentlyEditing.rating)+1).toString()
    } else if (target.value = 'voteDown') {
      newRating = (parseInt(currentlyEditing.rating)-1).toString()
    }

    let ratingChange = {}

    ratingChange = {
      id: currentlyEditing.id,
      poster: currentlyEditing.poster,
      title: currentlyEditing.title,
      rating: newRating
    }

    this.saveEntry(ratingchange)

    this.setState({
      currentlyEditing: current[0]
    })
  },

  deleteEntry (id) {
    const { movies, movie } = this.state;

    let remainingMovies = movies.filter(movie => movie.id !== id);

    this.setState({
      movies: remainingMovies
    })
  },

  render () {
    return (
      <div className="container">
        <div className="row">
          <h1>Movie Rating App</h1>
        </div>
        <div className="row">
          <EntryForm currentlyEditing={this.state.currentlyEditing} saveEntry={this.saveEntry} changeRating={this.changeRating}/>
        </div>
        <div className="row">
          <MovieDetails movies={this.state.movies} currentlyEditing={this.state.currentlyEditing} changeRating={this.changeRating} deleteEntry={this.deleteEntry}/>
        </div>
      </div>
    )
  }
})

const MovieDetails = props => {
  const { movie, movies, changeRating, deleteEntry } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="entryPoster">Poster</th>
          <th>Title</th>
          <th>Rating</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie =>(
          <tr key={movie.id} id={movie.id} className="entryID">
            <td className="entryPoster"><img src={movie.poster} alt={movie.title}/></td>
            <td className="entryTitle">{movie.title}</td>
            <td className="entryRating"><button value="voteUp" className="btn btn-warning" onChange={changeRating.bind(null, movie.id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button> {movie.rating} <button value="voteDown" className="btn btn-warning" onChange={changeRating.bind(null, movie.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></td>
            <td className="entryDelete"><button onClick={deleteEntry.bind(null, movie.id)} className="btn btn-sm btn-danger"><i className="fa fa-minus-square" aria-hidden="true"></i></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const EntryForm = React.createClass({
  getInitialState () {
    return {
      toUpdateWith: {
        poster: "",
        title: "",
        rating: '0'
      }
    }
  },

  submitForm (e) {
    e.preventDefault()

    const { toUpdateWith } = this.state;
    const { currentlyEditing, saveEntry } = this.props;

    let movie = [];

    if (!currentlyEditing.id) {
      let newID = uuid();

      movie = {
        id: newID,
        poster: toUpdateWith.poster,
        title: toUpdateWith.title,
        rating: toUpdateWith.rating
      }
    } else {
      movie = {
        id: currentlyEditing.id,
        poster: toUpdateWith.poster,
        title: toUpdateWith.title,
        rating: toUpdateWith.rating
      }
    }

    saveEntry(movie)
    this.clearForm()
  },

  updateForm (e) {
    const { toUpdateWith } = this.state;
    const { currentlyEditing } = this.props;

    e.stopPropagation()

    let key = e.target.name;
    let value = e.target.value;
    toUpdateWith[key] = value;

    let toUpdate = Object.assign({}, this.props.currentlyEditing, toUpdateWith);

    this.setState({
      toUpdateWith: toUpdate
    });
  },

  clearForm () {
    const { toUpdateWith } = this.state;
    const { currentlyEditing } = this.props;

    this.setState({
      toUpdateWith: {
        poster: "",
        title: "",
        rating: '0'
      }
    })
  },

  render () {
    const { title, poster, rating } = this.state.toUpdateWith;

    return (
      <form id="movieForm" className="col-sm-12">

        <div className="form-group row">
          <label htmlFor="movieTitle" className="col-sm-2 col-form-label col-form-label-lg">Movie Title</label>
          <div className="col-sm-10">
            <input type="text" ref="title" value={title} name="title" onChange={this.updateForm} className="form-control form-control-lg" placeholder="Big Name Film" id="titleForm"/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="moviePoster" className="col-sm-2 col-form-label col-form-label-lg">Poster URL</label>
          <div className="col-sm-10">
            <input type="url" ref="poster" value={poster} name="poster" onChange={this.updateForm} className="form-control form-control-lg" placeholder="www.movieposters.com/poster" id="posterForm"/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="movieRating" className="col-sm-2 col-form-label col-form-label-lg">Rating</label>
          <div className="col-sm-10">
            <input type="number" ref="rating" value={rating} name="rating" onChange={this.updateForm} className="form-control form-control-lg" placeholder="0" min="0" step="1" id="ratingForm"/>
          </div>
        </div>

        <div className="formButtons">
          <button type="button" onClick={this.clearForm} className="btn btn-default">clear</button>
          <button type="button" onClick={this.submitForm} className="btn btn-success">submit</button>
        </div>

      </form>
    )
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
