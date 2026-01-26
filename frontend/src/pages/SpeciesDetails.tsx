import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Species {
    id: number;
    name: string;
    scientificName: string;
}

interface Animal {
    id: number;
    name: string;
    enclosureNumber: number;
    healthStatus: string;
    dateOfArrival: string;
}

export default function SpeciesDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<{ species: Species; animals: Animal[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/species/${id}/animals`)
            .then(response => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-8">Ładowanie...</div>;
    if (!data) return <div className="p-8">Nie znaleziono gatunku</div>;

    return (
        <div className="p-8">
            <button onClick={() => navigate('/species')} className="btn-secondary mb-4">
                ← Powrót do listy gatunków
            </button>

            <h1 className="text-3xl font-bold mb-2">{data.species.name}</h1>
            <p className="text-gray-600 italic mb-6">{data.species.scientificName}</p>

            <h2 className="text-2xl font-semibold mb-4">
                Zwierzęta tego gatunku ({data.animals.length})
            </h2>

            {data.animals.length === 0 ? (
                <p className="text-gray-500">Brak zwierząt tego gatunku</p>
            ) : (
                <div className="grid gap-4">
                    {data.animals.map(animal => (
                        <div key={animal.id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">{animal.name}</h3>
                            <p className="text-sm">Wybieg nr: {animal.enclosureNumber}</p>
                            <p className="text-sm">Status: {animal.healthStatus}</p>
                            <p className="text-sm">
                                Data przybycia: {new Date(animal.dateOfArrival).toLocaleDateString('pl-PL')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}