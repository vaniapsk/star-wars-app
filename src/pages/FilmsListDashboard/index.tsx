import { AxiosError } from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import FilmCard from '../../components/FilmCard';
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

interface IError{
  ErrorTitle: string;
  ErrorCodeStatus: number;
  ErrorMessage: string;
}

const FilmsListDashboard: React.FC = () => {
  const [filmList, setFilmList] = useState<IFilm[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [appError, setAppError] = useState<IError>();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      // could also have done api.get(`./films/?search?${searchWord}`)
      api.get('./films')
        .then((response) => {
          const allFIlms :IFilm[] = response.data.results;

          if (searchWord === '') {
            setFilmList(allFIlms);
          } else {
            const filmsByDescription = allFIlms
              .filter((film) => film.opening_crawl.toLocaleLowerCase()
                .includes(searchWord.toLocaleLowerCase()));

            const filmsByTitle = allFIlms
              .filter((film) => film.title.toLocaleLowerCase()
                .includes(searchWord.toLocaleLowerCase()));

            const existingFilmsUrls = filmsByTitle.map((film) => film.url);

            const combinedFilms = [
              ...filmsByTitle,
              ...filmsByDescription.filter(({ url }) => !existingFilmsUrls.includes(url)),
            ];

            setFilmList(combinedFilms);
          }
        })
        .catch((err: AxiosError) => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            setAppError({
              ErrorTitle: err.message,
              ErrorCodeStatus: err.response.status,
              ErrorMessage: err.message,
            });
          } else if (err.request) {
            // client never received a response, or request never left
            setAppError({
              ErrorTitle: err.message,
              ErrorCodeStatus: err.request.status,
              ErrorMessage: 'This site can not be reached. Try checking the connection',
            });
          } else {
            // anything else
            setAppError({
              ErrorTitle: err.name,
              ErrorCodeStatus: 0,
              ErrorMessage: err.message,
            });
          }
        });
    }, 400);
    return () => clearTimeout(timeOutId);
  }, [searchWord]);

  return (

    <Container>
      <SearchHeader>
        <input onChange={(e) => setSearchWord(e.target.value)} type="text" name="search-box" placeholder="Search by title or description..." />
      </SearchHeader>

      {!appError && (
        filmList.map((film) => (
          <FilmCard
            key={film.episode_id}
            film={film}
          />
        ))
      )}

      { appError && (
        <div>
          <h2>{appError.ErrorTitle}</h2>
          <p>Error code: {appError.ErrorCodeStatus.toString()}</p>
          <p>{appError.ErrorMessage}</p>
        </div>

      )}

    </Container>

  );
};

export default FilmsListDashboard;
