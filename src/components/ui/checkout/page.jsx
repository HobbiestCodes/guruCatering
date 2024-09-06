import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";

function Checkout({ items, blackout, setBlackout }) {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [date, setdate] = useState("");
  const [note, setnote] = useState("");

  const placeOrder = async () => {
    const response = await axios.post("http://localhost:8080/addOrder", {
      name: name,
      email: email,
      phone: phone,
      address: address,
      date: date,
      note: note,
      items: items,
    });
  };
  return (
    <div className={blackout ? "blackout" : "hide"}>
      <div className="back" onClick={() => setBlackout(false)}>
        Back
      </div>
      <div className="container">
        <h1>Please provide your details</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="number"
            placeholder="Your Phone no. *"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            required
            className="phone"
            type="email"
            placeholder="Your email address *"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <textarea
            required
            className="phone address"
            placeholder="Your Address *"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
          <input
            required
            type="date"
            className="phone"
            placeholder="Please choose date *"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
          <textarea
            required={false}
            placeholder="Your note"
            className=" phone address"
            value={note}
            onChange={(e) => setnote(e.target.value)}
          />
          <button className="sumbit" onClick={() => placeOrder()}>
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

export function EventDetails({
  blackout,
  setBlackout,
  functionType,
  setFunctionType,
  noOfPeople,
  setNoOfPeople,
  foodPreference,
  setFoodPreference,
  onSubmit,
}) {
  return (
    <div className={blackout ? "blackout" : "hide"}>
      {/* <div className="back" onClick={() => setBlackout(false)}>
        Back
      </div> */}
      <div className="container">
        <h1>Event Details</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Function Type:
            <select
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
            >
              <option value="">Select Function Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label>
            Number of People:
            <select
              value={noOfPeople}
              onChange={(e) => setNoOfPeople(e.target.value)}
            >
              <option value="">Select Number of People</option>
              <option value="2-20">2-20</option>
              <option value="20-50">20-50</option>
              <option value="50-100">50-100</option>
              <option value="100-500">100-500</option>
              <option value="500+">500+</option>
              <option value="Custom">Custom</option>
            </select>
          </label>
          <label>
            Food Preference:
            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
            >
              <option value="">Select Food Preference</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Both">Both</option>
            </select>
          </label>
          <button className="submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
