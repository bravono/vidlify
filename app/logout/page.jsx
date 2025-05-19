"use client";

import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
