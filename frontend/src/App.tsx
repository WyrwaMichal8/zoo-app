import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SpeciesList from "./pages/SpeciesList";
import AnimalsList from "./pages/AnimalsList";
import SpeciesDetails from "./pages/SpeciesDetails";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-blue-600 text-white p-4">
                    <div className="container mx-auto flex gap-4">
                        <Link to="/species" className="hover:underline">Gatunki</Link>
                        <Link to="/animals" className="hover:underline">Zwierzęta</Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<SpeciesList />} />
                    <Route path="/species" element={<SpeciesList />} />
                    <Route path="/species/:id" element={<SpeciesDetails />} />
                    <Route path="/animals" element={<AnimalsList />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;