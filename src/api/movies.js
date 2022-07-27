import axios from "./axios.api";

export const getMovies = (params) => axios.get("movies", { params });

export const getMoviesSessions = (params) =>
  axios.get("movieShows", { params });

export const getSessionPlaces = (params) => axios.get("showPlaces", { params });

export const postBookedPlace = (params) => axios.post("bookPlace", params);
