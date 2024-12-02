import LocalSource from "@/datasource/controller";

async function getFilmsFromLocalSource() {
    return LocalSource.getFilms();
}

async function getPlacesFilmsFromLocalSource(places_film) {
    return LocalSource.getPlacesFilm(places_film);
}

async function setFilmInLocalSource(film) {
    return LocalSource.setFilm(film);
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
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des places de concerts' };
    }
    return response;
}

export default {
    getFilms,
    setFilm,
    getPlacesFilm
}