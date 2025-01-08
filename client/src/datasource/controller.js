import {
    concerts, places_concerts, reservation_concert, panier_concert,
    coordonnees_bancaire,
    utilisateurs,
    organisateurs, demandesOrganisateurs,
    prestataires, demandesPrestataires,
    artistes,
    transactions,
    expo_oeuvres, expo_oeuvres_demande,
    cine_films, places_films, reserve_film,
    signalement,
    deguisements, taille_deguisements,
    carres,
    bouteilles,
    reservation_carihorreur,
    soireeBaltrouille,
    demandeUberFlippe,
    livre_DOr,
    articles,
    reservations_cauchemarathon, courses_cauchemarathon
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
    return { error: 0, status: 200, data: nouvelOrganisateur };
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
            logo: user.logo,
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
function getPrestataireById(idPrestataire){
    let presta = prestataires.find(u => u.id === parseInt(idPrestataire))
    return {error: 0, data:presta}
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
function getPlaceConcertbyId(placeId) {
    let place_concert = places_concerts.find(place => place.id_place === parseInt(placeId));
    return { error: 0, data: place_concert };
}

function ajouterAuPanier(placeId, nbPlaces) {
    let placeConcert = places_concerts.find(p => p.id_place === parseInt(placeId));
    if (!placeConcert) {
        console.log("Place non trouvée");
        return { error: 1, statut: 404, message: "Place non trouvée" };
    }
    let concert = concerts.find(c => c.id === placeConcert.id_concert);
    if (!concert) {
        console.log("Concert non trouvé");
        return { error: 1, statut: 404, message: "Concert non trouvé" };
    }
    const placeDansPanier = panier_concert.find(item => item.placeId === parseInt(placeId));
    if (placeDansPanier) {
        placeDansPanier.nbPlaces += nbPlaces;
        placeDansPanier.prixTotal = placeDansPanier.nbPlaces * placeConcert.prix_place;
        console.log(placeDansPanier);
        return { error: 0, statut: 200, data: placeDansPanier };
    } else {
        let nouvellePlace = {
            placeId: placeId,
            nbPlaces: nbPlaces,
            prixTotal: nbPlaces * placeConcert.prix_place,
            concert: concert,
            place: placeConcert
        };
        panier_concert.push(nouvellePlace);
        return { error: 0, statut: 200, data: nouvellePlace };
    }
}
function addReservationConcert(idUser) {
    const user = utilisateurs.find(u => u.id === parseInt(idUser));
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };

    const total_panier = panier_concert.reduce((total, item) => total + item.prixTotal, 0);
    if (user.solde < total_panier) return { error: 1, status: 404, data: 'Solde insuffisant' };
    user.solde -= total_panier;

    transactions.push({
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        operation: 'Achat Billet Concert',
        details: `Réservation concert`,
        amount: -total_panier,
        id_utilisateur: user.id
    });

    let nouvelleReservation = {
        id_reservation: reservation_concert.length + 1,
        utilisateurId: user.id,
        concerts: panier_concert.map(item => ({
            placeId: item.placeId,
            nbPlaces: item.nbPlaces,
            prixTotal: item.prixTotal,
            concert: JSON.parse(JSON.stringify(item.concert)),
            place: JSON.parse(JSON.stringify(item.place))
        })),
        date: new Date().toLocaleString(),
    };
    reservation_concert.push(nouvelleReservation);
    panier_concert.length = 0;
    return { error: 0, status: 200, data: nouvelleReservation };
}

function getReservationConcertById(utilisateurId) {
    console.log("Utilisateur ID :", utilisateurId);
    console.log("Réservations existantes :", reservation_concert);

    let reservation = reservation_concert.filter(reser => reser.utilisateurId === parseInt(utilisateurId));

    return { error: 0, data: reservation };
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

function updateFunds(data) {
    let user = utilisateurs.find(u => u.id === data.idUser);
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
    user.solde += parseFloat(data.amount);
    let date = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0];
    transactions.push({
        id: transactions.length + 1,
        date: date,
        operation: data.operation,
        details: data.details,
        amount: data.amount,
        id_utilisateur: user.id
    });
    return { error: 0, status: 200, data: user.solde };
}

function validerPaiementBancaire(data) {
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom de titulaire de la carte fourni' };
    if (!data.numeroCarte) return { error: 1, status: 404, data: 'Aucun numéro de carte fourni' };
    if (!data.dateExpiration) return { error: 1, status: 404, data: 'Aucune date d\'expiration fournie' };
    if (!data.cvv) return { error: 1, status: 404, data: 'Aucun CVV fourni' };

    let carte = coordonnees_bancaire.find(c => c.nom === data.nom && c.numero_carte === data.numeroCarte && c.date_expiration === data.dateExpiration && c.cvv === data.cvv);
    if (!carte) return { error: 1, status: 404, data: 'Carte non trouvée' };

    return { error: 0, status: 200, data: carte };
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

function setPlaceFilm(film) {
    const user = utilisateurs.find(u => u.id === film.idUser);
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };

    const res_film = places_films.find(c => c.id_film === film.id);

    if (res_film.nb_places < film.nb_billets) return { error: 1, status: 404, data: 'Pas assez de places disponibles' };

    if (user.solde < film.price) return { error: 1, status: 404, data: 'Solde insuffisant' };
    user.solde -= film.price

    transactions.push({
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        operation: 'Achat Billet Cinepeur',
        details: `Achat de ${film.nb_billets} billets pour Cinepeur`,
        amount: -film.price,
        id_utilisateur: user.id
    });

    reserve_film.push({
        id_reservation: reserve_film.length + 1,
        id_utilisateur: user.id,
        id_course: film.id,
        nb_places: film.nb_billets
    });

    res_film.nb_places -= film.nb_billets;

    console.log('Achat de billets pour les films effectué avec succès, il reste', res_film.nb_places, 'places disponibles, solde restant :', user.solde, '€', 'pour l\'utilisateur', user.id, user.prenom, user.nom, film.nb_billets, 'billets achetés, prix total :', film.price, '€, film :', film.nomFilm);
    return { error: 0, status: 200, data: user.solde };
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

function getAllTailleDeguisement(){
    return {error: 0, data: taille_deguisements}
}

function getTailleDeguisementById(deguisementId) {
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

function getAllDemande(){
    return { error: 1, data : demandeUberFlippe}
}

function addDemandeUberflippe(data) {
    if (!data.zone) return {error: 1, status: 404, data: "Aucun type de zone sélectionné"};
    if (!data.nbPersonne) return {error: 1, status: 404, data: "Aucune nombre de personne fourni"};
    if (!data.description) return {error: 1, status: 404, data: "Aucune description"};

    const nouvelleDemande = {
        id_demande: demandeUberFlippe.length + 1,
        zone: data.zone,
        nbPersonne: data.nbPersonne,
        description: data.description
    };

    demandeUberFlippe.push(nouvelleDemande);
    return {error: 0, status: 200, data: nouvelleDemande};
}

function getAllUtilisateurs() {
    return { error: 0, data: utilisateurs };
}

export function getBilletsAchatAujourdHui() {
    const today = new Date().toISOString().split('T')[0];
    const count = transactions.filter(transaction => transaction.date.startsWith(today)).length;
    return { error: 0, data: count };
}

function getLivreDOr(idPrestataire) {
    let livrePresta = livre_DOr.filter(livre => livre.prestataireId === parseInt(idPrestataire));
    return { error: 0, data: livrePresta };
}

function ajoutLivreDOr(data){
    if(!data.nomUtilisateur) return {errors: 0, status: 404, data: 'Aucune nom d\'utilisateur fourni'}
    if (!data.evaluation) return {errors: 0, status: 404, data: 'Aucune évaluation fourni'}
    if(!data.message) return {errors: 0, status: 404, data: 'Aucun message fourni'}

    let nouveauCommentaire = {
        id: livre_DOr.length + 1,
        nomUtilisateur: data.nomUtilisateur,
        evaluation: data.evaluation,
        message: data.message,
        date: data.date
    }
    livre_DOr.push(nouveauCommentaire)
    return {error: 0, status: 200, data: nouveauCommentaire}
}

function getAllArticlesById(idPrestataire){
    let articlesPresta = articles.filter(article => article.prestataireId === parseInt(idPrestataire));
    return { error: 0, data: articlesPresta };
}

function getArticleById(idArticle) {
    let articlePresta = articles.find(a => a.id === parseInt(idArticle))
    return {error: 0, data: articlePresta}
}

function getAllArticle(){
    return {error: 0, data: articles}
}

function buyTicketCauchemarathon(data) {
    const user = utilisateurs.find(u => u.id === data.idUser);
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };

    const course = courses_cauchemarathon.find(c => c.nomCircuit === data.nomCourse && c.date === data.dateCourse);

    if (course.nb_places < data.nbBillets) return { error: 1, status: 404, data: 'Pas assez de places disponibles' };

    if (user.solde < data.price) return { error: 1, status: 404, data: 'Solde insuffisant' };
    user.solde -= data.price

    transactions.push({
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        operation: 'Achat Billet CaucheMarathon',
        details: `Achat de ${data.nbBillets} billets pour CaucheMarathon`,
        amount: -data.price,
        id_utilisateur: user.id
    });

    reservations_cauchemarathon.push({
        id_reservation: reservations_cauchemarathon.length + 1,
        id_utilisateur: user.id,
        id_course: course.id,
        nb_places: data.nbBillets
    });

    courses_cauchemarathon.find(c => c.id === course.id).nb_places -= data.nbBillets;

    console.log('Achat de billets pour CaucheMarathon effectué avec succès, il reste', course.nb_places, 'places disponibles, solde restant :', user.solde, '€', 'pour l\'utilisateur', user.id, user.prenom, user.nom, data.nbBillets, 'billets achetés, prix total :', data.price, '€, course :', course);
    return { error: 0, status: 200, data: { idRes : reservations_cauchemarathon.length, solde: user.solde } };
}

export async function addTransactionToDatabase(paymentDetails) {
    // Créez un nouvel objet de transaction
    const newTransaction = {
        id: transactions.length + 1, // Assurez-vous que l'ID est unique
        date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        operation: 'Achat Billet',
        details: `Achat d'un billet pour le montant de ${paymentDetails.amount} €`,
        amount: -paymentDetails.amount,
        id_utilisateur: paymentDetails.id_utilisateur,
    };

    // Ajoutez la nouvelle transaction à la liste
    transactions.push(newTransaction);

    console.log("Transaction ajoutée :", newTransaction);
    // Simulez une réponse réussie
    return { error: 0, data: "Transaction réussie" };
}

function demandeInscriptionPrestataire(data) {
    if (!data.societe) return { error: 1, status: 404, data: 'Aucune société fournie' };
    if (!data.adresse) return { error: 1, status: 404, data: 'Aucune adresse fournie' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    let nouvelleDemande = {
        id: demandesPrestataires.length + 1,
        societe: data.societe,
        adresse: data.adresse,
        email: data.email,
        motDePasse: data.motDePasse,
        statut: 'en attente'
    };

    demandesPrestataires.push(nouvelleDemande);
    return { error: 0, status: 200, data: nouvelleDemande };
}

function demandeInscriptionOrganisateur(data) {
    if (!data.nom) return { error: 1, status: 404, data: 'Aucun nom fourni' };
    if (!data.prenom) return { error: 1, status: 404, data: 'Aucun prenom fourni' };
    if (!data.email) return { error: 1, status: 404, data: 'Aucun email fourni' };
    if (!data.telephone) return { error: 1, status: 404, data: 'Aucun telephone fourni' };
    if (!data.motDePasse) return { error: 1, status: 404, data: 'Aucun mot de passe fourni' };

    let nouvelleDemande = {
        id: demandesOrganisateurs.length + 1,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        motDePasse: data.motDePasse,
        statut: 'en attente'
    };

    demandesOrganisateurs.push(nouvelleDemande);
    return { error: 0, status: 200, data: nouvelleDemande };
}

export default {
    ajoutUtilisateur,
    ajoutOrganisateur,
    loginSiteUtilisateur,
    loginSiteOrganisateur,
    loginSitePrestataire,
    getAllUtilisateur,
    getAllOrganisateur,
    getAllPrestataire,
    getUserById,
    getPrestataireById,
    addPositionGeographique,
    addSignalement,
    getAllSignalements,
    getAllConcerts,
    getConcertbyId,
    getAllPlaceConcert,
    getPlaceConcertbyId,
    ajouterAuPanier,
    addReservationConcert,
    getReservationConcertById,
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
    setPlaceFilm,
    getAllSoireeBaltrouille,
    getSoireeBaltrouilleById,
    getAllDeguisement,
    getDeguisementById,
    getAllTailleDeguisement,
    getTailleDeguisementById,
    getDeguisementBySoiree,
    getAllBouteilles,
    getBouteillebyId,
    getAllCarres,
    getCarrebyId,
    getReservationCarihorreur,
    validerPaiementBancaire,
    getAllDemande,
    addDemandeUberflippe,
    getAllUtilisateurs,
    getBilletsAchatAujourdHui,
    getLivreDOr,
    ajoutLivreDOr,
    getAllArticlesById,
    getArticleById,
    getAllArticle,
    buyTicketCauchemarathon,
    demandeInscriptionPrestataire,
    demandeInscriptionOrganisateur,
};