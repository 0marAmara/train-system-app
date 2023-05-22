import React, { useEffect, useState } from 'react';

const UserHome = ({ userId, username }) => {
    const [bookedTrains, setBookedTrains] = useState([]);
    const [showBookedTrains, setShowBookedTrains] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const [selectedStartStation, setSelectedStartStation] = useState(0);
    const [selectedEndStation, setSelectedEndStation] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [updatedPage,setUpdatedPage]=useState(false);
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
                setBookedTrains(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [userId,updatedPage]);

    const handleShowBookedTrains = () => {
        setShowBookedTrains(!showBookedTrains);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        if (name === 'startStation') {
            setSelectedStartStation(value);
        } else if (name === 'endStation') {
            setSelectedEndStation(value);
        } else if (name === 'status') {
            setSelectedStatus(value);
        } else if (name === 'time') {
            setSelectedTime(value);
        }
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

                // Update the bookedTrains state to reflect the changes
                setBookedTrains((prevBookedTrains) =>
                    prevBookedTrains.filter((booking) => booking.TRAIN_ID !== tripId)
                );
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error case (e.g., show an error message)
            });
        setUpdatedPage(prevState=>!prevState);
    };

    const handleSearchTrips = () => {
        // Construct the URL with query parameters
        const url = new URL('http://localhost:3000/trips');
        url.searchParams.append('startStationId', selectedStartStation);
        url.searchParams.append('endStationId', selectedEndStation);
        url.searchParams.append('time', selectedTime);
        url.searchParams.append('status', selectedStatus);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error case (e.g., show an error message)
            });
    };

    const handleBookTrip = (tripId) => {
        const bookingData = {
            userId: userId,
            seats: 1, // Assuming booking only one seat, you can modify this as needed
        };

        fetch(`http://localhost:3000/trips/${tripId}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    if (data.error === 'You have already booked this trip') {
                        console.log('You have already booked this trip');
                        // Handle case where the user has already booked the trip
                    } else {
                        console.error('Error booking trip:', data.error);
                        // Handle other error cases (e.g., show an error message)
                    }
                } else {
                    // Handle success case (e.g., show a success message, update booked trips, etc.)
                    // You can add the logic here to update the bookedTrains state or perform any necessary actions.
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error case (e.g., show an error message)
            });
        setUpdatedPage(prevState=>!prevState);

    };

    return (
        <div>
            <h3>Hello, {username}</h3>

            <label>
                Start Station:
                <select name="startStation" value={selectedStartStation} onChange={handleFilterChange}>
                    <option value={0}>All</option>
                    <option value={1}>Cairo Central Station</option>
                    <option value={2}>Alexandria Station</option>
                    <option value={3}>Giza Station</option>
                    <option value={4}>Luxor Station</option>
                    <option value={5}>Aswan Station</option>
                </select>
            </label>

            <label>
                End Station:
                <select name="endStation" value={selectedEndStation} onChange={handleFilterChange}>
                    <option value={0}>All</option>
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </label>

            <label>
                Status:
                <select name="status" value={selectedStatus} onChange={handleFilterChange}>
                    <option value={0}>All</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                </select>
            </label>

            <label>
                Time:
                <select name="time" value={selectedTime} onChange={handleFilterChange}>
                    <option value={0}>Anytime</option>
                    <option value="09:00:00">9:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                    <option value="12:45:00">12:45 PM</option>
                </select>
            </label>

            <button onClick={handleSearchTrips}>Search for Trips</button>

            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((trip) => (
                            <li key={trip.TRIP_ID + Math.random()}>
                                <strong>Train Name:</strong> {trip.TRAIN_NAME}, <strong>Status:</strong> {trip.STATUS},{' '}
                                <strong>Time:</strong> {trip.TIME} <strong>Id:</strong> {trip.TRIP_ID}
                                <button onClick={() => handleBookTrip(trip.TRIP_ID)}>Book Trip</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleShowBookedTrains}>
                {showBookedTrains ? 'Hide Booked Trains' : 'Show Booked Trains'}
            </button>

            {showBookedTrains && (
                <div>
                    <h2>Booked Trains</h2>
                    {bookedTrains.length > 0 ? (
                        <ul>
                            {bookedTrains.map((booking) => (
                                <li key={booking.TRAIN_ID+booking.TIME}>
                                    <strong>Train Name:</strong> {booking.TRAIN_NAME}, <strong>Status:</strong> {booking.STATUS},{' '}
                                    <strong>Time:</strong> {booking.TIME} <strong>ID:</strong> {booking.TRIP_ID}
                                    <button onClick={() => handleCancelBooking(booking.TRIP_ID)}>Cancel Trip</button>
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
