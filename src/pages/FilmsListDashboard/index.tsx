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

const FilmsListDashboard: React.FC = () => {
  const [filmList, setFilmList] = useState<IFilm[]>([]);
  const [searchWord, setSearchWord] = useState('');

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
        });
    }, 400);
    return () => clearTimeout(timeOutId);
  }, [searchWord]);

  return (

    <Container>
      <SearchHeader>
        <input onChange={(e) => setSearchWord(e.target.value)} type="text" name="search-box" placeholder="Search by title or description..." />
      </SearchHeader>

      {filmList.map((film) => (
        <FilmCard
          key={film.episode_id}
          film={film}
        />
      ))}

    </Container>

  );
};

export default FilmsListDashboard;
