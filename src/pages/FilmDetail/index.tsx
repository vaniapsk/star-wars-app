import React, { useState } from 'react';
import Button from '../../components/Button';

import ModalShowVehicle from '../../components/ModelShowVehicles';

interface IProps {
    location:{
      state:{
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

  }
}

const FilmDedail: React.FC<IProps> = ({ location }) => {
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);

  function toggleShowVehicle(): void {
    setVehicleModalOpen(!vehicleModalOpen);
  }

  const film = location.state;
  // console.log(film);
  return (
    <>
      <ModalShowVehicle
        isOpen={vehicleModalOpen}
        setIsOpen={toggleShowVehicle}
        vehicleUrls={film.vehicles}
      />
      <div>
        <p> Title: <strong>{film.title}</strong></p>
        <p> Director: {film.director}</p>
        <p> Characters: {film.characters.length}</p>
        <p> Director: {film.director}</p>
        <p> Opening craw: {film.opening_crawl}</p>
        <p> Create Date: {film.created}</p>
        <p> Edited: {film.edited}</p>
        <p> Episode Id: {film.episode_id}</p>
        <p> Planets: {film.planets.length}</p>
        <p> Producer: {film.producer}</p>
        <p> Release Date: {film.release_date}</p>
        <p> Species: {film.species.length}</p>
        <p> Starships: {film.starships.length}</p>
        <p> Species: {film.species.length}</p>
        <p> Vehicles:
          <Button onClick={() => toggleShowVehicle()}> {film.vehicles.length}</Button>
        </p>
      </div>
    </>
  );
};

export default FilmDedail;
