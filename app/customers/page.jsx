"use client";
import React, { useState } from "react";
import NavBar from "@/components/navBar";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = React.useState([]);

  try {
    const fetchCustomers = async () => {
      const response = await axios.get("/api/customers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }

  return (
    <main>
      <NavBar />
      <section className="flex flex-col md:flex-row gap-8 mt-8">
        {customers.length
          ? customers.map((customer) => (
              <div key={customer._id} className="customer-card">
                <h2>{customer.name}</h2>
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>
              </div>
            ))
          : "No customer found"}
      </section>
    </main>
  );
};

export default Customers;
