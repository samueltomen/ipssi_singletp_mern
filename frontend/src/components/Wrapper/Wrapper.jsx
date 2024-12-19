import Navbar from "../NavBar/Navbar.jsx";

export default function Wrapper({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
