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
    signalement
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

function getPlaceConcert(concertId) {
    let placeConcert = places_concerts.filter(place => place.id_concert === parseInt(concertId));
    return { error: 0, data: placeConcert };
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


let userBalance = 0;

function getUserBalance() {
    return userBalance.toFixed(2);
}

function getAllTransactions() {
    return { error: 0, data: transactions };
}

function addFunds(amount) {
    if (amount > 0) {
        userBalance += amount;
        transactions.push({
            id: transactions.length + 1,
            date: new Date().toLocaleDateString("fr-FR"),
            heure: new Date().toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }),
            operation: "Ajout de fonds",
            details: `Ajout de ${amount.toFixed(2)} €`,
            montant: amount
        });
    }
}

function refund(amount) {
    if (amount > 0 && amount <= userBalance) {
        userBalance -= amount;
        transactions.push({
            id: transactions.length + 1,
            date: new Date().toLocaleDateString("fr-FR"),
            heure: new Date().toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }),
            operation: "Remboursement",
            details: `Remboursement de ${amount.toFixed(2)} €`,
            montant: -amount
        });
    } else {
        console.error("Montant de remboursement invalide ou solde insuffisant.");
    }
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

export default {
    ajoutUtilisateur,
    getAllUsers,
    addPositionGeographique,
    addSignalement,
    getAllSignalements,
    getAllConcerts,
    getConcertbyId,
    getPlaceConcert,
    validerPaiement,
    getArtistes,
    setDecision,
    getOeuvres,
    setOeuvre,
    getUserBalance,
    getAllTransactions,
    addFunds,
    refund,
    getFilms,
    getFilmById,
    setFilm,
    getPlacesFilm,
};