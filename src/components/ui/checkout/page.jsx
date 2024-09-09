import { useState } from "react";
import axios from "axios";
import { useArray } from "../../funcs/context";
import "./styles.scss";

function Checkout({
  items,
  blackout,
  setBlackout,
  functionType,
  noOfPeople,
  foodPreference,
  goBackTOMenu,
}) {
  const { clearMyArray } = useArray();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const today = new Date().toISOString().split("T")[0];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      date.trim() === "" ||
      !Array.isArray(items) ||
      functionType.trim() === "" ||
      noOfPeople.trim() === "" ||
      foodPreference.trim() === "" ||
      !isValidEmail(email) ||
      !isValidPhone(phone)
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/addOrder", {
        name,
        phone,
        email,
        address,
        date,
        note,
        functionType,
        noOfPeople,
        foodPreference,
        items,
      });
      alert("Order submitted.");
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setDate("");
      setNote("");
      setError("");
      clearMyArray();
      setBlackout(false);
      goBackTOMenu();
    } catch (error) {
      console.error("Error submitting order", error);
      setError("There was an error submitting your order. Please try again.");
    }
  };

  return (
    <div className={blackout ? "blackout" : "hide"}>
      <div className="back" onClick={() => setBlackout(false)}>
        Back
      </div>
      <div className="container">
        <h1>Please provide your details</h1>
        <form onSubmit={handlePlaceOrder}>
          <input
            required
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="tel"
            placeholder="Your Phone no. *"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
            }
          />
          <input
            required
            type="email"
            placeholder="Your email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
          />
          <textarea
            required
            placeholder="Your Address *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            required
            type="date"
            placeholder="Please choose date *"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
          />
          <textarea
            placeholder="Your note (optional)"
            value={note}
            rows={4}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="submit">
            Place order
          </button>
          {error && <div className="eventError">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Checkout;

export function EventDetails({
  blackout,
  functionType,
  setFunctionType,
  noOfPeople,
  setNoOfPeople,
  foodPreference,
  setFoodPreference,
  onSubmit,
  eventError,
}) {
  return (
    <div className={blackout ? "blackout" : "hide"}>
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
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="both">Both</option>
            </select>
          </label>
          {eventError && <span className="eventError">{eventError}</span>}
          <button className="submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
