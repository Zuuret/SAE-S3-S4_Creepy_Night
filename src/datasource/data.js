let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123"},
];

let concerts = [
    {"id": 1, "artiste": "Traître Gims", "date":"31-10-2024", "heure":"19h00", "prix":30.00, "image": require("../assets/affiche_Gims.jpg")},
    {"id":2, "artiste":"Daft Peur", "date":"31-10-2024", "heure":"21h00", "prix":40.00, "image": require("../assets/affiche_DaftPunk.jpg")}
]

module.exports = {
    utilisateurs,
    concerts,
}