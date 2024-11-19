import { IFilms, IPeople, IPlanets } from './Interfaces/IStarWarsResponse';

const BASE_URL = 'https://swapi.dev/api/'

async function fetchFilms(): Promise<IFilms[]> {
    try {
        const response = await fetch(`${BASE_URL}films/`);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        const data: { results: IFilms[] } = await response.json();
        const films: IFilms[] = data.results.map((film: IFilms) => ({
            ...film,
            release_date: film.release_date,
            characters: film.characters,
            edited: new Date(film.edited)
        }));
        displayFilms(films);
        return films;
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error);
        throw error;
    }
}

function displayFilms(films: IFilms[]) {
    const filmList = document.getElementById('filmList');
    if (!filmList) {
        console.error("Element mit ID 'filmList' nicht gefunden");
        return
    }
    filmList.innerHTML = ' ';
    films.forEach(film => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${film.title}</h3>
        <p>Regisseur: ${film.director}</p>
        `;
        filmList.appendChild(li);
    })
}


async function fetchPlanets(): Promise<IPlanets[]> {
    try {
        const response = await fetch(`${BASE_URL}planets/`);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`); 
        }
        const data: { results: IPlanets[] } = await response.json();
        const planets: IPlanets[] = data.results.map((planet: IPlanets) => ({
            ...planet,
            created: new Date(planet.created),
            edited: new Date(planet.edited)
        }));
        displayPlanets(planets);
        return planets;
    } catch (error) {
        console.error("Fehler beim Abrufen der Planeten", error)
        throw error
    }
}

function displayPlanets(planets: IPlanets[]) {
    const planetList = document.getElementById('planetList');
    if (!planetList) {
        console.error("Element mit ID 'planetList' nicht gefunden");
        return;
    }
    planetList.innerHTML = '';
    planets.forEach(planet => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${planet.name}</h3>
            <p>Klima: ${planet.climate}</p>
            <p>Terrain: ${planet.terrain}</p>
            <p>Bevölkerung: ${planet.population}</p>
            <p>Erstellt am: ${new Date(planet.created).toDateString()}</p>
        `;

        planetList.appendChild(li);
    })
}

async function fetchPeople(): Promise<IPeople[]> {
    try {
        const response = await fetch(`${BASE_URL}people/`);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`); 
        }
        const data: { results: IPeople[] } = await response.json();
        const people: IPeople[] = data.results.map((person: IPeople) => ({
            ...person,
            created: person.created,
            edited: person.edited
        }));
        displayPeople(people);
        return people;
    } catch (error) {
        console.error("Fehler beim Abrufen der Personen", error)
        throw error
    }
}
function displayPeople(persons: IPeople[]) {
    const peopleList = document.getElementById('peopleList');
    if (!peopleList) {
        console.error("Element mit ID 'peopleList' nicht gefunden");
        return;
    }
    peopleList.innerHTML = '';
    persons.forEach(person => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${person.name}</h3>
            <p>Name: ${person.name}</p>
            <p>Geburtsjahr: ${person.birth_year}</p>
            <p>Augenfarbe: ${person.eye_color}</p>
            <p>Haarfarbe: ${person.hair_color}</p>
        `;
        peopleList.appendChild(li);
    })
}

document.querySelector('a[href="#planets"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    fetchPlanets().catch(error => console.error("Fehler beim Laden der Planeten", error));
    });

    document.querySelector('a[href="#people"]')?.addEventListener('click', (event) => {
        event.preventDefault();
        fetchPeople().catch(error => console.error("Fehler beim Laden der Personen", error));
        });

        document.querySelector('a[href="#films"]')?.addEventListener('click', (event) => {
            event.preventDefault();
            fetchFilms().catch(error => console.error("Fehler beim Laden der Filme", error));
        })



document.getElementById('filmSearch')?.addEventListener('input', (event) => {
    const inputElement = event.target;
    if (inputElement instanceof HTMLInputElement) {
        const searchTerm = inputElement.value.toLowerCase();
        
        fetchFilms().then(films => {
            const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm));

            displayFilms(filteredFilms)
        })
    } 
})

document.getElementById('planetSearch')?.addEventListener('input', (event) => {
    const inputElement = event.target;
    if (inputElement instanceof HTMLInputElement) {
        const searchTerm = inputElement.value.toLowerCase();
        
        fetchPlanets().then(planets => {
            const filteredPlanets = planets.filter(planet => planet.name.toLowerCase().includes(searchTerm));

            displayPlanets(filteredPlanets)
        })
    } 
})

document.getElementById('peopleSearch')?.addEventListener('input', (event) => {
    const inputElement = event.target;
    if (inputElement instanceof HTMLInputElement) {
        const searchTerm = inputElement.value.toLowerCase();
        
        fetchPeople().then(persons => {
            const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(searchTerm));

            displayPeople(filteredPeople)
        })
    } 
})
