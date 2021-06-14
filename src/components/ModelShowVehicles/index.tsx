import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from '../Modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  vehicleUrls : string[];
}

interface IVehicle {
  cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    created: Date;
    crew: number;
    edited: Date;
    length: number;
    manufacturer: string;
    max_atmosphering_speed:number;
    model: string;
    name: string;
    passengers: number;
    pilots: [],
    films: [],
    url: string;
    vehicle_class: string;
}

const ModalShowVehicle: React.FC<IModalProps> = ({ isOpen, setIsOpen, vehicleUrls }) => {
  const [movieVehicles, setMovieVehicles] = useState<IVehicle[]>([]);

  // Get all info from all movies url and save it in array
  useEffect(() => {
    const vehicles: IVehicle[] = [];
    vehicleUrls.map((vehicleUrl) => (api.get(vehicleUrl)
      .then((response) => {
        vehicles.push(response.data);
      })));

    setMovieVehicles(vehicles);
  }, [vehicleUrls]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Vehicles: {movieVehicles.length}</h1>
      {movieVehicles.map((vehicle) => (
        <div key={vehicle.url}>
          <h2>Name: {vehicle.name}</h2>
          <p>Model: {vehicle.model}</p>
          <p>Cargo capacity: {vehicle.cargo_capacity}</p>
          <p>Consumables: {vehicle.consumables}</p>
          <p>Cost in credits: {vehicle.cost_in_credits}</p>
          <p>created: {vehicle.created}</p>
          <p>Crew: {vehicle.crew}</p>
          <p>Edited: {vehicle.edited}</p>
          <p>Length: {vehicle.length}</p>
          <p>manufacturer: {vehicle.manufacturer}</p>
          <p>Max atmosphering speed: {vehicle.max_atmosphering_speed}</p>
          <p>Passengers: {vehicle.passengers}</p>
          <p>Vehicle class: {vehicle.vehicle_class}</p>

        </div>
      ))}
    </Modal>
  );
};

export default ModalShowVehicle;
