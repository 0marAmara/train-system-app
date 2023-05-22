import React, { useState } from 'react';

const AdminHome = () => {
    const [trainId, setTrainId] = useState('');
    const [fareId, setFareId] = useState('');
    const [trains, setTrains] = useState([]);
    const [trips, setTrips] = useState([]);
    const [fares, setFares] = useState([]);
    const [workers, setWorkers] = useState([]);

    const [trainName, setTrainName] = useState('');
    const [trainDetails, setTrainDetails] = useState('');
    const [trainCapacity, setTrainCapacity] = useState('');
    const [tripStartStation, setTripStartStation] = useState('');
    const [tripEndStation, setTripEndStation] = useState('');
    const [tripTime, setTripTime] = useState('');
    const [tripId, setTripId] = useState('');

    const handleAddTrain = () => {
        // Logic to add a train
        // Send a request to the backend to add a train with trainName, trainDetails, and trainCapacity
        // Update the UI accordingly
        console.log('Adding a train:', trainName, trainDetails, trainCapacity);
    };

    const handleUpdateTrain = () => {
        // Logic to update a train
        // Send a request to the backend to update the train details
        // Update the UI accordingly
        console.log('Updating train details:', trainName, trainDetails, trainCapacity);
    };

    const handleAddTrip = () => {
        // Logic to add a trip
        // Send a request to the backend to add a trip with tripStartStation, tripEndStation, and tripTime
        // Update the UI accordingly
        console.log('Adding a trip:', tripStartStation, tripEndStation, tripTime);
    };

    const handleUpdateTrip = () => {
        // Logic to update a trip
        // Send a request to the backend to update the trip details
        // Update the UI accordingly
        console.log('Updating trip details:', tripId, tripStartStation, tripEndStation, tripTime);
    };

    return (
        <div>
            <h3>Welcome, Admin</h3>

            <h4>Add a Train</h4>
            <label>
                Train Name:
                <input
                    type="text"
                    value={trainName}
                    onChange={(e) => setTrainName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Train Capacity:
                <input
                    type="text"
                    value={trainCapacity}
                    onChange={(e) => setTrainCapacity(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleAddTrain}>Add Train</button>

            <h4>Update Train Details</h4>
            <label>
                Train ID:
                <input
                    type="text"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Train Name:
                <input
                    type="text"
                    value={trainName}
                    onChange={(e) => setTrainName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Train Capacity:
                <input
                    type="text"
                    value={trainCapacity}
                    onChange={(e) => setTrainCapacity(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleUpdateTrain}>Update Train Details</button>

            <h4>Add a Trip</h4>
            <label>
                Train ID:
                <input
                    type="text"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Fare ID:
                <input
                    type="text"
                    value={fareId}
                    onChange={(e) => setFareId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Start Station:
                <select
                    value={tripStartStation}
                    onChange={(e) => setTripStartStation(e.target.value)}
                >
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </label>
            <br />
            <label>
                End Station:
                <select
                    value={tripEndStation}
                    onChange={(e) => setTripEndStation(e.target.value)}
                >
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </label>
            <br />
            <label>
                Trip Time:
                <select
                    value={tripTime}
                    onChange={(e) => setTripTime(e.target.value)}
                >
                    <option value="09:00:00">9:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                    <option value="12:45:00">12:45 PM</option>
                </select>
            </label>
            <br />
            <button onClick={handleAddTrip}>Add Trip</button>

            <h4>Edit Trip Details</h4>
            <label>
                Trip ID:
                <input type="text" value={tripId} onChange={(e) => setTripId(e.target.value)} />
            </label>
            <br />
            <label>
                Start Station:
                {/* ... */}
            </label>
            <br />
            <label>
                End Station:
                {/* ... */}
            </label>
            <br />
            <label>
                Trip Time:
                {/* ... */}
            </label>
            <br />
            <button onClick={handleUpdateTrip}>Update Trip Details</button>


            <h4>All Trips</h4>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        Trip ID: {trip.id}, Start Station: {trip.startStation}, End Station:{' '}
                        {trip.endStation}, Time: {trip.time}
                    </li>
                ))}
            </ul>

            <h4>All Fares</h4>
            <ul>
                {fares.map((fare) => (
                    <li key={fare.id}>
                        Fare ID: {fare.id}, Fare Name: {fare.name}, Price: {fare.price}
                    </li>
                ))}
            </ul>

            <h4>All Workers</h4>
            <ul>
                {workers.map((worker) => (
                    <li key={worker.id}>
                        Worker ID: {worker.id}, Name: {worker.name}, Position: {worker.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHome;
