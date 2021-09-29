import axios from 'axios';

// URL FILMES EM CARTAZ:
// movie/now_playing &language=pt-BR&page=1

export const key = 'c36d3f5e454396853cabaad6ee3b8496'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;