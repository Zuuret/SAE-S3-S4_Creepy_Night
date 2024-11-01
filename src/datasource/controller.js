import {concerts, places_concerts, utilisateurs} from './data.js';

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
    if (!data.numero_carte) return { error: 1, status: 404, data: 'Aucun numero de carte fourni' };
    if (!data.date_expiration) return { error: 1, status: 404, data: "Aucune date d'expiration fourni" };
    if (!data.cvv) return { error: 1, status: 404, data: 'Aucun cvv fourni' };
}



export default {
    ajoutUtilisateur,
    getAllUsers,
    getAllConcerts,
    getConcertbyId,
    getPlaceConcert,
    validerPaiement,
};
