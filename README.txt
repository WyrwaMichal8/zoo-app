# Zoo Management System

Aplikacja webowa do zarządzania ogrodem zoologicznym - ewidencja gatunków i zwierząt.

## Technologie

**Backend:** NestJS, TypeORM, PostgreSQL  
**Frontend:** React, TypeScript, Vite  
**Infrastruktura:** Docker Compose

## Uruchomienie
```bash
git clone https://github.com/WyrwaMichal8/zoo-app.git
cd zoo-app
docker-compose up --build
```

**Aplikacja dostępna:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs

**Przykładowe dane ładują się automatycznie przy pierwszym uruchomieniu.**

## Funkcjonalności

- CRUD dla gatunków i zwierząt
- Paginacja list (10 rekordów/strona)
- Walidacja danych (backend + frontend)
- Relacje: gatunki → zwierzęta (1:N)
- Endpoint relacyjny: `GET /api/species/:id/animals`
- Interaktywna dokumentacja API (Swagger)

## Struktura bazy danych

### Species (Gatunki)
- nazwa, nazwa łacińska, długość życia, kategoria (ssak/ptak/gad/płaz/ryba)

### Animals (Zwierzęta)
- imię, gatunek (FK), data przybycia, numer wybiegu, status zdrowia (ok/observation/treatment)

## API

Wszystkie endpointy: http://localhost:3000/api/docs

**Przykłady:**
- `GET /api/species?limit=10&offset=0` - lista gatunków
- `POST /api/species` - dodaj gatunek
- `GET /api/species/:id/animals` - zwierzęta danego gatunku
- `GET /api/animals?limit=10&offset=0` - lista zwierząt

## Autor

Michał Wyrwa (177186)