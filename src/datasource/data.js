let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123"},
];
let artistes = [
    {"id":1, "nomGroupe":"PINK", "nbMembres":5, "decision":"null"},
    {"id":2, "nomGroupe":"KISS", "nbMembres":4, "decision":"null"},
    {"id":3, "nomGroupe":"BABY", "nbMembres":2, "decision":"null"},
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
];

let expo_oeuvres = [
    {"id": 1, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 2, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 3, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 4, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 5, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 6, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 7, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 8, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 9, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 10, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 11, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 12, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 13, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 14, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 15, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 16, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 17, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 18, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 19, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 20, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 21, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 22, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
    {"id": 23, "createur": "null", "date":  "null", "description": "null", "image": "null"},
    {"id": 24, "createur": "Jeremy Colin", "date": "20-11-2023", "description": "null", "image": require("../assets/logo.png")},
];


module.exports = {
    utilisateurs,
    places_concerts,
    panier_concert,
    coordonnees_bancaire,
    artistes,
    expo_oeuvres,
}