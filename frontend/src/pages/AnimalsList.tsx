import { useEffect, useState } from 'react';
import axios from 'axios';

interface Animal {
    id: number;
    name: string;
    dateOfArrival: string;
    enclosureNumber: number;
    healthStatus: string;
    species?: {
        name: string;
        scientificName: string;
    };
}

export default function AnimalsList() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/animals')
            .then(response => {
                setAnimals(response.data.data || response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8">£adowanie zwierz¹t...</div>;
    if (error) return <div className="p-8 text-red-600">B³¹d: {error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Lista Zwierz¹t</h1>
            <div className="grid gap-4">
                {animals.map(animal => (
                    <div key={animal.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{animal.name}</h2>
                        {animal.species && (
                            <p className="text-gray-600">
                                Gatunek: {animal.species.name} ({animal.species.scientificName})
                            </p>
                        )}
                        <p className="text-sm">Wybieg nr: {animal.enclosureNumber}</p>
                        <p className="text-sm">Status zdrowia: {animal.healthStatus}</p>
                        <p className="text-sm">Data przybycia: {new Date(animal.dateOfArrival).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}