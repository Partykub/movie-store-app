import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieStore from "./MovieStore";
import SetPricePage from "./SetPricePage";
import Navbar from "./components/Navbar";
import CartPage from "./CartPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieStore />} />
        <Route path="/set-price" element={<SetPricePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
