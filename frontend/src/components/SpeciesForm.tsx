import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const speciesSchema = z.object({
  name: z.string().min(1, 'Nazwa jest wymagana'),
  scientificName: z.string().min(1, 'Nazwa łacińska jest wymagana'),
  averageLifespanYears: z.number().min(1, 'Długość życia musi być >= 1'),
  category: z.enum(['ssak', 'ptak', 'gad', 'plaz', 'ryba']),
});

type SpeciesFormData = z.infer<typeof speciesSchema>;

interface Props {
  speciesId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SpeciesForm({ speciesId, onSuccess, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SpeciesFormData>({
    resolver: zodResolver(speciesSchema),
  });

  useEffect(() => {
    if (speciesId) {
      // Tryb edycji - pobierz dane
      axios.get(`http://localhost:3000/api/species/${speciesId}`)
        .then(response => {
          reset(response.data.data);
        })
        .catch(err => console.error(err));
    }
  }, [speciesId, reset]);

  const onSubmit = async (data: SpeciesFormData) => {
    try {
      if (speciesId) {
        // Edycja
        await axios.put(`http://localhost:3000/api/species/${speciesId}`, data);
      } else {
        // Tworzenie
        await axios.post('http://localhost:3000/api/species', data);
      }
      onSuccess();
    } catch (error) {
      console.error('Błąd zapisu:', error);
      alert('Wystąpił błąd podczas zapisywania');
    }
  };

  return (
    <div className="form-container">
      <h2>{speciesId ? 'Edytuj gatunek' : 'Dodaj nowy gatunek'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nazwa:</label>
          <input {...register('name')} className="form-input" />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Nazwa łacińska:</label>
          <input {...register('scientificName')} className="form-input" />
          {errors.scientificName && <span className="error">{errors.scientificName.message}</span>}
        </div>

        <div className="form-group">
          <label>Średnia długość życia (lata):</label>
          <input 
            type="number" 
            {...register('averageLifespanYears', { valueAsNumber: true })} 
            className="form-input" 
          />
          {errors.averageLifespanYears && <span className="error">{errors.averageLifespanYears.message}</span>}
        </div>

        <div className="form-group">
          <label>Kategoria:</label>
          <select {...register('category')} className="form-input">
            <option value="">Wybierz kategorię</option>
            <option value="ssak">Ssak</option>
            <option value="ptak">Ptak</option>
            <option value="gad">Gad</option>
            <option value="plaz">Płaz</option>
            <option value="ryba">Ryba</option>
          </select>
          {errors.category && <span className="error">{errors.category.message}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {speciesId ? 'Zaktualizuj' : 'Dodaj'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}