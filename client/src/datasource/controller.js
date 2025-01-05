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
    reservation_carihorreur, organisateurs, prestataires, soireeBaltrouille, panier_deguisement
} from './data.js';

function ajoutUtilisateur(data) {
    if (!data.prenom) return { error: 1, status: 404, data: 'Aucun prénom fourni' };
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom fourni' };
    if (!data.dateNaissance) return { error: 1, status: 404, data: 'Aucune date de naissance fournie' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    const emailExiste = utilisateurs.some(user => user.email === data.email);
    if (emailExiste) {
        return { error: 1, status: 409, data: 'Cet email est déjà utilisé' };
    }

    let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        prenom: data.prenom,
        nom: data.nom,
        dateNaissance: data.dateNaissance,
        email: data.email,
        motDePasse: data.motDePasse,
        solde: 0,
        numCashless: Math.floor(Math.random() * 1000000000)
    };

    utilisateurs.push(nouvelUtilisateur);
    return { error: 0, status: 200, data: nouvelUtilisateur };
}
function ajoutOrganisateur(data){
    if (!data.prenom) return { error: 1, status: 404, data: 'Aucun prénom fourni' };
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom fourni' };
    if (!data.numTelephone) return { error: 1, status: 404, data: 'Aucune numéro de téléphone fournie' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    const emailExiste = organisateurs.some(organisateur => organisateur.email === data.email);
    if (emailExiste) {
        return { error: 1, status: 409, data: 'Cet email est déjà utilisé' };
    }

    let nouvelOrganisateur = {
        id: organisateurs.length + 1,
        prenom: data.prenom,
        nom: data.nom,
        numTelephone: data.numTelephone,
        email: data.email,
        motDePasse: data.motDePasse,
    };

    organisateurs.push(nouvelOrganisateur);
    return { error: 0, status: 200, data: nouvelOrganisateur };
}
function ajoutPrestataire(data){
    if (!data.societe) return { error: 1, status: 404, data: 'Aucune société fourni' };
    if (!data.adresse) return { error: 1, status: 404, data: 'Aucune adresse fourni' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    const emailExiste = prestataires.some(prestataire => prestataire.email === data.email);
    if (emailExiste) {
        return { error: 1, status: 409, data: 'Cet email est déjà utilisé' };
    }

    let nouveauPrestataire = {
        id: prestataires.length + 1,
        societe: data.societe,
        adresse: data.adresse,
        email: data.email,
        motDePasse: data.motDePasse,
    };

    prestataires.push(nouveauPrestataire);
    return { error: 0, status: 200, data: nouveauPrestataire };
}
function loginUser(data, userList, userType) {
    if (!data.email || !data.motDePasse) {
        return { error: 1, status: 404, data: 'Email ou mot de passe non fourni.' };
    }
    const user = userList.find(u => u.email === data.email && u.motDePasse === data.motDePasse);
    if (!user) {
        return { error: 1, status: 404, data: 'Email ou mot de passe incorrect.' };
    }
    let userData = { ...user, role: userType };
    if (userType === "utilisateur") {
        userData = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            solde: user.solde,
            numCashless: user.numCashless,
            role: userType
        };
    } else if (userType === "organisateur") {
        userData = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            numTelephone: user.numTelephone,
            role: userType
        };
    } else if (userType === "prestataire") {
        userData = {
            id: user.id,
            societe: user.societe,
            adresse: user.adresse,
            email: user.email,
            role: userType
        };
    }
    return { error: 0, status: 200, data: userData };
}
function loginSiteUtilisateur(data) {
    return loginUser(data, utilisateurs, "utilisateur");
}
function loginSiteOrganisateur(data) {
    return loginUser(data, organisateurs, "organisateur");
}
function loginSitePrestataire(data) {
    return loginUser(data, prestataires, "prestataire");
}
function getAllUtilisateur() {
    return {error: 0, data: utilisateurs}
}
function getAllOrganisateur() {
    return {error: 0, data: organisateurs}
}
function getAllPrestataire() {
    return {error: 0, data: prestataires}
}
function getUserById(idUser){
    let user = utilisateurs.find(u => u.id === parseInt(idUser))
    return {error: 0, data:user}
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

function getAllSoireeBaltrouille(){
    return {error:0, data:soireeBaltrouille}
}

function getSoireeBaltrouilleById(soireeId){
    let soiree = soireeBaltrouille.find(soiree => soiree.id_soiree === parseInt(soireeId))
    return { error: 0, data: soiree };
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

function getDeguisementBySoiree(soireeId) {
    let soiree = soireeBaltrouille.find(soiree => soiree.id_soiree === parseInt(soireeId))
    if (soiree) {
        let allDeguisements = deguisements.filter(deguisement =>
            soiree.deguisementsIds.includes(deguisement.id_costume)
        );
        return { error: 0, data: allDeguisements };
    } else {
        return { error: 1, message: "Soirée introuvable" };
    }
}

function addDeguisementPanier(deguisement) {
    let stock = taille_deguisements.find(
        stockItem => stockItem.id_deguisement === deguisement.id_costume && stockItem.taille === deguisement.taille
    );
    const deguisementExistantAvecTaille = panier_deguisement.find(
        item => item.id_costume === deguisement.id_costume && item.taille === deguisement.taille
    );
    if (deguisementExistantAvecTaille) {
        deguisementExistantAvecTaille.quantite += 1;
        return { error: 0, data: deguisementExistantAvecTaille };
    } else {
        const nouvelItem = { ...deguisement, quantite: 1 };
        stock.quantite -= 1;
        panier_deguisement.push(nouvelItem);
        return { error: 0, data: nouvelItem };
    }
}

function incrementerQuantite(deguisement) {
    console.log("Tentative d'incrémentation pour :", deguisement);

    // Recherche de l'article dans le panier
    let article = panier_deguisement.find(
        panierItem => panierItem.id_costume === deguisement.id_costume && panierItem.taille === deguisement.taille
    );
    console.log("Article trouvé dans le panier :", article);

    // Recherche du stock correspondant
    let stock = taille_deguisements.find(
        stockItem => stockItem.id_deguisement === deguisement.id_costume && stockItem.taille === deguisement.taille
    );
    console.log("Stock correspondant trouvé :", stock);

    // Vérification et mise à jour
    if (article && stock && (article.quantite < stock.quantite || article.quantite === stock.quantite)) {
        article.quantite += 1;
        stock.quantite -= 1;
        console.log("Quantité mise à jour dans le panier :", article.quantite);
        console.log("Quantité restante en stock :", stock.quantite);
        return { error: 0, data: deguisement };
    } else {
        console.error("Erreur : Stock insuffisant ou quantité maximale atteinte.");
        return { error: 1, message: "Stock insuffisant ou quantité maximale atteinte." };
    }
}


function diminuerQuantite(deguisement) {
    let article = panier_deguisement.find(
        panierItem => panierItem.id_costume === deguisement.id_costume && panierItem.taille === deguisement.taille
    );
    let stock = taille_deguisements.find(
        stockItem => stockItem.id_deguisement === deguisement.id_costume && stockItem.taille === deguisement.taille
    );

    if (article) {
        if (article.quantite > 1) {
            article.quantite -= 1;
            stock.quantite += 1; // Incrémenter uniquement ici
        } else if (article.quantite === 1) {
            const index = panier_deguisement.findIndex(
                panierItem => panierItem.id_costume === deguisement.id_costume && panierItem.taille === deguisement.taille
            );
            if (index !== -1) {
                panier_deguisement.splice(index, 1);
            }
            stock.quantite += 1;
        }
        return { error: 0, data: deguisement };
    } else {
        return { error: 1, message: "Article non trouvé dans le panier." };
    }
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
    ajoutUtilisateur,
    ajoutOrganisateur,
    ajoutPrestataire,
    loginSiteUtilisateur,
    loginSiteOrganisateur,
    loginSitePrestataire,
    getAllUtilisateur,
    getAllOrganisateur,
    getAllPrestataire,
    getUserById,
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
    getAllSoireeBaltrouille,
    getSoireeBaltrouilleById,
    getAllDeguisement,
    getDeguisementById,
    getTailleDeguisement,
    getDeguisementBySoiree,
    addDeguisementPanier,
    incrementerQuantite,
    diminuerQuantite,
    getAllBouteilles,
    getBouteillebyId,
    getAllCarres,
    getCarrebyId,
    getReservationCarihorreur
};