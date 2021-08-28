import http from "../https";

const getAll = () => {
  return http.get("/movies");
};

const get = (id) => {
  return http.get(`/movies/${id}`);
};

const create = (data) => {
  return http.post("/movies", data);
};

const update = (data) => {
  return http.put(`/movies/${data.id}`, data);
};

const remove = (id) => {
  return http.delete(`/movies/${id}`);
};

const removeAll = () => {
  return http.delete(`/movies`);
};

const findByGenres = (name) => {
  return http.get(`/movies/genres?name=${name}`);
};

const movieServices = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByGenres,
};

export default movieServices;
