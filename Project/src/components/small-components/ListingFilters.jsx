import { useRef } from "react";


function ListingFilters(props) {
    
    const maxRef = useRef()

    const filterAmenities = [
            {type: "tv", text: "Entertainment"}, {type: "person-swimming", text: "pool"}, {type: "wifi", text: "Wifi included"}, {type: "dumbbell", text: "Workout gear"}, {type: "mug-hot", text: "Coffee machine"}, {type: "spa", text: "Spa"}, {type: "leaf", text: "Outdoor space"}, {type: "mattress-pillow", text: "Linen included"}, {type: "paw", text: "Pet friendly"}, {type: "suitcase-rolling", text: "Luggage storage"},
            {type: "computer", text: "Working space"}, {type: "kitchen-set", text: "Kitchen"}, {type: "snowflake", text: "Air conditioner"}, {type: "gifts", text: "Welcome gifts"}
        ]

    return ( 
        <>
            <aside className="filters-container w-25 rounded mb-4">
                <div className="p-3">
                    <h4 className='fw-bolder'>Filter by</h4>
                    <div className="nightlyPrice mt-4">
                        <label htmlFor="range1" className="form-label fw-bold">Nightly price</label>
                        <div className="d-flex justify-content-between gap-2 mb-3">
                            <input type="text" className="rounded border w-50 p-2" placeholder="EGP 0" onChange={(e) => props.setMin(e.target.value)}/>
                            <input type="text" className="rounded border w-50 p-2" placeholder="EGP 14,400+" onChange={(e) => props.setMax(e.target.value)} ref={maxRef}/>
                        </div>
                        <input type="range" className="form-range" min={props.min} max="20000" value={props.max} id="range1" onChange={(e) => {props.setMax(e.target.value)
                            maxRef.current.value = e.target.value
                        }}></input>
                    </div>

                    <div className="guestRating mt-4">
                        <p className="fw-bold">Guest rating</p>
                        <form className="">
                            <div className="form-check">
                                <label htmlFor="any" className="form-check-label">Any</label>
                                <input type="radio" id="any" className="form-check-input" value={0} name="rating" onChange={(e) => props.setRating(e.target.value)}/>
                            </div>
                            <div className="form-check">
                                <label htmlFor="wonderful" className="form-check-label">Wonderful 9+</label>
                                <input type="radio" id="wonderful" className="form-check-input" value={9} name="rating" onChange={(e) => props.setRating(e.target.value)}/>
                            </div>
                            <div className="form-check">
                                <label htmlFor="veryGood" className="form-check-label">Very good 8+</label>
                                <input type="radio" id="veryGood" className="form-check-input" value={8} name="rating" onChange={(e) => props.setRating(e.target.value)}/>
                            </div>
                            <div className="form-check">
                                <label htmlFor="good" className="form-check-label">Good 7+</label>
                                <input type="radio" id="good" className="form-check-input" value={7} name="rating" onChange={(e) => props.setRating(e.target.value)}/>
                            </div>
                        </form>
                    </div>

                    <div className="amenities mt-4">
                        <p className="fw-bold">Amenities</p>
                        <div className="d-flex flex-wrap justify-content-between gap-2">
                            {filterAmenities.map((ameni, index) => (
                                <div key={index}>
                                    <button className="rounded bg-white fw-bold text-color-darker" onClick={(e) => { e.target.classList.toggle("ameniActive")
                                        props.setAmenities(prev => {if(prev.includes(ameni.type)) {
                                            return prev.filter(item => item !== ameni.type)
                                        }
                                        return [...prev, ameni.type]})
                                    }}>
                                        <i className={`fs-6 fa-solid fa-${ameni.type}`}></i>
                                        <br /> {ameni.text}</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mealPlans mt-4">
                        <p className="fw-bold">Meal plans available</p>
                        <div className="form-check">
                            <input className="form-check-input" name="meals" type="radio" id="any" value="any" onChange={(e) => props.setMeals(e.target.value)}></input>
                            <label className="form-check-label" htmlFor="any">Any</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name="meals" type="radio" id="breakfast" value="Breakfast included" onChange={(e) => props.setMeals(e.target.value)}></input>
                            <label className="form-check-label" htmlFor="breakfast">Breakfast included</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name="meals" type="radio" id="dinner" value="Dinner included" onChange={(e) => props.setMeals(e.target.value)}></input>
                            <label className="form-check-label" htmlFor="dinner">Dinner included</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name="meals" type="radio" id="lunch" value="Lunch included" onChange={(e) => props.setMeals(e.target.value)}></input>
                            <label className="form-check-label" htmlFor="lunch">Lunch included</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" name="meals" type="radio" id="allMeals" value="All inclusive" onChange={(e) => props.setMeals(e.target.value)}></input>
                            <label className="form-check-label" htmlFor="allMeals">All inclusive</label>
                        </div>
                    </div>

                </div>
            </aside>
        </>
     );
}

export default ListingFilters;