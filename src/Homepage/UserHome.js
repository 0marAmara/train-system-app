import React, { useEffect, useState } from 'react';

const UserHome = ({ userId, username }) => {
    const [bookedTrains, setBookedTrains] = useState([]);
    const [showBookedTrains, setShowBookedTrains] = useState(false);

    useEffect(() => {
        // Fetch booked trains for the user
        fetch(`http://localhost:3000/trains/booked?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data,123123);
                setBookedTrains(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [userId]);

    const handleShowBookedTrains = () => {
        setShowBookedTrains(!showBookedTrains);
    };

    const handleCancelBooking = (tripId) => {


        fetch(`http://localhost:3000/trips/${tripId}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error cancelling trip booking:', data.error);
                    // Handle error case (e.g., show an error message)
                    return;
                }

                console.log('Trip booking cancelled:', data);
                // Update the bookedTrains state to reflect the changes
                setBookedTrains((prevBookedTrains) =>
                    prevBookedTrains.filter((booking) => booking.TRAIN_ID !== tripId)
                );
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error case (e.g., show an error message)
            });
    };



    const handleBookTrip = () => {
        // Implement the logic for booking a trip
        console.log('Booking a trip');
    };

    return (
        <div>
            <h3>Hello, {username}</h3>
            <button onClick={handleShowBookedTrains}>
                {showBookedTrains ? 'Hide Booked Trains' : 'Show Booked Trains'}
            </button>
            <button onClick={handleBookTrip}>Book a Trip</button>
            {showBookedTrains && (
                <div>
                    <h2>Booked Trains</h2>
                    {bookedTrains.length > 0 ? (
                        <ul>
                            {bookedTrains.map((booking) => (
                                <li key={booking.TRAIN_ID}>
                                    <strong>Train Name:</strong> {booking.TRAIN_NAME}, <strong>Status:</strong> {booking.STATUS}, <strong>Time:</strong> {booking.TIME}
                                    <button onClick={() => handleCancelBooking(booking.TRAIN_ID)}>Cancel Trip</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No booked trains.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserHome;
