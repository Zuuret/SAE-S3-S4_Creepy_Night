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
    {"id": 1, "artiste": "PhoBigAli", "date": "10-27-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_BigAli.jpg"), "categorie": "House", "scene": "Grande Scène"},
    {"id": 2, "artiste": "Travis Grotesquott", "date": "10-28-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_TravisScott.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 3, "artiste": "CaucheMuse", "date": "10-29-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Muse.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 4, "artiste": "Valdemort", "date": "10-29-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Vald.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 5, "artiste": "David GuetTarentule", "date": "10-29-2025", "heure": "00h00", "duree": "1", "image": require("../assets/affiche_DavidGuetta.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 6, "artiste": "Krungs", "date": "10-30-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kungs.jpg"), "categorie": "House", "scene": "Grande Scène"},
    {"id": 7, "artiste": "DJ Fantom", "date": "10-30-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_VladimirCauchemard.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 8, "artiste": "Traître Gims", "date": "10-31-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Gims.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 9, "artiste": "Daft Peur", "date": "10-31-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_DaftPunk.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 10, "artiste": "Kendrick Lamentable", "date": "10-31-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_KendrickLamar.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 11, "artiste": "The Rolling Bones", "date": "10-31-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_RollingStones.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 12, "artiste": "Guy2bezbAffreux", "date": "11-01-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Guy2Bezbar.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 13, "artiste": "DémoniaKeBlack", "date": "11-01-2025", "heure": "19h00", "duree": "1", "image": require("../assets/affiche_KeBlack.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 14, "artiste": "Boobscur", "date": "11-01-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_Booba.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 15, "artiste": "Kaarisombre", "date": "11-01-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Kaaris.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 16, "artiste": "SnooPeur Dogg", "date": "11-01-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_SnoopDogg.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 17, "artiste": "DJ SnaKrainte", "date": "11-01-2025", "heure": "01h00", "duree": "1", "image": require("../assets/affiche_DJSnake.jpg"), "categorie": "Électro", "scene": "Grande Scène"},
    {"id": 18, "artiste": "MonstKhali", "date": "11-02-2025", "heure": "18h00", "duree": "1", "image": require("../assets/affiche_Khali.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 19, "artiste": "Linkin Peur", "date": "11-02-2025", "heure": "20h00", "duree": "1", "image": require("../assets/affiche_LinkinPark.jpg"), "categorie": "Rock", "scene": "Grande Scène"},
    {"id": 20, "artiste": "DamsHorrible", "date": "11-02-2025", "heure": "21h00", "duree": "1", "image": require("../assets/affiche_Damso.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 21, "artiste": "MackleMort", "date": "11-02-2025", "heure": "22h00", "duree": "1", "image": require("../assets/affiche_Macklemore.jpg"), "categorie": "Rap", "scene": "Grande Scène"},
    {"id": 22, "artiste": "Bob Sinistre", "date": "11-02-2025", "heure": "23h00", "duree": "1", "image": require("../assets/affiche_BobSinclar.jpg"), "categorie": "House", "scene": "Grande Scène"},
];


module.exports = {
    utilisateurs,
    artistes,
    expo_oeuvres,
    expo_oeuvres_demande,
    cine_films,
}