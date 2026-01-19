import { useEffect, useState } from 'react';
import axios from 'axios';

interface Species {
    id: number;
    name: string;
    scientificName: string;
    averageLifespanYears: number;
    category: string;
}

export default function SpeciesList() {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/species')
            .then(response => {
                setSpecies(response.data.data || response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8">Ładowanie gatunków...</div>;
    if (error) return <div className="p-8 text-red-600">Błąd: {error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Lista Gatunków</h1>
            <div className="grid gap-4">
                {species.map(s => (
                    <div key={s.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{s.name}</h2>
                        <p className="text-gray-600 italic">{s.scientificName}</p>
                        <p className="text-sm">Kategoria: {s.category}</p>
                        <p className="text-sm">Średnia długość życia: {s.averageLifespanYears} lat</p>
                    </div>
                ))}
            </div>
        </div>
    );
}