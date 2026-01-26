import { useEffect, useState } from 'react';
import axios from 'axios';
import AnimalForm from '../components/AnimalForm';

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

interface Meta {
  total: number;
  limit: number;
  offset: number;
  count: number;
}

export default function AnimalsList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, limit: 10, offset: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>();

  const fetchAnimals = (offset = 0) => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/animals?limit=10&offset=${offset}`)
      .then(response => {
        setAnimals(response.data.data);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć to zwierzę?')) {
      try {
        await axios.delete(`http://localhost:3000/api/animals/${id}`);
        fetchAnimals(meta.offset);
      } catch (error) {
        alert('Błąd podczas usuwania zwierzęcia');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingId(undefined);
    fetchAnimals(meta.offset);
  };

  const handlePreviousPage = () => {
    const newOffset = Math.max(0, meta.offset - meta.limit);
    fetchAnimals(newOffset);
  };

  const handleNextPage = () => {
    const newOffset = meta.offset + meta.limit;
    if (newOffset < meta.total) {
      fetchAnimals(newOffset);
    }
  };

  const currentPage = Math.floor(meta.offset / meta.limit) + 1;
  const totalPages = Math.ceil(meta.total / meta.limit);

  if (loading) return <div className="p-8">Ładowanie zwierząt...</div>;

  return (
    <div className="p-8">
      <div className="header-actions">
        <h1 className="text-3xl font-bold mb-6">Lista Zwierząt</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Dodaj zwierzę
        </button>
      </div>

      {showForm && (
        <AnimalForm
          animalId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingId(undefined);
          }}
        />
      )}

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
            <p className="text-sm">Data przybycia: {new Date(animal.dateOfArrival).toLocaleDateString('pl-PL')}</p>
            <div className="actions">
              <button onClick={() => handleEdit(animal.id)} className="btn-edit">Edytuj</button>
              <button onClick={() => handleDelete(animal.id)} className="btn-delete">Usuń</button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginacja */}
      <div className="pagination">
        <button 
          onClick={handlePreviousPage} 
          disabled={meta.offset === 0}
          className="btn-pagination"
        >
          ← Poprzednia
        </button>
        
        <span className="pagination-info">
          Strona {currentPage} z {totalPages} (Łącznie: {meta.total})
        </span>
        
        <button 
          onClick={handleNextPage} 
          disabled={meta.offset + meta.limit >= meta.total}
          className="btn-pagination"
        >
          Następna →
        </button>
      </div>
    </div>
  );
}