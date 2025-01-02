import {
    concerts,
    coordonnees_bancaire,
    places_concerts,
    utilisateurs,
    artistes,
    transactions,
    expo_oeuvres,
    expo_oeuvres_demande,
    cine_films,
    places_films,
    signalement,
    deguisements,
    taille_deguisements,
    carres,
    bouteilles,
    reservation_carihorreur
} from './data.js';

function ajoutUtilisateur(data) {
    if (!data.prenom) return { error: 1, status: 404, data: 'Aucun prénom fourni' };
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom fourni' };
    if (!data.dateNaissance) return { error: 1, status: 404, data: 'Aucune date de naissance fournie' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        prenom: data.prenom,
        nom: data.nom,
        dateNaissance: data.dateNaissance,
        email: data.email,
        motDePasse: data.motDePasse
    };
    utilisateurs.push(nouvelUtilisateur);
    return { error: 0, status: 200, data: nouvelUtilisateur };
}

function loginSite(data) {
    if ((!data.prenom) || (!data.motDePasse)) return {error: 1, status: 404, data: 'aucun prenom/password fourni'}
    // pour simplifier : test uniquement le login
    let user = utilisateurs.find(e => e.prenom === data.prenom)
    if (!user) return {error: 1, status: 404, data: 'login incorrect'}
    let userPassword = utilisateurs.find(e => e.motDePasse === data.motDePasse)
    if (!userPassword) {
        return { error: 1, status: 404, data: 'password incorrect' };
    }
    let u = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
    }
    return {error: 0, status: 200, data: u}
}

function getAllUsers() {
    return {error: 0, data: utilisateurs}
}

function addPositionGeographique() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    const newPosition = { latitude, longitude, timestamp: new Date() };
                    signalement.push(newPosition);
                    resolve({error: 0, status: 200, data: { latitude, longitude, timestamp: new Date() },});
                },
                (error) => {
                    let errorMessage = "Erreur inconnue";
                    console.error(error)
                    reject({error: 1, status: 404, data: errorMessage || "Erreur inconnue lors de la géolocalisation",});
                }
            );
        } else {
            reject({error: 1, status: 404, data: "La géolocalisation n'est pas supportée par ce navigateur.",});
        }
    });
}

function addSignalement(data) {
    if (!data.typeIncident) return { error: 1, status: 404, data: "Aucun type d'incident fourni" };
    if (!data.descriptionIncident) return { error: 1, status: 404, data: "Aucune description pour l'incident fourni" };
    if (!data.zoneIncident) return { error: 1, status: 404, data: "Aucune zone sélectionnée pour l'incident" };
    if (!data.positionUtilisateur) return { error: 1, status: 404, data: "Aucune position utilisateur fournie" };

    const nouveauSignalement = {
        typeIncident: data.typeIncident,
        descriptionIncident: data.descriptionIncident,
        zoneIncident: data.zoneIncident,
        positionUtilisateur: data.positionUtilisateur,
        timestamp: new Date(),
    };

    signalement.push(nouveauSignalement);
    return { error: 0, status: 200, data: nouveauSignalement };
}

function getAllSignalements(){
    return {error: 0, data: signalement}
}

function getAllConcerts(){
    return {error: 0, data: concerts}
}

function getConcertbyId(concertId){
    let concert = concerts.find(c => c.id === parseInt(concertId))
    return {error: 0, data: concert}
}

function getAllPlaceConcert(){
    return {error: 0, data: places_concerts}
}

function getPlaceConcertbyId(concertId) {
    let place_concert = places_concerts.filter(place => place.id_concert === parseInt(concertId));
    return { error: 0, data: place_concert };
}

function validerPaiement(data){
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom de titulaire de la carte fourni' };
    if (!data.numeroCarte) return { error: 1, status: 404, data: 'Aucun numero de carte fourni' };
    if (!data.dateExpiration) return { error: 1, status: 404, data: "Aucune date d'expiration fourni" };
    if (!data.cvv) return { error: 1, status: 404, data: 'Aucun cvv fourni' };

    let nouvelleCoordonnees = {
        nom: coordonnees_bancaire.nom,
        numeroCarte: coordonnees_bancaire.numero_carte,
        dateExpiration: coordonnees_bancaire.date_expiration,
        cvv: coordonnees_bancaire.cvv,
    }
    return { error: 0, status: 200, data: nouvelleCoordonnees };
}

function getArtistes() {
    return {error: 0, data: artistes}
}

function setDecision(cjs) {
    let decision = cjs[0];
    let id = cjs[1];
    if (!decision) return {error: 1, status: 404, data: "Aucune décision n'a été prise."};
    if (!id) return {error: 1, status: 404, data: "Cette identifiant n'existe pas."};

    let demande = artistes.find(e => e.id === id)
    console.log(demande.nbMembres)
    if (!demande) return {error: 1, status: 404, data: 'artiste non trouvé'}
    demande.decision = decision;
    return {error: 0, status: 200, data: demande}
}

function getOeuvres() {
    return {error: 0, data: expo_oeuvres}
}

function setOeuvre(data) {
    if (!data.createur) return { error: 1, status: 404, data: 'Aucun créateur fourni' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.dateCrea) return { error: 1, status: 404, data: 'Aucune date de création fournie' };
    if (!data.description) return { error: 1, status: 404, data: 'Aucune description fournie' };
    if (!data.image) return { error: 1, status: 404, data: 'Aucune image fournie' };

    let nouvelOeuvre = {
        id: expo_oeuvres.length + expo_oeuvres_demande.length + 1,
        createur: data.createur,
        email: data.email,
        dateCrea: data.dateCrea,
        description: data.description,
        image: data.image
    };

    expo_oeuvres_demande.push(nouvelOeuvre);
    return { error: 0, status: 200, data: nouvelOeuvre };
}

function getAllTransactions() {
    return { error: 0, data: transactions };
}

function updateFunds(idUser, amount) {
    let user = utilisateurs.find(u => u.id === parseInt(idUser));
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
    user.solde = amount;
    return { error: 0, status: 200, data: user };
}

function getFilms() {
    return {error: 0, data: cine_films}
}

function getFilmById(filmId){
    let film = cine_films.find(c => c.id === parseInt(filmId))
    return {error: 0, data: film}
}

function setFilm(film){
    let filmMis = cine_films.find(c => c.id === parseInt(film))
    return {error: 0, data: filmMis}
}

function getPlacesFilm(places_film) {
    let placesFilm = places_films.filter(place => place.id_film === parseInt(places_film));
    return { error: 0, data: placesFilm };
}

function getAllDeguisement(){
    return {error:0, data: deguisements};
}

function getDeguisementById(deguisementId){
    let deguisement = deguisements.find(d => d.id_costume === parseInt(deguisementId))
    return {error: 0, data: deguisement}
}

function getTailleDeguisement(deguisementId) {
    let tailleDeguisement = taille_deguisements.filter(taille => taille.id_deguisement === parseInt(deguisementId));
    return { error: 0, data: tailleDeguisement };
}

function getAllBouteilles(){
    return {error: 0, data:bouteilles}
}

function getBouteillebyId(bouteilleId){
    let bouteille= bouteilles.find(b => b.id_bouteille === parseInt(bouteilleId))
    return {error: 0, data: bouteille}
}

function getAllCarres(){
    return {error: 0, data:carres}
}

function getCarrebyId(carreId){
    let carre = carres.find(c => c.id_carre === parseInt(carreId))
    return {error: 0, data: carre}
}

function getReservationCarihorreur(id){
    console.log("Recherche des réservations pour l'utilisateur ID :", id);
    const user = utilisateurs.find(u => u.id === id);
    if (!user) {
        console.error("Utilisateur non trouvé :", id);
        return {error: 1, data: 'Aucun utilisateur trouvé'};
    }
    const userReservations = reservation_carihorreur.filter(reservation => reservation.id_utilisateur === id);
    const detailsReservations = userReservations.map(reservation => {
        const carreDetails = carres.find(c => c.id_carre === reservation.id_carre);
        const reservationBouteilles = reservation.bouteilles.map(b => {
            const bouteilleDetails = bouteilles.find(bouteille => bouteille.id_bouteille === b.id_bouteille);
            return {
                type: bouteilleDetails?.type || "Inconnu",
                prix: bouteilleDetails?.prix || 0,
                quantite: b.quantite,
                totalPrix: (bouteilleDetails?.prix || 0) * b.quantite,
            };
        });
        const totalPrixBouteilles = reservationBouteilles.reduce((sum, b) => sum + b.totalPrix, 0);
        const prixCarre = carreDetails ? carreDetails.prix + (carreDetails.prixPersonne * reservation.nbPersonne) : 0;
        const prixTotal = totalPrixBouteilles + prixCarre;
        return {
            id_reservation: reservation.id_reservation,
            dateCarre: reservation.dateCarre,
            nbPersonne: reservation.nbPersonne,
            carre: carreDetails ? { type: carreDetails.type, prix: prixCarre } : null,
            bouteilles: reservationBouteilles,
            prixTotal,
        };
    });
    if (detailsReservations.length === 0) {
        console.warn("Aucune réservation trouvée pour l'utilisateur ID :", id);
        return { error: 1, message: "Aucune réservation trouvée", data: null };
    }
    return { error: 0, message: "Réservations trouvées avec succès", data: detailsReservations };
}


export default {
    loginSite,
    ajoutUtilisateur,
    getAllUsers,
    addPositionGeographique,
    addSignalement,
    getAllSignalements,
    getAllConcerts,
    getConcertbyId,
    getAllPlaceConcert,
    getPlaceConcertbyId,
    validerPaiement,
    getArtistes,
    setDecision,
    getOeuvres,
    setOeuvre,
    getAllTransactions,
    updateFunds,
    getFilms,
    getFilmById,
    setFilm,
    getPlacesFilm,
    getAllDeguisement,
    getDeguisementById,
    getTailleDeguisement,
    getAllBouteilles,
    getBouteillebyId,
    getAllCarres,
    getCarrebyId,
    getReservationCarihorreur
};