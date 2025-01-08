import LocalSource from "@/datasource/controller";

async function getFilmsFromLocalSource() {
    return LocalSource.getFilms();
}

async function getFilmByIdFromLocalSource(filmId) {
    return LocalSource.getFilmById(filmId);
}

async function setFilmInLocalSource(film) {
    return LocalSource.setFilm(film);
}

async function getPlacesFilmsFromLocalSource(places_film) {
    return LocalSource.getPlacesFilm(places_film);
}

async function setPlaceFilmFromLocalSource(film) {
    return LocalSource.setPlaceFilm(film);
}

async function getFilms() {
    let response = null;
    try {
        response = await getFilmsFromLocalSource();
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des films'  }
    }
    return response
}

async function getFilmById(filmId) {
    let response;
    try {
        response = await getFilmByIdFromLocalSource(filmId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des concerts' };
    }
    return response;
}

async function setFilm(film) {
    let response = null;
    try {
        response = await setFilmInLocalSource(film);
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'injecter le film"  }
    }
    return response
}

async function getPlacesFilm(places_film) {
    let response;
    try {
        response = await getPlacesFilmsFromLocalSource(places_film);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des places de film' };
    }
    return response;
}

async function setPlaceFilm(film) {
    let response;
    try {
        response = await setPlaceFilmFromLocalSource(film);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de créer la place" };
    }
    return response;
}

export default {
    getFilms,
    getFilmById,
    setFilm,
    getPlacesFilm,
    setPlaceFilm
}