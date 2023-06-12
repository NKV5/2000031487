import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleTrain = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`API_ENDPOINT/${trainId}`);
        const trainData = response.data;

        setTrain(trainData);
      } catch (error) {
        console.log('Error fetching train data:', error);
      }
    };

    fetchTrain();
  }, [trainId]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{train.name}</h1>
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
  );
};

export default SingleTrain;
