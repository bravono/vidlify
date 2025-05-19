"use client";
import Movies from "./movies/page";
import NavBar from "../components/navBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <NavBar />
      <Movies />
    </main>
  );
}
