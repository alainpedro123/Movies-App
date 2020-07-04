import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListGroup from "../components/ListGroup/ListGroup";
import Pagination from "../components/Pagination-Paginate/Pagination";
import MoviesTable from "../components/MovieTable/MoviesTable";
import SearchBox from "../components/SearchBox/SearchBox";
import { movies, genres } from "../API/moviesService";
import { paginate } from "../components/Pagination-Paginate/paginate";
import _ from "lodash";

class MoviesApp extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const getGenres = [{ _id: "", name: "All Genres" }, ...genres];
    this.setState({ movies: movies, genres: getGenres });
  }

  handleDelete = movieToDelete => {
    const movies = this.state.movies.filter(
      allMovies => allMovies._id !== movieToDelete._id
    );
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; // cloning the object a put it into the array
    movies[index].liked = !movies[index].liked; // starting with an empty heart
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // 1) filter, sort and data paginate
    else if (selectedGenre && selectedGenre._id)
      // if two are both truthy, so do as below
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no Movies!</p>;

    const { totalCount, data: movies } = this.getPagedData(); // all the methods for applying filtering, sorting and pagination is encapsulated in this method.

    return (
      <div className="row movies-app">
        <div className="col">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col col-lg-8">
          <Link to="/movies/new" className="btn btn-primary new-movie">
            New Movie
          </Link>

          <p>Showing {count} movies in the database</p>
          <h2>Movies</h2>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MoviesApp;