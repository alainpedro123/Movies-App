import React from 'react';
import Joi from 'joi-browser';
import Form from "../components/Form/Form";
import { genres, movies } from '../API/moviesService';

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daoly Rental Rate')
    };

    getMovie(id) {
        return movies.find(m => m._id === id);
    }

    componentDidMount() {
        const getGenres = genres;
        this.setState({ genres: getGenres });

        const movieId = this.props.match.params.id; //reading the id in the route
        if (movieId === "new");
        return;
    }

    // this method gets a movie object that we get from the server, and maps it to a different kind of movie that we can use in this form
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    saveMovie(movie) {
        let movieInDb = movies.find(m => m._id === movie._id) || {};
        movieInDb.title = movie.title;
        movieInDb.genre = genres.find(g => g._id === movie.genreId);
        movieInDb.numberInStock = movie.numberInStock;
        movieInDb.dailyRentalRate = movie.dailyRentalRate;

        if (!movieInDb._id) {
            movieInDb._id = Date.now().toString();
            movies.push(movieInDb);
        }
        return movieInDb;
    }

    doSubmit = () => {
        this.saveMovie(this.state.data);
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;