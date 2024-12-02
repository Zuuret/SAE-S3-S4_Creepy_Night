let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123"},
];
let artistes = [
    {"id":1, "nomGroupe":"PINK", "nbMembres":5, "decision":"null"},
    {"id":2, "nomGroupe":"KISS", "nbMembres":4, "decision":"null"},
    {"id":3, "nomGroupe":"BABY", "nbMembres":2, "decision":"null"},
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

let coordonnees_bancaire = [
    {'nom': 'Doe', "numero_carte": "123456789ABCDEFG", 'date_expiration': "11/31", 'cvv': '484'}
]

module.exports = {
    utilisateurs,
    artistes,
    expo_oeuvres,
    expo_oeuvres_demande,
    cine_films,
    places_films,
    panier_film,
    coordonnees_bancaire
}