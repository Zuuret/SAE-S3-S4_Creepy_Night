let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123"},
];

let concerts = [
    {"id": 1, "artiste": "Traître Gims", "date": "31-10-2024", "heure": "19h00", "image": require("../assets/affiche_Gims.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 2, "artiste": "Daft Peur", "date": "31-10-2024", "heure": "21h00", "image": require("../assets/affiche_DaftPunk.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 3, "artiste": "The Rolling Bones", "date": "01-11-2024", "heure": "20h30", "image": require("../assets/affiche_RollingStones.jpg"), "categorie": "Rock", "scene": "Scène de la peur"},
    {"id": 4, "artiste": "DJ Fantom", "date": "31-10-2024", "heure": "23h00", "image": require("../assets/affiche_VladimirCauchemard.jpg"), "categorie": "House", "scene": "Scène de la peur"}
];

let places_concerts = [
    { "id_concert": 1, "type_place": "Fosse", "nb_places": 300, "prix_place": 30 },
    { "id_concert": 1, "type_place": "Assises", "nb_places": 50, "prix_place": 35 },
    { "id_concert": 2, "type_place": "Fosse", "nb_places": 400, "prix_place": 40 },
];

let panier_concert = [
    {'nb_places_prises':'2', 'type_place_prises':'Fosse'}
];

let coordonnees_bancaire = [
    {'nom': 'Doe', "numero_carte": "123456789ABCDEFG", 'date_expiration': "11/31", 'cvv': '484'}
]

module.exports = {
    utilisateurs,
    concerts,
    places_concerts,
    panier_concert,
    coordonnees_bancaire,
}