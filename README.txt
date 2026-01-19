# Zoo Management System

Aplikacja do zarządzania ogrodem zoologicznym - ewidencja gatunków i zwierząt.

## Technologie

- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: React, Vite, TypeScript
- **Infrastruktura**: Docker, Docker Compose

## Wymagania

- Docker Desktop
- Node.js 18+ (opcjonalnie, do pracy lokalnej)

## Uruchomienie
```bash
# Sklonuj repozytorium
git clone <URL>
cd zoo-app

# Uruchom aplikację
docker-compose up --build

# Aplikacja dostępna pod:
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
```

## Przykładowe dane
```bash
docker exec -it zoo-app-postgres-1 psql -U zoo_user -d zoo_db2

# Wklej SQL z sekcji "Seed Data" poniżej
```

### Seed Data
```sql
INSERT INTO species (name, scientific_name, average_lifespan_years, category, created_at) VALUES
('Lew afrykański', 'Panthera leo', 12, 'ssak', NOW()),
('Orzeł przedni', 'Aquila chrysaetos', 25, 'ptak', NOW());

INSERT INTO animal (name, species_id, date_of_arrival, enclosure_number, health_status, created_at) VALUES
('Simba', 1, '2023-05-15', 1, 'ok', NOW()),
('Zeus', 2, '2024-01-10', 5, 'observation', NOW());
```

## Struktura projektu
```
zoo-app/
├── backend/          # NestJS API
├── frontend/         # React UI
├── docker-compose.yml
└── README.md
```

## Funkcjonalności

-  CRUD dla gatunków (Species)
-  CRUD dla zwierząt (Animals)
-  Relacje 1:N (Species → Animals)
-  Walidacja danych
-  Paginacja
-  Dokumentacja API (Swagger)

## Autorzy

Michał Wyrwa (177186)