import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const animalSchema = z.object({
    name: z.string().min(1, 'Imię jest wymagane'),
    speciesId: z.number().min(1, 'Gatunek jest wymagany'),
    dateOfArrival: z.string().min(1, 'Data przybycia jest wymagana'),
    enclosureNumber: z.number().min(1, 'Numer wybiegu musi być >= 1'),
    healthStatus: z.enum(['ok', 'observation', 'treatment']),
});

type AnimalFormData = z.infer<typeof animalSchema>;

interface Species {
    id: number;
    name: string;
}

interface Props {
    animalId?: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function AnimalForm({ animalId, onSuccess, onCancel }: Props) {
    const [speciesList, setSpeciesList] = useState<Species[]>([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AnimalFormData>({
        resolver: zodResolver(animalSchema),
    });

    useEffect(() => {
        // Pobierz listę gatunków
        axios.get('http://localhost:3000/api/species?limit=100')
            .then(response => setSpeciesList(response.data.data))
            .catch(err => console.error(err));

        // Jeśli edycja, pobierz dane zwierzęcia
        if (animalId) {
            axios.get(`http://localhost:3000/api/animals/${animalId}`)
                .then(response => {
                    const data = response.data.data;
                    reset({
                        ...data,
                        dateOfArrival: data.dateOfArrival.split('T')[0], // Format YYYY-MM-DD
                    });
                })
                .catch(err => console.error(err));
        }
    }, [animalId, reset]);

    const onSubmit = async (data: AnimalFormData) => {
        try {
            if (animalId) {
                await axios.put(`http://localhost:3000/api/animals/${animalId}`, data);
            } else {
                await axios.post('http://localhost:3000/api/animals', data);
            }
            onSuccess();
        } catch (error) {
            console.error('Błąd zapisu:', error);
            alert('Wystąpił błąd podczas zapisywania');
        }
    };

    return (
        <div className="form-container">
            <h2>{animalId ? 'Edytuj zwierzę' : 'Dodaj nowe zwierzę'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Imię:</label>
                    <input {...register('name')} className="form-input" />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Gatunek:</label>
                    <select {...register('speciesId', { valueAsNumber: true })} className="form-input">
                        <option value="">Wybierz gatunek</option>
                        {speciesList.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.speciesId && <span className="error">{errors.speciesId.message}</span>}
                </div>

                <div className="form-group">
                    <label>Data przybycia:</label>
                    <input type="date" {...register('dateOfArrival')} className="form-input" />
                    {errors.dateOfArrival && <span className="error">{errors.dateOfArrival.message}</span>}
                </div>

                <div className="form-group">
                    <label>Numer wybiegu:</label>
                    <input
                        type="number"
                        {...register('enclosureNumber', { valueAsNumber: true })}
                        className="form-input"
                    />
                    {errors.enclosureNumber && <span className="error">{errors.enclosureNumber.message}</span>}
                </div>

                <div className="form-group">
                    <label>Status zdrowia:</label>
                    <select {...register('healthStatus')} className="form-input">
                        <option value="">Wybierz status</option>
                        <option value="ok">OK</option>
                        <option value="observation">Obserwacja</option>
                        <option value="treatment">Leczenie</option>
                    </select>
                    {errors.healthStatus && <span className="error">{errors.healthStatus.message}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {animalId ? 'Zaktualizuj' : 'Dodaj'}
                    </button>
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
}