let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123"},
];

let concerts = [
    {"id": 1, "artiste": "Traître Gims", "date": "10-31-2025", "heure": "18h00", "duree": "2", "image": require("../assets/affiche_Gims.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 2, "artiste": "Daft Peur", "date": "10-31-2025", "heure": "22h00", "duree": "2", "image": require("../assets/affiche_DaftPunk.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 3, "artiste": "The Rolling Bones", "date": "10-31-2025", "heure": "20h30", "duree": "2", "image": require("../assets/affiche_RollingStones.jpg"), "categorie": "Rock", "scene": "Scène de la peur"},
    {"id": 4, "artiste": "DJ Fantom", "date": "10-30-2025", "heure": "23h00", "duree": "1.5", "image": require("../assets/affiche_VladimirCauchemard.jpg"), "categorie": "Électro", "scene": "Scène de la peur"},
    {"id": 5, "artiste": "PhoBigAli", "date": "10-27-2025", "heure": "22h00", "duree": "2", "image": require("../assets/affiche_BigAli.jpg"), "categorie": "House", "scene": "Scène de la peur"},
    {"id": 6, "artiste": "Travis Grotesquott", "date": "10-28-2025", "heure": "19h00", "duree": "2", "image": require("../assets/affiche_TravisScott.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 7, "artiste": "Kendrick Lamentable", "date": "10-31-2025", "heure": "20h00", "duree": "1.5", "image": require("../assets/affiche_KendrickLamar.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 8, "artiste": "KungSombre", "date": "10-30-2025", "heure": "21h30", "duree": "1", "image": require("../assets/affiche_Kungs.jpg"), "categorie": "House", "scene": "Scène de la peur"},
    {"id": 9, "artiste": "CaucheMuse", "date": "10-29-2025", "heure": "22h00", "duree": "2", "image": require("../assets/affiche_Muse.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 10, "artiste": "David GuetTarentule", "date": "10-29-2025", "heure": "00h00", "duree": "2", "image": require("../assets/affiche_DavidGuetta.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 11, "artiste": "Guy2bezbAffreux", "date": "11-01-2025", "heure": "18h00", "duree": "1.5", "image": require("../assets/affiche_Guy2Bezbar.jpg"), "categorie": "Rap", "scene": "Scène de la peur"},
    {"id": 12, "artiste": "DémoniaKeBlack", "date": "11-01-2025", "heure": "20h30", "duree": "1.5", "image": require("../assets/affiche_KeBlack.jpg"), "categorie": "Rap", "scene": "Scène de la peur"},
    {"id": 13, "artiste": "SnooPeur Dogg", "date": "11-01-2025", "heure": "18h00", "duree": "1.5", "image": require("../assets/affiche_SnoopDogg.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 14, "artiste": "DJ SnaKrainte", "date": "11-01-2025", "heure": "23h30", "duree": "2", "image": require("../assets/affiche_DJSnake.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 15, "artiste": "Linkin Peur", "date": "11-02-2025", "heure": "21h00", "duree": "2", "image": require("../assets/affiche_LinkinPark.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 16, "artiste": "DamsHorrible", "date": "11-02-2025", "heure": "18h30", "duree": "1.5", "image": require("../assets/affiche_Damso.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 17, "artiste": "MonstKhali", "date": "11-02-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Khali.jpg"), "categorie": "Rap", "scene": "Scène de la peur"},
    {"id": 18, "artiste": "MackleMort", "date": "11-02-2025", "heure": "20h30", "duree": "1.5", "image": require("../assets/affiche_Macklemore.jpg"), "categorie": "Rap", "scene": "Scène de la peur"},
    {"id": 19, "artiste": "Bob Sinistre", "date": "11-02-2025", "heure": "23h00", "duree": "2", "image": require("../assets/affiche_BobSinclar.jpg"), "categorie": "House", "scene": "Grande Scène"}
];

let places_concerts = [
    { "id_concert": 1, "type_place": "Fosse", "nb_places": 300, "prix_place": 30 },
    { "id_concert": 1, "type_place": "Assises", "nb_places": 50, "prix_place": 35 },
    { "id_concert": 2, "type_place": "Fosse", "nb_places": 400, "prix_place": 40 },
];

// Table des catégories
let categories_concerts = [
    { "id": 1, "categorie": "Rap" },
    { "id": 2, "categorie": "Électro" },
    { "id": 3, "categorie": "Rock" },
    { "id": 4, "categorie": "House" }
];

let scenes_festival = [
    { "id": 1, "scene": "Grande Scène", "emplacement": "Entrée principale du festival" },
    { "id": 2, "scene": "Scène de la peur", "emplacement": "Zone Nord du festival" },
];

let coordonnees_bancaire = [
    {'nom': 'Doe', "numero_carte": "123456789ABCDEFG", 'date_expiration': "11/31", 'cvv': '484'}
]

module.exports = {
    utilisateurs,
    concerts,
    places_concerts,
    categories_concerts,
    scenes_festival,
    coordonnees_bancaire,
}