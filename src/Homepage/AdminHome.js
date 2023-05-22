import React, {useEffect, useState} from 'react';

const AdminHome = () => {
    const [trainId, setTrainId] = useState('');
    const [fareId, setFareId] = useState('');
    const [trains, setTrains] = useState([]);
    const [trips, setTrips] = useState([]);
    const [fares, setFares] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [seats, setSeats] = useState(0);
    const [trainIds, setTrainIds] = useState([]);
    const [tripIds, setTripIds] = useState([]);

    const [trainName, setTrainName] = useState('');
    const [trainCapacity, setTrainCapacity] = useState('');
    const [tripStartStation, setTripStartStation] = useState('');
    const [tripEndStation, setTripEndStation] = useState('');
    const [tripTime, setTripTime] = useState('');
    const [tripId, setTripId] = useState('');

    useEffect(() => {
        const url = new URL('http://localhost:3000/trips/all');
        url.searchParams.append('startStationId', '0');
        url.searchParams.append('endStationId', '0');
        url.searchParams.append('time', '0');
        url.searchParams.append('status', '0');

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTrips(data); // Update the trips state with the received data
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    }, []);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await fetch('http://localhost:3000/trains');
                const data = await response.json();
                setTrains(data);
            } catch (error) {
                console.error('Error:', error);
                // Handle the error scenario
            }
        };

        fetchTrains();
    }, []);


    useEffect(() => {
        const fetchFares = async () => {
            try {
                const response = await fetch('http://localhost:3000/fares/all');
                const data = await response.json();
                setFares(data);
            } catch (error) {
                console.error('Error:', error);
                // Handle the error scenario
            }
        };

        fetchFares();
    }, []);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch('http://localhost:3000/workers/all');
                const data = await response.json();
                setWorkers(data);
            } catch (error) {
                console.error('Error:', error);
                // Handle the error scenario
            }
        };

        fetchWorkers();
    }, []);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await fetch('http://localhost:3000/trains');
                const data = await response.json();
                setTrains(data);

                // Extract the train IDs and sort them in ascending order
                const sortedTrainIds = data.map((train) => train.TRAIN_ID).sort((a, b) => a - b);
                setTrainIds(sortedTrainIds);
            } catch (error) {
                console.error('Error:', error);
                // Handle the error scenario
            }
        };

        fetchTrains();
    }, []);

    useEffect(() => {
        const url = new URL('http://localhost:3000/trips/all');
        url.searchParams.append('startStationId', '0');
        url.searchParams.append('endStationId', '0');
        url.searchParams.append('time', '0');
        url.searchParams.append('status', '0');

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTrips(data); // Update the trips state with the received data

                // Extract the trip IDs and sort them in ascending order
                const sortedTripIds = data.map((trip) => trip.TRIP_ID).sort((a, b) => a - b);
                setTripIds(sortedTripIds);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    }, []);


    const handleAddTrain = () => {
        // Logic to add a train
        // Send a request to the backend to add a train with trainName, trainDetails, and trainCapacity
        // Update the UI accordingly

        // Create a payload object with the train details
        const trainData = {
            trainName: trainName,
            capacity: trainCapacity,
        };

        fetch('http://localhost:3000/trains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the UI accordingly
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };

    const handleUpdateTrain = () => {
        // Create a payload object with the updated train details
        const trainData = {
            trainName: trainName,
            capacity: trainCapacity,
        };

        fetch(`http://localhost:3000/updatetrains/${trainId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the UI accordingly
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };

    const handleAddTrip = () => {

        // Create a payload object with the trip details
        const tripData = {
            trainId: trainId,
            fareId: fareId,
            seats: seats,
            time: tripTime,
            status: 'Scheduled',
            startStation: tripStartStation,
            endStation: tripEndStation
        };

        fetch('http://localhost:3000/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the UI accordingly
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };


    const handleUpdateTrip = () => {
        // Create a payload object with the updated trip details
        const tripData = {
            trainId: trainId,
            fareId: fareId,
            seats: seats,
            time: tripTime,
            status: 'Scheduled',
            startStation: tripStartStation,
            endStation: tripEndStation
        };

        fetch(`http://localhost:3000/trips/${tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the UI accordingly
                // For example, you can fetch the updated trips data to reflect the changes
                fetch('http://localhost:3000/trips/all')
                    .then((response) => response.json())
                    .then((data) => {
                        setTrips(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        // Handle the error scenario
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };


    return (
        <div>
            <h3>Welcome, Admin</h3>
            <div className="addTrain">
                <h4>Add a Train</h4>
                <label>
                    Train Name:
                    <input
                        type="text"
                        value={trainName}
                        onChange={(e) => setTrainName(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Train Capacity:
                    <input
                        type="text"
                        value={trainCapacity}
                        onChange={(e) => setTrainCapacity(e.target.value)}
                    />
                </label>
                <br/>
                <button onClick={handleAddTrain}>Add Train</button>

            </div>

            <div className="editTrain">
                <h4>Edit Train Details</h4>
                <label>
                    Train ID:
                    <select value={trainId} onChange={(e) => setTrainId(e.target.value)}>
                        {trainIds.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Train Name:
                    <input
                        type="text"
                        value={trainName}
                        onChange={(e) => setTrainName(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Train Capacity:
                    <input
                        type="text"
                        value={trainCapacity}
                        onChange={(e) => setTrainCapacity(e.target.value)}
                    />
                </label>
                <br/>
                <button onClick={handleUpdateTrain}>Update Train</button>
            </div>

            <div className='addTrip'>
                <h4>Add a Trip</h4>
                <label>
                    Train ID:
                    <input
                        type="text"
                        value={trainId}
                        onChange={(e) => setTrainId(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Fare ID:
                    <input
                        type="text"
                        value={fareId}
                        onChange={(e) => setFareId(e.target.value)}
                    />
                </label>
                <label>
                    Seats:
                    <input
                        type="text"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                    />
                </label>
                <br/>
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
                <br/>
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
                <br/>
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
                <br/>
                <button onClick={handleAddTrip}>Add Trip</button>
            </div>

            <div className="editTrip">
                <h4>Edit Trip Details</h4>
                <label>
                    Trip ID:
                    <select value={tripId} onChange={(e) => setTripId(e.target.value)}>
                        {tripIds.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Train ID:
                    <select value={trainId} onChange={(e) => setTrainId(e.target.value)}>
                        {trainIds.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Fare ID:
                    <input
                        type="text"
                        value={fareId}
                        onChange={(e) => setFareId(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Seats:
                    <input
                        type="text"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                    />
                </label>
                <br/>
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
                <br/>
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
                <br/>
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
                <br/>
                <button onClick={handleUpdateTrip}>Update Trip</button>
            </div>


            <h4>All Trips</h4>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.TRIP_ID + trip.START_STATION_ID + Math.random()}>
                        Trip ID: {trip.TRIP_ID}, Start Station: {trip.START_STATION_ID}, End
                        Station: {trip.END_STATION_ID}
                        , Time: {trip.TIME}
                    </li>
                ))}
            </ul>
            <h4>All Trains</h4>
            <ul>
                {trains.map((train) => (
                    <li key={train.TRAIN_ID}>
                        Train ID: {train.TRAIN_ID}, Train Name: {train.TRAIN_NAME}, CAPACITY:{' '}
                        {train.CAPACITY}
                    </li>
                ))}
            </ul>
            <h4>All Fares</h4>
            <ul>
                {fares.map((fare) => (
                    <li key={fare.FARE_ID + fare.AMOUNT + Math.random()}>
                        Fare ID: {fare.FARE_ID}, Amount: {fare.AMOUNT}
                    </li>
                ))}

            </ul>
            <h4>All Workers</h4>
            <ul>
                {workers.map((worker) => (
                    <li key={worker.WORKER_ID}>
                        Worker ID: {worker.WORKER_ID}, Name: {worker.WORKER_NAME}, Phone Number: {worker.PHONE_NUMBER}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AdminHome;
