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
    api.get('./films')
      .then((response) => {
        setMovieList(response.data.results);
        // console.log(response.data.results);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    api.get(`./films/?search=${searchWord}`)
      .then((response) => {
        setMovieList(response.data.results);
      });
  }, [searchWord]);
  return (
    <>

      <Container>
        <SearchHeader>
          <input onChange={handleChange} type="text" name="search-box" placeholder="Search by title or description..." />
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
