import React, { ChangeEvent, useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import api from '../../services/api';
import { Container, SearchHeader } from './styles';

interface IFilm {
    characters: string;
    created: Date;
    director: string;
    edited: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: Date;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];

}

const FilmsListDashboard: React.FC = () => {
  const [movieList, setMovieList] = useState<IFilm[]>([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      api.get('./films')
        .then((response) => {
          const allMovies :IFilm[] = response.data.results;

          if (searchWord === '') {
            setMovieList(allMovies);
          } else {
            const moviesByDescription = allMovies
              .filter((movie) => movie.opening_crawl.toLocaleLowerCase()
                .includes(searchWord.toLocaleLowerCase()));

            const moviesByTitle = allMovies
              .filter((movie) => movie.title.toLocaleLowerCase()
                .includes(searchWord.toLocaleLowerCase()));

            const existingMoviesUrls = moviesByTitle.map((movie) => movie.url);

            const moviesCombined = [
              ...moviesByTitle,
              ...moviesByDescription.filter(({ url }) => !existingMoviesUrls.includes(url)),
            ];

            setMovieList(moviesCombined);
          }
        });
    }, 400);
    return () => clearTimeout(timeOutId);
  }, [searchWord]);

  return (
    <>

      <Container>
        <SearchHeader>
          <input onChange={(e) => setSearchWord(e.target.value)} type="text" name="search-box" placeholder="Search by title or description..." />
        </SearchHeader>

        {movieList.map((movie) => (
          <MovieCard
            key={movie.episode_id}
            film={movie}
          />
        ))}

      </Container>
    </>
  );
};

export default FilmsListDashboard;
