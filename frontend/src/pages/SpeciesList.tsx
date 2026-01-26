import { useEffect, useState } from 'react';
import axios from 'axios';
import SpeciesForm from '../components/SpeciesForm';

interface Species {
  id: number;
  name: string;
  scientificName: string;
  averageLifespanYears: number;
  category: string;
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
  count: number;
}

export default function SpeciesList() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, limit: 10, offset: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>();

  const fetchSpecies = (offset = 0) => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/species?limit=10&offset=${offset}`)
      .then(response => {
        setSpecies(response.data.data);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć ten gatunek?')) {
      try {
        await axios.delete(`http://localhost:3000/api/species/${id}`);
        fetchSpecies(meta.offset);
      } catch (error) {
        alert('Nie można usunąć gatunku (prawdopodobnie ma przypisane zwierzęta)');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingId(undefined);
    fetchSpecies(meta.offset);
  };

  const handlePreviousPage = () => {
    const newOffset = Math.max(0, meta.offset - meta.limit);
    fetchSpecies(newOffset);
  };

  const handleNextPage = () => {
    const newOffset = meta.offset + meta.limit;
    if (newOffset < meta.total) {
      fetchSpecies(newOffset);
    }
  };

  const currentPage = Math.floor(meta.offset / meta.limit) + 1;
  const totalPages = Math.ceil(meta.total / meta.limit);

  if (loading) return <div className="p-8">Ładowanie gatunków...</div>;

  return (
    <div className="p-8">
      <div className="header-actions">
        <h1 className="text-3xl font-bold mb-6">Lista Gatunków</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Dodaj gatunek
        </button>
      </div>

      {showForm && (
        <SpeciesForm
          speciesId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingId(undefined);
          }}
        />
      )}

      <div className="grid gap-4">
        {species.map(s => (
          <div key={s.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p className="text-gray-600 italic">{s.scientificName}</p>
            <p className="text-sm">Kategoria: {s.category}</p>
            <p className="text-sm">Średnia długość życia: {s.averageLifespanYears} lat</p>
                <div className="actions">
                    <button
                        onClick={() => window.location.href = `/species/${s.id}`}
                        className="btn-view"
                    >
                        Zobacz zwierzęta
                    </button>
                    <button onClick={() => handleEdit(s.id)} className="btn-edit">
                        Edytuj
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="btn-delete">
                        Usuń
                    </button>
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