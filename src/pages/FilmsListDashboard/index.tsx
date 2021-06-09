/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import api from '../../services/api';
import { Container } from './styles';

interface Film {
    characters: string;
    created: Date;
    director: string;
    edited: string;
    episode_id: Int16Array;
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
  const [movieList, setMovieList] = useState<Film[]>([]);

  useEffect(() => {
    api.get('./films')
      .then((response) => {
        setMovieList(response.data.results);
      });
  }, []);

  // useEffect(() => {
  //   console.log(movieList[0]);
  // }, [movieList]);

  return (
    <Container>
      {movieList.map((movie) => (
        <MovieCard
          title={movie.title}
          director={movie.director}
          release_date={movie.release_date}
        />

      ))}

    </Container>
  );
};

export default FilmsListDashboard;
