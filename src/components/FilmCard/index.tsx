/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, TextContent } from './styles';

interface IFilmCardProps{
  film: IFilm;
}

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

const FilmCard: React.FC<IFilmCardProps> = ({
  film,
}) => (
  <Container>
    <TextContent>
      <Link to={{ pathname: 'film-detail/', state: film }}> <h3>{film.title}</h3></Link>
      <p> {film.opening_crawl}</p>
      <p>Release Date: {film.release_date}</p>
    </TextContent>
  </Container>

);

export default FilmCard;
