import { useEffect, useState } from 'react'
import pic1 from '../assets/rooms/room_1/47a49b150e82ba3e3ac89be8130132125b0bb160.jpg'
import pic2 from '../assets/rooms/room_1/Andra2483-Andra-Queen-Queen.jpg'
import pic3 from '../assets/rooms/room_1/c4d0d835.avif'

import pic11 from '../assets/rooms/room_2/22-PIONEER-BEACH-HOTEL-SUPERIOR-SV.jpg'
import pic12 from '../assets/rooms/room_2/32-PIONEER-BEACH-HOTEL-EXECUTIVE-ONE-BEDROOM-SUITE-1140x500.jpg'
import pic13 from '../assets/rooms/room_2/paphos-constantinou-bros-pioneer-beach-image-10.jpg'

import pic21 from '../assets/rooms/room_3/13-o2beachclubbarbados-luxutycolection-quad-images-luxurycollectionoceanfrontqueen-622f4b2a5bbfd.jpg'
import pic22 from '../assets/rooms/room_3/7113ac6e.avif'
import pic23 from '../assets/rooms/room_3/O2-Beach-Club-Spa.avif'

import p1 from '../assets/rooms/room_4/1.jpg'
import p2 from '../assets/rooms/room_4/2.jpg'
import p3 from '../assets/rooms/room_4/3.jpg'

import p4 from '../assets/rooms/room_5/1.jpg'
import p5 from '../assets/rooms/room_5/2.jpg'
import p6 from '../assets/rooms/room_5/3.jpg'

import p7 from '../assets/rooms/room_6/1.jpg'
import p8 from '../assets/rooms/room_6/2.jpg'
import p9 from '../assets/rooms/room_6/3.jpg'

import p10 from '../assets/rooms/room_7/1.jpg'
import p11 from '../assets/rooms/room_7/2.jpg'
import p12 from '../assets/rooms/room_7/3.jpg'

import ListingFilters from './small-components/ListingFilters'

import { useNavigate } from 'react-router-dom'

function Listing() {

    const rooms = [{
        id: 1,
        title: "Superior Room",
        price: 4500,
        rating: 10,
        rate: "Exceptional",
        reviews: "1 review",
        
        pic1: pic2,
        pic2: pic1,
        pic3: pic3,
        
        amenities: ["wifi", "snowflake", "mattress-pillow", "suitcase-rolling", "computer", "gifts", "mug-hot", "paw"],

        amenitiesName: ["Wifi included", "Air Conditioner", "Linen included", "Luggage storage", "Working space", "Welcome gifts", "Coffee machine", "Pet friendly"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Fresh, high-quality linens and towels provided daily.", "Store your bags securely before check-in or after checkout.", "Dedicated desk area perfect for work or study.", "Complimentary treats and drinks to greet your arrival.", "Brew your favorite coffee anytime with the in-room machine.", "Bring your furry friends — pets are warmly welcomed."],

        meals: "Breakfast included"
    },
    {
        id: 2,
        title: "Superior Deluxe Room",
        price: 9500,
        rating: 8.4,
        rate: "Very Good",
        reviews: "17 reviews",
        
        pic1: pic11,
        pic2: pic12,
        pic3: pic13,
        
        amenities: ["wifi", "snowflake", "person-swimming", "suitcase-rolling", "mug-hot", "tv", "paw", "kitchen-set"],

        amenitiesName: ["Wifi included", "Air Conditioner", "Pool", "Luggage storage", "Coffee machine", "Entertainment", "Pet friendly", "Kitchen"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Take a refreshing dip in the outdoor or indoor swimming pool.", "Store your bags securely before check-in or after checkout.", "Brew your favorite coffee anytime with the in-room machine.", "Enjoy premium channels and streaming services on a smart TV.", "Bring your furry friends — pets are warmly welcomed.", "Fully equipped kitchen for cooking your own meals."],

        meals: "Dinner included"
    },
    {
        id: 3,
        title: "Luxury Suite, Ocean View",
        price: 7350,
        rating: 8.0,
        rate: "Very Good",
        reviews: "19 reviews",
        
        pic1: pic21,
        pic2: pic22,
        pic3: pic23,
        
        amenities: ["wifi", "snowflake", "mattress-pillow", "suitcase-rolling", "leaf", "person-swimming", "spa", "computer"],

        amenitiesName: ["Wifi included", "Air Conditioner", "Linen included", "Luggage storage", "Outdoor space", "Pool", "Spa", "Working space"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Fresh, high-quality linens and towels provided daily.", "Store your bags securely before check-in or after checkout.", "Unwind in a private balcony, patio, or garden area.", "Take a refreshing dip in the outdoor or indoor swimming pool.", "Relax with access to a soothing spa and wellness area.", "Dedicated desk area perfect for work or study."],

        meals: "All inclusive"
    },
    {
        id: 4,
        title: "Executive Suite",
        price: 10000,
        rating: 9.2,
        rate: "Wonderful",
        reviews: "115 reviews",
        
        pic1: p1,
        pic2: p2,
        pic3: p3,
        
        amenities: ["wifi", "spa", "dumbbell", "person-swimming", "gifts", "leaf", "mug-hot", "kitchen-set"],

        amenitiesName: ["Wifi included", "Spa", "Workout gear", "Pool", "Welcome gifts", "Outdoor space", "Coffee machine", "Kitchen"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Relax with access to a soothing spa and wellness area.", "Access modern fitness equipment for your daily workout.", "Take a refreshing dip in the outdoor or indoor swimming pool.", "Complimentary treats and drinks to greet your arrival.", "Unwind in a private balcony, patio, or garden area.", "Brew your favorite coffee anytime with the in-room machine.", "Fully equipped kitchen for cooking your own meals."],

        meals: "Lunch included"
    },
    {
        id: 5,
        title: "Premier Deluxe Room",
        price: 9500,
        rating: 8.7,
        rate: "Very Good",
        reviews: "1,124 reviews",
        
        pic1: p4,
        pic2: p5,
        pic3: p6,
        
        amenities: ["wifi", "snowflake", "computer", "dumbbell", "mattress-pillow", "kitchen-set", "paw", "dumbbell",],

        amenitiesName: ["Wifi included", "Air Conditioner", "Working space", "Workout gear", "Linen included", "Kitchen", "Pet friendly", "Workout gear"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Dedicated desk area perfect for work or study.", "Fresh, high-quality linens and towels provided daily.", "Fully equipped kitchen for cooking your own meals.", "Bring your furry friends — pets are warmly welcomed.", "Access modern fitness equipment for your daily workout."],

        meals: "Breakfast included"
    },
    {
        id: 6,
        title: "Grand Horizon Suite",
        price: 8199,
        rating: 7.5,
        rate: "Good",
        reviews: "989 reviews",
        
        pic1: p7,
        pic2: p8,
        pic3: p9,
        
        amenities: ["wifi", "snowflake", "gifts", "mug-hot", "paw", "tv", "suitcase-rolling", "computer"],

        amenitiesName: ["Wifi included", "Air Conditioner", "Welcome gifts", "Coffee machine", "Pet friendly", "Entertainment", "Luggage storage", "Working space"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Complimentary treats and drinks to greet your arrival.", "Brew your favorite coffee anytime with the in-room machine.", "Bring your furry friends — pets are warmly welcomed.", "Enjoy premium channels and streaming services on a smart TV.", "Store your bags securely before check-in or after checkout.", "Dedicated desk area perfect for work or study."],

        meals: "Lunch included"
    },
    {
        id: 7,
        title: "Panoramic View Room",
        price: 15699,
        rating: 9.9,
        rate: "Wonderful",
        reviews: "507 reviews",
        
        pic1: p10,
        pic2: p11,
        pic3: p12,
        
        amenities: ["wifi", "snowflake", "spa", "dumbbell", "person-swimming", "leaf", "suitcase-rolling", "mattress-pillow"],

        amenitiesName: ["Wifi included", "Air Conditioner", "Spa", "Workout gear", "Pool", "Outdoor space", "Luggage storage", "Linen included"],

        amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Relax with access to a soothing spa and wellness area.", "Access modern fitness equipment for your daily workout.", "Take a refreshing dip in the outdoor or indoor swimming pool.", "Unwind in a private balcony, patio, or garden area.", "Store your bags securely before check-in or after checkout.", "Fresh, high-quality linens and towels provided daily."],

        meals: "All inclusive"
    }]

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(20000)

    const [rating, setRating] = useState(0)

    const [meals, setMeals] = useState("any")
    function mealsFilter(meal) {
        if(meals == "any" || meals == meal) {
            return true
        }
        return false
    }

    const [amenities, setAmenities] = useState([])
    function amenitiesFilter(ameni) {
        if (amenities.length === 0) return true;

        return amenities.every(a => ameni.includes(a));
    }

    const [searchedRoom, setSearchedRoom] = useState("")
    function searchFunc(s) {
        return s.toLowerCase().includes(searchedRoom.toLowerCase())

    }

    const [filteredRooms, setFilteredRooms] = useState(rooms)

    useEffect(() => {
        setFilteredRooms(rooms.filter((room) => room.price <= max && room.price >= min && room.rating >= rating && mealsFilter(room.meals) && amenitiesFilter(room.amenities) && searchFunc(room.title)))
    }, [max, min, rating, meals, amenities, searchedRoom])

    const navigate = useNavigate()

    return ( 
        <>
            {/* Background image and search bar */}
            <section className="listing-bg d-flex justify-content-center">
                <div className="container text-center text-white">
                    <h1 className='fw-bold'>Luxury rooms & places to stay</h1>
                    <p className="fs-5">Search to compare prices and discover great deals with free cancellation</p>
                    <div className='search-box p-4 rounded'>
                        <h5 className='text-start text-color-dark fw-bold'>Find your room</h5>
                        <div className='search-input my-auto p-3 rounded'>
                            <i class="fa-solid fa-arrow-right-long text-color-dark text-start"></i>
                            <input className='rounded w-75 h-100 px-2' type="text" onChange={(e) => setSearchedRoom(e.target.value)}/>
                            <button className='bg-main-color p-2 rounded ms-4'>Search</button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Listing & filters */}
            <section>
                <div className="listing-container container text-bcolor">
                    <div className="mt-4">
                        <h2 className='fw-bold'>Private rooms</h2>
                        <p>Showing {filteredRooms.length} rooms</p>
                    </div>

                    <div className="fl-container d-flex gap-5">
                        {/* Filters */}
                        <ListingFilters min={min}
                            max={max}
                            rating={rating}
                            meals={meals}
                            amenities={amenities}
                            setMin={setMin}
                            setMax={setMax}
                            setRating={setRating}
                            setMeals={setMeals}
                            setAmenities={setAmenities} />
                        

                        {/* Listing */}
                        <div>

                            {filteredRooms.map((room) => (
                                
                                <div className="listing rounded d-flex mb-3" key={room.id}>

                                    <div id={`carouselExampleFade${room.id}`} className="pic carousel slide carousel-fade">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={room.pic1} className="pics d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={room.pic2} className="pics d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={room.pic3} className="pics d-block w-100" alt="..." />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleFade${room.id}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleFade${room.id}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>

                                    <div className="listBody ms-2">
                                        <div className='price-section d-flex justify-content-between'>
                                            <div>
                                                <h4 className='fw-bold mb-3 mt-2'>{room.title}</h4>
                                                <div className="listingAmenities d-flex gap-2">
                                                    <div><i className={`fa-solid fa-${room.amenities[0]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[1]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[2]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[3]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[4]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[5]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[6]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[7]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[8]}`}></i></div>
                                                    <div><i className={`fa-solid fa-${room.amenities[9]}`}></i></div>
                                                </div>
                                                <p className='mt-2'>{room.meals}</p>
                                            </div>

                                            <div className='listPrice'>
                                                <p className="fw-bold fs-5">{room.price} EGP</p>
                                            </div>
                                        </div>

                                        <div className='mt-2 d-flex justify-content-between'>
                                            <div className="d-flex gap-2">
                                                <div className="rate rounded text-bcolor"><p>{room.rating}</p></div>
                                                <div>
                                                    <p className="fw-bold">{room.rate}</p>
                                                    <p>({room.reviews})</p>
                                                </div>
                                            </div>

                                            <div>
                                                <button className='bookBtn btn bg-main-color' onClick={() => navigate("/details", {state: {room}})}>Details</button>
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