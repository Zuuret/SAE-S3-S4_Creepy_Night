//import LocalSource from "@/datasource/controller";
import {getRequest, postRequest,
    //patchRequest, deleteRequest, putRequest
} from "@/services/axios.service";
/*
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
*/
async function getFilmsFromAPI() {
    return getRequest('films/',"GETFILMS");
}

async function getFilmByIdFromAPI(filmId) {
    return getRequest('films/'+filmId,"GETFILMBYID");
}

async function setFilmFromAPI(film) {
    return postRequest('films/',film,"SETFILM");
}

async function getPlacesFilmsFromAPI(places_film) {
    return getRequest('placesFilms/'+places_film,"GETPLACESFILMS");
}

async function setPlaceFilmFromAPI(film) {
    return postRequest('placesFilms/',film,"SETPLACEFILM");
}

async function getFilms() {
    let response = null;
    try {
        response = await getFilmsFromAPI();
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
        response = await getFilmByIdFromAPI(filmId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des concerts' };
    }
    return response;
}

async function setFilm(film) {
    let response = null;
    try {
        response = await setFilmFromAPI(film);
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
        response = await getPlacesFilmsFromAPI(places_film);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des places de film' };
    }
    return response;
}

async function setPlaceFilm(film) {
    let response;
    try {
        response = await setPlaceFilmFromAPI(film);
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