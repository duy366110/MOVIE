const enviroment =  {
   API: {
    url: 'http://localhost:8080',
    endpoint: {
        genres: '/movie/genres',
        movie_genres: '/movie/discover',
        movie_trailer: '/movie/trailer',
        movie_trending: '/movie/topic',
        movie_search: '/movie/search',
    }
   },
   image: {
    card: 'https://image.tmdb.org/t/p/w500/'
   },
   authorization: {
    token: '8qlOkxz4wq'
   }
}

export default enviroment;