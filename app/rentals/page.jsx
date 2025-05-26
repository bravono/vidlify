"use client";
import React, { useState } from "react";
import NavBar from "@/components/navBar";
import axios from "axios";

const Rentals = () => {
  const [rentals, setRentals] = React.useState([]);

  try {
    const fetchRentals = async () => {
      const response = await axios.get("/api/customers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRentals(data);
    };
    fetchRentals();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }

  return (
    <main className="w-full h-full">
      <NavBar />
      <section className="flex flex-col md:flex-row gap-8 mt-8">
        {rentals.length
          ? rentals.map((rental) => (
              <div key={rental._id} className="rental-card">
                <h2>{rental.name}</h2>
                <p>Rental Date: {rental.dateOut}</p>
                <p>Return Date: {rental.dateReturned}</p>
                <p>Fee: {rental.rentalFee}</p>
              </div>
            ))
          : "No rental found"}
      </section>
    </main>
  );
};

export default Rentals;
