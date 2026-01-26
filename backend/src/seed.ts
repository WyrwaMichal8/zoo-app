import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Species } from './species/entities/species.entity';
import { Animal } from './animals/entities/animal.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const speciesRepo = app.get(getRepositoryToken(Species));
  const animalRepo = app.get(getRepositoryToken(Animal));

  // Sprawdź czy dane już istnieją
  const count = await speciesRepo.count();
  if (count > 0) {
    console.log('Database already seeded');
    await app.close();
    return;
  }

  // Dodaj 20 gatunków
  const species = await speciesRepo.save([
    // Ssaki
    { name: 'Lew afrykański', scientificName: 'Panthera leo', averageLifespanYears: 12, category: 'ssak' },
    { name: 'Tygrys bengalski', scientificName: 'Panthera tigris', averageLifespanYears: 15, category: 'ssak' },
    { name: 'Słoń afrykański', scientificName: 'Loxodonta africana', averageLifespanYears: 60, category: 'ssak' },
    { name: 'Niedźwiedź brunatny', scientificName: 'Ursus arctos', averageLifespanYears: 25, category: 'ssak' },
    { name: 'Żyrafa', scientificName: 'Giraffa camelopardalis', averageLifespanYears: 25, category: 'ssak' },
    { name: 'Szympans', scientificName: 'Pan troglodytes', averageLifespanYears: 40, category: 'ssak' },
    { name: 'Kangur rudy', scientificName: 'Macropus rufus', averageLifespanYears: 20, category: 'ssak' },
    { name: 'Wilk szary', scientificName: 'Canis lupus', averageLifespanYears: 13, category: 'ssak' },
    
    // Ptaki
    { name: 'Orzeł przedni', scientificName: 'Aquila chrysaetos', averageLifespanYears: 25, category: 'ptak' },
    { name: 'Pingwin cesarski', scientificName: 'Aptenodytes forsteri', averageLifespanYears: 20, category: 'ptak' },
    { name: 'Papuga ara', scientificName: 'Ara ararauna', averageLifespanYears: 50, category: 'ptak' },
    { name: 'Flamingo różowy', scientificName: 'Phoenicopterus roseus', averageLifespanYears: 40, category: 'ptak' },
    { name: 'Pelikan różowy', scientificName: 'Pelecanus onocrotalus', averageLifespanYears: 30, category: 'ptak' },
    
    // Gady
    { name: 'Krokodyl nilowy', scientificName: 'Crocodylus niloticus', averageLifespanYears: 70, category: 'gad' },
    { name: 'Żółw grecki', scientificName: 'Testudo graeca', averageLifespanYears: 100, category: 'gad' },
    { name: 'Iguana zielona', scientificName: 'Iguana iguana', averageLifespanYears: 20, category: 'gad' },
    { name: 'Pyton królewski', scientificName: 'Python regius', averageLifespanYears: 30, category: 'gad' },
    
    // Płazy
    { name: 'Salamandra plamista', scientificName: 'Salamandra salamandra', averageLifespanYears: 15, category: 'plaz' },
    { name: 'Axolotl', scientificName: 'Ambystoma mexicanum', averageLifespanYears: 10, category: 'plaz' },
    
    // Ryby
    { name: 'Rekin biały', scientificName: 'Carcharodon carcharias', averageLifespanYears: 30, category: 'ryba' },
  ]);

  // Dodaj 25 zwierząt
  await animalRepo.save([
    // Lwy
    { name: 'Alex', speciesId: species[0].id, dateOfArrival: '2020-03-15', enclosureNumber: 1, healthStatus: 'ok' },
    { name: 'Bella', speciesId: species[0].id, dateOfArrival: '2020-03-15', enclosureNumber: 1, healthStatus: 'ok' },
    { name: 'Leo', speciesId: species[0].id, dateOfArrival: '2022-07-10', enclosureNumber: 1, healthStatus: 'observation' },
    
    // Tygrysy
    { name: 'Raja', speciesId: species[1].id, dateOfArrival: '2019-05-20', enclosureNumber: 2, healthStatus: 'ok' },
    { name: 'Maya', speciesId: species[1].id, dateOfArrival: '2019-05-20', enclosureNumber: 2, healthStatus: 'ok' },
    
    // Słonie
    { name: 'Kala', speciesId: species[2].id, dateOfArrival: '2015-11-03', enclosureNumber: 3, healthStatus: 'ok' },
    { name: 'Tembo', speciesId: species[2].id, dateOfArrival: '2017-08-12', enclosureNumber: 3, healthStatus: 'observation' },
    { name: 'Nala', speciesId: species[2].id, dateOfArrival: '2021-02-28', enclosureNumber: 3, healthStatus: 'ok' },
    
    // Niedźwiedzie
    { name: 'Bruno', speciesId: species[3].id, dateOfArrival: '2018-06-14', enclosureNumber: 4, healthStatus: 'ok' },
    { name: 'Mila', speciesId: species[3].id, dateOfArrival: '2018-06-14', enclosureNumber: 4, healthStatus: 'ok' },
    
    // Żyrafy
    { name: 'Sophie', speciesId: species[4].id, dateOfArrival: '2016-04-22', enclosureNumber: 5, healthStatus: 'ok' },
    { name: 'Max', speciesId: species[4].id, dateOfArrival: '2019-09-07', enclosureNumber: 5, healthStatus: 'ok' },
    
    // Szympansy
    { name: 'Charlie', speciesId: species[5].id, dateOfArrival: '2014-12-01', enclosureNumber: 6, healthStatus: 'ok' },
    { name: 'Lucy', speciesId: species[5].id, dateOfArrival: '2014-12-01', enclosureNumber: 6, healthStatus: 'ok' },
    { name: 'Oscar', speciesId: species[5].id, dateOfArrival: '2020-01-15', enclosureNumber: 6, healthStatus: 'treatment' },
    
    // Kangury
    { name: 'Jack', speciesId: species[6].id, dateOfArrival: '2021-03-10', enclosureNumber: 7, healthStatus: 'ok' },
    { name: 'Zoe', speciesId: species[6].id, dateOfArrival: '2021-03-10', enclosureNumber: 7, healthStatus: 'ok' },
    
    // Wilki
    { name: 'Luna', speciesId: species[7].id, dateOfArrival: '2019-11-20', enclosureNumber: 8, healthStatus: 'ok' },
    { name: 'Thor', speciesId: species[7].id, dateOfArrival: '2019-11-20', enclosureNumber: 8, healthStatus: 'ok' },
    
    // Orły
    { name: 'Atlas', speciesId: species[8].id, dateOfArrival: '2017-05-03', enclosureNumber: 9, healthStatus: 'ok' },
    
    // Pingwiny
    { name: 'Oliver', speciesId: species[9].id, dateOfArrival: '2020-08-15', enclosureNumber: 10, healthStatus: 'ok' },
    { name: 'Emma', speciesId: species[9].id, dateOfArrival: '2020-08-15', enclosureNumber: 10, healthStatus: 'ok' },
    { name: 'Liam', speciesId: species[9].id, dateOfArrival: '2022-01-20', enclosureNumber: 10, healthStatus: 'observation' },
    
    // Papugi
    { name: 'Coco', speciesId: species[10].id, dateOfArrival: '2018-03-12', enclosureNumber: 11, healthStatus: 'ok' },
    { name: 'Kiwi', speciesId: species[10].id, dateOfArrival: '2021-06-08', enclosureNumber: 11, healthStatus: 'ok' },
  ]);

  console.log('Database seeded successfully!');
  console.log(`Added ${species.length} species and 25 animals`);
  await app.close();
}

seed();