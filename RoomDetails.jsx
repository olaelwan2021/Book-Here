  import React from "react";
  import Data from '../Data.json'
  import { Link, useParams } from 'react-router-dom'
  import Room1 from'../assets/rooms/room1/room-1.png'
  import Room11 from '../assets/rooms/room1/room11.png'
  import Room12 from '../assets/rooms/room1/room12.png'
  import image from '../assets/rooms/image.jpg'
  function RoomDetails() {
    const { id } = useParams();
     const foundRoom = Data.Rooms.find((item) => item.id == id);
  console.log("id from URL:", id);
console.log("All room IDs:", Data.Rooms.map(r => r.id));


    const styles = {
      section: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "60px 0",
      },
      cardImg: {
        height: "250px",
        objectFit: "cover",
        borderRadius: "10px",
        transition: "transform 0.3s ease",
      },
      cardHover: {
        transform: "scale(1.05)",
      },
      title: {
        fontWeight: "600",
        letterSpacing: "1px",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "10px",
        borderRadius: "5px",
      },
    };
  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    width: "100%",
  };
    return (
      <>
      <section className="listing-bg d-flex justify-content-center">
                <div className="container text-center text-white">
                    <h1 className='fw-bold'>Luxury rooms & places to stay</h1>
                    <p className="fs-5">find peace where the world stands still</p>
                    {/* SEARCH BAR !!!!!!!!!! */}
                </div>
            </section>
        <section className="head d-flex flex-column align-items-center justify-content-start bg-secondary p-10">

          <h1 style={{
            color: "#212529",
            position: "relative",
            top: 70
          }}><li>Luxury Rooms</li></h1>
          <div className="row mt-30 ">
            {[
              {
                src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                title: "Deluxe Room",
              },
              {
                src: "/image/Room2.jpg",

                title: "Suite Room",
              },
              {
                src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
                title: "Family Room",
              },
            ].map((room, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card bg-dark text-white border-0 overflow-hidden">
                  <img
                    src={room.src}
                    alt={room.title}
                    className="card-img"
                    style={styles.cardImg}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div className="card-img-overlay d-flex align-items-end justify-content-center">
                    <h5 style={styles.title}>{room.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/*Rooms Details*/}
        {/* <div className="py-5 my-5">
          <div className="container">
  <div className="container my-4 ">
  <div className="row g-3 justify-content-center">
    {[Room1, Room11, Room12].map((room, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" key={index}>
        <div 
          className="img-wrapper position-relative overflow-hidden rounded shadow-sm"
          style={{
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
          }}
        >
          <img
            src={room}
            alt={`Room ${index + 1}`}
            className="img-fluid rounded w-100 h-100"
            style={{
              objectFit: "cover",
              height: "250px",
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>

        
        <div className="position-relative mt-5 p-2">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 col-md-6">
            {/*}  <h2>{foundRoom.name}</h2>
              <span>{foundRoom.price}/Night</span>
             </div>
          </div>
          <p>{foundRoom.desccription}</p>*/}
            <p>Interdum et malesu they adamale fames ac anteipsu pimsine faucibus curabitur arcu site feugiat in tortor in, volutpat sollicitudin libero. Hotel non lorem acer suscipit bibendum vulla facilisi nedeuter nunc volutpa mollis sapien velet conseyer turpeutionyer masin libero sempe mollis.</p>
           
           <div className="container my-4">
  <h3 className="text-center mb-4">Room Features</h3>
  <div className="table-responsive">
    <table className="table table-dark table-striped table-bordered align-middle text-center">
      <tbody>
        <tr>
          <th>Feature</th>
          <th>Details</th>
        </tr>
        <tr>
          <td>TV</td>
          <td>Smart LED Television</td>
        </tr>
        <tr>
          <td>Free Wifi</td>
          <td>High-speed Internet Access</td>
        </tr>
        <tr>
          <td>Air Plane</td>
          <td>Airport Pickup Service</td>
        </tr>
        <tr>
          <td>Heater</td>
          <td>Central Heating System</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>In-room Telephone</td>
        </tr>
        <tr>
          <td>Laundry</td>
          <td>Daily Laundry Service</td>
        </tr>
        <tr>
          <td>Adults</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>24 m²</td>
        </tr>
        <tr>
          <td>Bed Type</td>
          <td>One Large Bed</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        flexWrap: "wrap",
        padding: "40px 20px",
      }}
    >
      {/* ------- FORM ------- */}
      <form
        style={{
          flex: "1 1 350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          maxWidth: "380px",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "22px",
            color: "#333",
          }}
        >
          Book Your Stay
        </h2>

        <label style={{ fontWeight: 500 }} className="form-label">Room Name</label>
        <input
          type="text"
          placeholder="Enter room name"
          style={inputStyle}
          className="form-control"
        />

        <label style={{ fontWeight: 500 }} className="form-label">Check-in Date</label>
        <input
          type="date"
          style={inputStyle}
          className="form-control"
        />

        <label style={{ fontWeight: 500 }}className="form-label">Check-out Date</label>
        <input
          type="date"
          style={inputStyle}
          className="form-control"
        />

        <label style={{ fontWeight: 500 }}className="form-label">Adults</label>
        <select style={inputStyle} className="form-control">
          <option>1 Adult</option>
          <option>2 Adults</option>
          <option>3 Adults</option>
          <option>4 Adults</option>
        </select>

        <label style={{ fontWeight: 500 }}className="form-label">Payment Method</label>
        <select style={inputStyle} className="form-control">
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#4a4a4a",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a4a4a")}
        >
          Confirm Booking
        </button>
      </form>

      {/* ------- IMAGE ------- */}
      <div style={{ flex: "1 1 350px", textAlign: "center" }}>
        <img
          src={image}
          alt="Hotel Room"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
    

  
  


    <button
      style={{
        backgroundColor: "#e0e0e0",
        color: "#333",
        border: "none",
        padding: "10px 25px",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#bdbdbd")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
    >
      Book Now
    </button>
  
          
          
        
        
         
          
        
      </>
    );
        }

   
  export default RoomDetails;
