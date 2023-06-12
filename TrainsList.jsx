import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainsList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('API_ENDPOINT');
        const trainData = response.data;

        const sortedTrains = trainData
          .filter(train => !isDepartingSoon(train))
          .sort((a, b) => {
            if (a.price !== b.price) {
              return a.price - b.price;
            } else if (a.tickets !== b.tickets) {
              return b.tickets - a.tickets;
            } else {
              return b.departureTime - a.departureTime;
            }
          });

        setTrains(sortedTrains);
      } catch (error) {
        console.log('Error fetching train data:', error);
      }
    };

    fetchTrains();
  }, []);

  const isDepartingSoon = train => {
    const currentTime = new Date().getTime();
    const departureTime = new Date(train.departureTime).getTime();
    const timeDifference = departureTime - currentTime;

    return timeDifference < 30 * 60 * 1000; // 30 minutes in milliseconds
  };

  return (
    <div>
      <h1>All Trains</h1>
      {trains.map(train => (
        <div key={train.id}>
          <h2>{train.name}</h2>
          <p>Departure Time: {train.departureTime}</p>
          <p>Seat Availability:</p>
          <ul>
            {train.seatsAvailability.map(seat => (
              <li key={seat.type}>
                {seat.type}: {seat.availableSeats} seats
              </li>
            ))}
          </ul>
          <p>Prices:</p>
          <ul>
            {train.prices.map(price => (
              <li key={price.type}>
                {price.type}: {price.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TrainsList;
