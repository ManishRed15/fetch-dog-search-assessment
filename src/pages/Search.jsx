import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css"; // Import CSS file

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [matchedDog, setMatchedDog] = useState(null); // State for matched dog

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          { withCredentials: true }
        );
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const fetchDogs = async () => {
    try {
      const searchResponse = await axios.get(
        `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}&size=10&from=${currentPage * 10}`,
        { withCredentials: true }
      );

      const dogIds = searchResponse.data.resultIds;

      if (dogIds.length === 0) {
        setDogs([]);
        return;
      }

      const detailsResponse = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        dogIds,
        { withCredentials: true }
      );

      setDogs(detailsResponse.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed, currentPage]);

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
    setCurrentPage(0);
  };

  const handleFavorite = (dogId) => {
    if (favorites.includes(dogId)) {
      setFavorites(favorites.filter((id) => id !== dogId));
    } else {
      setFavorites([...favorites, dogId]);
    }
  };

  // Handle finding a match from favorited dogs
  const handleMatch = async () => {
    if (favorites.length === 0) {
      alert("Please add some dogs to your favorites first!");
      return;
    }

    try {
      const matchResponse = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favorites,
        { withCredentials: true }
      );

      const matchedDogId = matchResponse.data.match;

      const detailsResponse = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        [matchedDogId],
        { withCredentials: true }
      );

      setMatchedDog(detailsResponse.data[0]);
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search for Dogs</h2>

      {/* Breed Filter Dropdown */}
      <select onChange={handleBreedChange} value={selectedBreed}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* Dog List */}
      <div className="dog-list">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img src={dog.img} alt={dog.name} className="dog-image" />
            <h3>{dog.name}</h3>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Age:</strong> {dog.age} years</p>
            <p><strong>Location:</strong> {dog.zip_code}</p>
            <button
              onClick={() => handleFavorite(dog.id)}
              className={favorites.includes(dog.id) ? "favorited" : ""}
            >
              {favorites.includes(dog.id) ? "💖 Favorited" : "❤️ Favorite"}
            </button>
          </div>
        ))}
      </div>

      {/* Favorite Dogs Section */}
      {favorites.length > 0 && (
        <div className="favorites-container">
          <h3>Favorite Dogs</h3>
          <div className="dog-list">
            {favorites.map((dogId) => {
              const dog = dogs.find((d) => d.id === dogId);
              return dog ? (
                <div key={dog.id} className="dog-card">
                  <img src={dog.img} alt={dog.name} className="dog-image" />
                  <h3>{dog.name}</h3>
                  <p><strong>Breed:</strong> {dog.breed}</p>
                  <p><strong>Age:</strong> {dog.age} years</p>
                  <p><strong>Location:</strong> {dog.zip_code}</p>
                  <button onClick={() => handleFavorite(dog.id)}>❌ Remove</button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Find My Match Button */}
      {favorites.length > 0 && (
        <button className="match-button" onClick={handleMatch}>
          🐶 Find My Match
        </button>
      )}

      {/* Matched Dog Display */}
      {matchedDog && (
        <div className="matched-dog">
          <h3>🎉 Your Matched Dog! 🎉</h3>
          <img src={matchedDog.img} alt={matchedDog.name} className="dog-image" />
          <h3>{matchedDog.name}</h3>
          <p><strong>Breed:</strong> {matchedDog.breed}</p>
          <p><strong>Age:</strong> {matchedDog.age} years</p>
          <p><strong>Location:</strong> {matchedDog.zip_code}</p>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Search;
