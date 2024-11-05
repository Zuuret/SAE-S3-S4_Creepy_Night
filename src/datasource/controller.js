import {concerts, coordonnees_bancaire, places_concerts, utilisateurs, artistes} from './data.js';

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


export default {
    ajoutUtilisateur,
    getAllUsers,
    getAllConcerts,
    getConcertbyId,
    getPlaceConcert,
    validerPaiement,
    getArtistes,
    setDecision
};
