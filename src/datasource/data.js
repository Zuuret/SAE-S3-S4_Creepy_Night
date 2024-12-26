let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123", "solde": 100, "numCashless": 123456789},
    {"id":2, "prenom":"Jane", "nom":"Doe", "dateNaissance":"03-07-1998", "email":"janedoe@outlook.fr", "motDePasse":"mdp456", "solde": 80, "numCashless": 546865430},
];

let artistes = [
    {"id":1, "nomGroupe":"PINK", "nbMembres":5, "decision":"null"},
    {"id":2, "nomGroupe":"KISS", "nbMembres":4, "decision":"null"},
    {"id":3, "nomGroupe":"BABY", "nbMembres":2, "decision":"null"},
];

let concerts = [
    {"id": 1, "artiste": "BigAli", "nationalite": "USA", "date": "10-27-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_BigAli.jpg"), "categorie": "House", "scene": "Grande Scène"},
    {"id": 2, "artiste": "Travis Scott", "nationalite": "USA", "date": "10-28-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_TravisScott.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 3, "artiste": "Muse", "nationalite": "USA", "date": "10-29-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Muse.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 4, "artiste": "Vald", "nationalite": "FR", "date": "10-29-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Vald.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 5, "artiste": "David Guetta", "nationalite": "FR", "date": "10-29-2025", "heure": "00h00", "duree": "1", "image": require("../assets/affiche_DavidGuetta.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 6, "artiste": "Kungs", "nationalite": "FR", "date": "10-30-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kungs.jpg"), "categorie": "House", "scene": "Grande Scène"},
    {"id": 7, "artiste": "Vladimir Cauchemar", "nationalite": "FR", "date": "10-30-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_VladimirCauchemard.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 8, "artiste": "Gims", "nationalite": "FR", "date": "10-31-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Gims.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 9, "artiste": "Daft Punk", "nationalite": "FR", "date": "10-31-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_DaftPunk.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 10, "artiste": "Kendrick Lamar", "nationalite": "USA", "date": "10-31-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_KendrickLamar.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 11, "artiste": "The Rolling Stones", "nationalite": "UK", "date": "10-31-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_RollingStones.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 12, "artiste": "Guy2bezbar", "nationalite": "FR", "date": "11-01-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Guy2Bezbar.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 13, "artiste": "KeBlack", "nationalite": "FR", "date": "11-01-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_KeBlack.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 14, "artiste": "Booba", "nationalite": "FR", "date": "11-01-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_Booba.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 15, "artiste": "Kaaris", "nationalite": "FR", "date": "11-01-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kaaris.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 16, "artiste": "Snoop Dogg", "nationalite": "USA", "date": "11-01-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_SnoopDogg.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 17, "artiste": "DJ Snake", "nationalite": "FR", "date": "11-01-2025", "heure": "01h00", "duree": "1", "image": require("../assets/affiche_DJSnake.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 18, "artiste": "Khali", "nationalite": "FR", "date": "11-02-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Khali.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 19, "artiste": "Naps", "nationalite": "FR", "date": "11-02-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_Naps.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 20, "artiste": "Linkin Park", "nationalite": "USA", "date": "11-02-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_LinkinPark.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 21, "artiste": "Damso", "nationalite": "FR", "date": "11-02-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Damso.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 22, "artiste": "Macklemore", "nationalite": "USA", "date": "11-02-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Macklemore.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 23, "artiste": "Bob Sinclar", "nationalite": "FR", "date": "11-02-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_BobSinclar.jpg"), "categorie": "House", "scene": "Grande Scène"},
];

let places_concerts = [
    { "id_concert": 1, "type_place": "Fosse", "nb_places": 300, "prix_place": 5 },
    { "id_concert": 2, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_concert": 3, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 4, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 5, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_concert": 6, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_concert": 7, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_concert": 8, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 9, "type_place": "Fosse", "nb_places": 300, "prix_place": 30 },
    { "id_concert": 10, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 11, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 12, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 13, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 14, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 15, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 16, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_concert": 17, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_concert": 18, "type_place": "Fosse", "nb_places": 300, "prix_place": 3 },
    { "id_concert": 19, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_concert": 20, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 21, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_concert": 22, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
];

let panier_concert = [
    {'nb_places_prises':'2', 'type_place_prises':'Fosse'}
];

let coordonnees_bancaire = [
    {'nom': 'Doe', "numero_carte": "123456789ABCDEFG", 'date_expiration': "11/31", 'cvv': '484'}
]

let transactions = [
    {"id": 1, "date": "05 novembre 2024", "heure": "15h30", "operation": "Remboursement", "details": "Remboursement de 10.00 €", "amount": 10.00, "id_utilisateur": 1},
    {"id": 2, "date": "31 octobre 2024", "heure": "23h00", "operation": "Paiement BAR", "details": "1x Consigne Gobelet", "amount": 2.00, "id_utilisateur": 1},
    {"id": 3, "date": "31 octobre 2024", "heure": "21h00", "operation": "Paiement BAR", "details": "1x Consigne Gobelet - 2.00 €\n1x Coca Cola - 4.00 €", "amount": -6.00, "id_utilisateur": 1},
    {"id": 4, "date": "31 octobre 2024", "heure": "20h30", "operation": "Paiement Burger&co", "details": "1x Frites - 4.00 €\n1x Cheese Burger - 12.00 €", "amount": -16.00, "id_utilisateur": 2}
];


let expo_oeuvres = [
    {"id": 1, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 2, "createur": "null", "email": "null", "dateCrea": "null", "description": "null", "image": "null"},
    {"id": 3, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 4, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 5, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 6, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 7, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 8, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 9, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 10, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 11, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 12, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 13, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 14, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 15, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 16, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 17, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 18, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 19, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 20, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 21, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 22, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 23, "createur": "null", "email": "null", "dateCrea":  "null", "description": "null", "image": "null"},
    {"id": 24, "createur": "Jeremy Colin", "email": "jeremy.colin@exemple.com", "dateCrea": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
];

let expo_oeuvres_demande = [

]

let courses_cauchemarathon = [
    {"id": 1, "nomCircuit": "La FrayeuRoute", "date": "Mercredi 29 octobre", "heure": "20h00", "nb_places": 150 },
    {"id": 2, "nomCircuit": "La FrayeuRoute", "date": "Vendredi 31 octobre", "heure": "20h00", "nb_places": 150 },
    {"id": 3, "nomCircuit": "La FrayeuRoute", "date": "Dimanche 2 novembre", "heure": "20h00", "nb_places": 150 },
    {"id": 4, "nomCircuit": "L'ÉpouvanTour", "date": "Mercredi 29 octobre", "heure": "22h00", "nb_places": 100 },
    {"id": 5, "nomCircuit": "L'ÉpouvanTour", "date": "Vendredi 31 octobre", "heure": "22h00", "nb_places": 100 },
    {"id": 6, "nomCircuit": "L'ÉpouvanTour", "date": "Dimanche 2 novembre", "heure": "22h00", "nb_places": 100 }
];

let cine_films = [
    {"id": 1, "nomFilm": "Shining", "date": "10-27-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_BigAli.jpg"), "categorie": "House", "salle": "Salle 1"},
    {"id": 2, "nomFilm": "The Thing", "date": "10-28-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_TravisScott.jpg"), "categorie": "Rap", "salle": "Salle 2"},
    {"id": 3, "nomFilm": "l'Exorciste", "date": "10-29-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Muse.jpg"), "categorie": "Rock", "salle": "Salle 3"},
    {"id": 4, "nomFilm": "Alien", "date": "10-29-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Vald.jpg"), "categorie": "Rap", "salle": "Salle 4"},
    {"id": 5, "nomFilm": "Psychose", "date": "10-29-2025", "heure": "00h00", "duree": "1", "image": require("../assets/affiche_DavidGuetta.jpg"), "categorie": "Électro", "salle": "Salle 1"},
    {"id": 6, "nomFilm": "Massacre à la tronçonneuse", "date": "10-30-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kungs.jpg"), "categorie": "House", "salle": "Salle 2"},
    {"id": 7, "nomFilm": "Conjuring", "date": "10-30-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_VladimirCauchemard.jpg"), "categorie": "Électro", "salle": "Salle 3"},
    {"id": 8, "nomFilm": "La Nuit des masques", "date": "10-31-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Gims.jpg"), "categorie": "Rap", "salle": "Salle 4"},
    {"id": 9, "nomFilm": "[REC]", "date": "10-31-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_DaftPunk.jpg"), "categorie": "Électro", "salle": "Salle 1"},
    {"id": 10, "nomFilm": "Suspiria", "date": "10-31-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_KendrickLamar.jpg"), "categorie": "Rap", "salle": "Salle 2"},
    {"id": 11, "nomFilm": "Le Projet Blair Witch", "date": "10-31-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_RollingStones.jpg"), "categorie": "Rock", "salle": "Salle 3"},
    {"id": 12, "nomFilm": "Rosemary's Baby", "date": "11-01-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Guy2Bezbar.jpg"), "categorie": "Rap", "salle": "Salle 4"},
    {"id": 13, "nomFilm": "Scream", "date": "11-01-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_KeBlack.jpg"), "categorie": "Rap", "salle": "Salle 1"},
    {"id": 14, "nomFilm": "Saw", "date": "11-01-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_Booba.jpg"), "categorie": "Rap", "salle": "Salle 2"},
    {"id": 15, "nomFilm": "The Ring", "date": "11-01-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kaaris.jpg"), "categorie": "Rap", "salle": "Salle 3"},
    {"id": 16, "nomFilm": "Freddy sort de la nuit", "date": "11-01-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_SnoopDogg.jpg"), "categorie": "Rap", "salle": "Salle 4"},
    {"id": 17, "nomFilm": "Evil Dead", "date": "11-01-2025", "heure": "01h00", "duree": "1", "image": require("../assets/affiche_DJSnake.jpg"), "categorie": "Électro", "salle": "Salle 1"},
    {"id": 18, "nomFilm": "The Descent", "date": "11-02-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Khali.jpg"), "categorie": "Rap", "salle": "Salle 2"},
    {"id": 19, "nomFilm": "Les Dents de la mer", "date": "11-02-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_LinkinPark.jpg"), "categorie": "Rock", "salle": "Salle 3"},
    {"id": 20, "nomFilm": "Le Silence des agneaux", "date": "11-02-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Damso.jpg"), "categorie": "Rap", "salle": "Salle 4"},
    {"id": 21, "nomFilm": "Insidious", "date": "11-02-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Macklemore.jpg"), "categorie": "Rap", "salle": "Salle 2"},
    {"id": 22, "nomFilm": "Sinister", "date": "11-02-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_BobSinclar.jpg"), "categorie": "House", "salle": "Salle 3"},
];

let places_films = [
    { "id_film": 1, "type_place": "Fosse", "nb_places": 300, "prix_place": 5 },
    { "id_film": 2, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_film": 3, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 4, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 5, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_film": 6, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_film": 7, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_film": 8, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 9, "type_place": "Fosse", "nb_places": 300, "prix_place": 30 },
    { "id_film": 10, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 11, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 12, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 13, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 14, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 15, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 16, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_film": 17, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_film": 18, "type_place": "Fosse", "nb_places": 300, "prix_place": 3 },
    { "id_film": 19, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_film": 20, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 21, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_film": 22, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
];

let panier_film = [
    {'nb_places_prises':'2', 'type_place_prises':'Fosse'}
];

let signalement = []

let deguisements = [
    {'id_costume':1, 'nom_costume':'Le Diable', 'prix':9.99, 'taille':'S','image':require("../assets/costume_diable.jpg")},
    {'id_costume':2, 'nom_costume':'Le Fantome', 'prix':9.99, 'taille':'S','image':require("../assets/costume_fantome.jpeg")},
    {'id_costume':3, 'nom_costume':'La Sorcière', 'prix':9.99, 'taille':'S','image':require("../assets/costume_sorciere.jpeg")}
]


module.exports = {
    utilisateurs,
    concerts,
    places_concerts,
    panier_concert,
    coordonnees_bancaire,
    artistes,
    transactions,
    expo_oeuvres,
    expo_oeuvres_demande,
    courses_cauchemarathon,
    cine_films,
    places_films,
    panier_film,
    signalement,
    deguisements
}