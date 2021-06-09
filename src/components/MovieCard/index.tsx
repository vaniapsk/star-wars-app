/* eslint-disable camelcase */
import React from 'react';
import Button from '../Button';
import { Container, TextContent } from './styles';

interface MovieCardProps{
  title: string;
  director: string;
  release_date: Date;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, director, release_date }) => (
  <Container>
    <TextContent>
      <h3>{title}</h3>
      <p>Director: {director}</p>
      <p>Release Date: {release_date}</p>
    </TextContent>
    <Button>Movie Details</Button>
  </Container>
);

export default MovieCard;
