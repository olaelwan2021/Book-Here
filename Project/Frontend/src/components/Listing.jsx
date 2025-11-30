import { useEffect, useState } from 'react';
import ListingFilters from './small-components/ListingFilters';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Listing() {
  const [listingRooms, setListingRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(20000);
  const [rating, setRating] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [searchedRoom, setSearchedRoom] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchListingRooms = async () => {
      try {
        const response = await api.rooms.getAll();
        setListingRooms(response.data.data);
        setFilteredRooms(response.data.data);  
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchListingRooms();
  }, []);

   
  const amenitiesFilter = (roomAmenities) => {
    if (amenities.length === 0) return true;
    return amenities.every((a) => roomAmenities.includes(a));
  };

  const searchFilter = (roomName) => {
    return roomName.toLowerCase().includes(searchedRoom.toLowerCase());
  };

  const [meals, setMeals] = useState("any")
    function mealsFilter(meal) {
        if(meals == "any" || meals == meal) {
            return true
        }
        return false
    }
 
  useEffect(() => {
    setFilteredRooms(
      listingRooms.filter(
        (room) =>
          room.price >= min &&
          room.price <= max &&
          room.rating >= rating &&
          amenitiesFilter(room.amenities || []) &&
          searchFilter(room.name || '') &&
          mealsFilter(room.meal)
      )
    );
  }, [listingRooms, min, max, rating, meals, amenities, searchedRoom]);

  return (
    <>
   
      <section className="listing-bg d-flex justify-content-center">
        <div className="container text-center text-white">
          <h1 className="fw-bold">Luxury rooms & places to stay</h1>
          <p className="fs-5">
            Search to compare prices and discover great deals with free cancellation
          </p>
          <div className="search-box p-4 rounded">
            <h5 className="text-start text-color-dark fw-bold">Find your room</h5>
            <div className="search-input my-auto p-3 rounded">
              <i className="fa-solid fa-arrow-right-long text-color-dark text-start"></i>
              <input
                className="rounded w-75 h-100 px-2"
                type="text"
                onChange={(e) => setSearchedRoom(e.target.value)}
                placeholder="Search by room name"
              />
            </div>
          </div>
        </div>
      </section>

     
      <section>
        <div className="listing-container container text-bcolor my-4">
          <div>
            <h2 className="fw-bold">Private rooms</h2>
            <p>Showing {filteredRooms.length} rooms</p>
          </div>

          <div className="fl-container d-flex gap-5">
            
            <div className='res-filter-div' style={{width: "17.8rem"}}>
              <ListingFilters
                min={min}
                max={max}
                amenities={amenities}
                setMin={setMin}
                setMax={setMax}
                setRating={setRating}
                setMeals={setMeals}
                setAmenities={setAmenities}
              />
            </div>

            {/* Room Listings */}
            <div>
              {filteredRooms.map((room) => (
                <div className="listing rounded d-flex mb-3" key={room._id}>
                  
                  <div id={`carousel${room._id}`} className="pic carousel slide carousel-fade">
                    <div className="carousel-inner">
                      {(room.images || []).map((img, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                          <img
                            src={`http://localhost:5000/uploads/${img}`}
                            className="pics d-block w-100 rounded-start"
                            alt={room.name}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel${room._id}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel${room._id}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  {/* Room Info */}
                  <div className="listBody ms-2">
                    <div className="price-section d-flex justify-content-between">
                      <div>
                        <h4 className="fw-bold mb-3 mt-2">{room.name}</h4>
                        <div className="listingAmenities d-flex gap-2">
                          {(room.amenities || []).map((a, i) => (
                            <div key={i}>
                              <i className={`fa-solid fa-${a}`}></i>
                            </div>
                          ))}
                        </div>
                        <p className='mt-2'>{room.meal}</p>
                        {/* <p className='w-75'>{room.description}</p> */}
                      </div>
                      <div className="listPrice">
                        <p className="fw-bold fs-5" style={{width: "100px"}}>
                          {room.price} {room.currency}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 d-flex justify-content-between">
                      <div className="d-flex gap-2">
                        <div className="rate rounded text-bcolor">
                          <p>{room.rating}</p>
                        </div>
                        <div>
                          <p className="fw-bold">{room.rate}</p>
                          <p>Capacity ({room.capacity})</p>
                        </div>
                      </div>
                      <div>
                        {
                            room.available ? (
                              <button
                                className="btn btn-main-color"
                                onClick={() => navigate(`/details?id=${room._id}`)}
                                >
                                Book Now
                              </button>
                            ) : (
                                <button className="btn btn-secondary" disabled>
                                    Unavailable
                                </button>
                            )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Listing;
