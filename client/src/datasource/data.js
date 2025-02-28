let utilisateurs = [
    {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123", "solde": 100.00, "numCashless": 123456789},
    {"id":2, "prenom":"Jane", "nom":"Doe", "dateNaissance":"03-07-1998", "email":"janedoe@outlook.fr", "motDePasse":"mdp456", "solde": 80.00, "numCashless": 546865430},
    {"id":3, "prenom":"Alice", "nom":"Smith", "dateNaissance":"12-05-1995", "email":"alicesmith@gmail.com", "motDePasse":"alice123", "solde": 50.00, "numCashless": 654321987},
    {"id":4, "prenom":"Bob", "nom":"Brown", "dateNaissance":"15-03-1990", "email":"bobbrown@yahoo.com", "motDePasse":"bob456", "solde": 120.00, "numCashless": 789654321},
    {"id":5, "prenom":"Charlie", "nom":"Davis", "dateNaissance":"18-07-1997", "email":"charliedavis@outlook.com", "motDePasse":"charlie789", "solde": 75.00, "numCashless": 123987654},
    {"id":6, "prenom":"Diana", "nom":"Wilson", "dateNaissance":"10-10-1988", "email":"dianawilson@gmail.com", "motDePasse":"diana101", "solde": 65.00, "numCashless": 987654321},
    ];

let organisateurs = [
    {"id":1, "prenom":"Jean", "nom":"Kherza", "email":"jeankherza@gmail.com", "motDePasse":"mdp123", "numTelephone": 123456789},
    {"id":2, "prenom":"Luc", "nom":"Balta", "email":"lucbalta@outlook.fr", "motDePasse":"mdp456", "numTelephone": 546865430},
    {"id":3, "prenom":"Marie", "nom":"Dupont", "email":"mariedupont@gmail.com", "motDePasse":"mdp789", "numTelephone": 987654321},
    {"id":4, "prenom":"Paul", "nom":"Durand", "email":"pauldurand@gmail.com", "motDePasse":"paul123", "numTelephone": 765432198},
    {"id":5, "prenom":"Clara", "nom":"Martin", "email":"claramartin@gmail.com", "motDePasse":"clara456", "numTelephone": 654321987},
    {"id":6, "prenom":"Lucas", "nom":"Bernard", "email":"lucasbernard@gmail.com", "motDePasse":"lucas789", "numTelephone": 543219876},
    {"id":7, "prenom":"Emma", "nom":"Morel", "email":"emmamorel@gmail.com", "motDePasse":"emma123", "numTelephone": 432198765},
    {"id":8, "prenom":"Nathan", "nom":"Simon", "email":"nathansimon@gmail.com", "motDePasse":"nathan456", "numTelephone": 321987654},
    {"id":9, "prenom":"Alice", "nom":"Girard", "email":"alicegirard@gmail.com", "motDePasse":"alice789", "numTelephone": 219876543},
    {"id":10, "prenom":"Victor", "nom":"Rousseau", "email":"victorrousseau@gmail.com", "motDePasse":"victor123", "numTelephone": 198765432}
];

let demandesOrganisateurs = [
    { id: 1, prenom: "Tim", nom: "Duncan", email: "timduncan@gmail.com", telephone: "0707070707", motDePasse: "mdp" },
    { id: 2, prenom: "Enzo", nom: "Ferrari", email: "enzoferrari@gmail.com", telephone: "0606060606", motDePasse: "mdp" },
    { id: 3, prenom: "Yahia", nom: "Touré", email: "yahiatoure@gmail.com", telephone: "0505050505", motDePasse: "mdp" },
    { id: 4, prenom: "Sophie", nom: "Leclerc", email: "sophieleclerc@gmail.com", telephone: "0404040404", motDePasse: "mdp" },
    { id: 5, prenom: "Antoine", nom: "Dumas", email: "antoinedumas@gmail.com", telephone: "0303030303", motDePasse: "mdp" },
    { id: 6, prenom: "Camille", nom: "Germain", email: "camillegermain@gmail.com", telephone: "0202020202", motDePasse: "mdp" },
    { id: 7, prenom: "Hugo", nom: "Blanc", email: "hugoblanc@gmail.com", telephone: "0101010101", motDePasse: "mdp" },
    { id: 8, prenom: "Juliette", nom: "Renard", email: "julietterenard@gmail.com", telephone: "0909090909", motDePasse: "mdp" },
    { id: 9, prenom: "Aurélien", nom: "Fabre", email: "aurelienfabre@gmail.com", telephone: "0808080808", motDePasse: "mdp" },
    { id: 10, prenom: "Chloé", nom: "Fontaine", email: "chloefontaine@gmail.com", telephone: "0707070707", motDePasse: "mdp" }
];

let prestataires = [
    {"id":1, "societe":"Burger King","adresse": "3 rue de Japy", "email":"burgerking@gmail.com", "motDePasse":"mdp123","theme":"Alimentation", "description":"Pour le Creepy Night Festival, nous avons revisité nos classiques avec une touche effrayante ! Des recettes revisitées aux couleurs de l’horreur, des saveurs audacieuses et une ambiance qui fait frissonner. Oserez-vous y goûter ?", "logo": require("../assets/logo_burgerking.png"), "background": require("../assets/background_BK.jpg"), "background2": require("../assets/background2_BK.jpg")},
    {"id":2, "societe":"POP","adresse": "5 rue de Belfort", "email":"pop@gmail.com", "motDePasse":"mdp123","theme":"Goodies", "description":"Les icônes de l’horreur prennent vie dans notre collection spéciale Creepy Night ! Retrouvez vos personnages cultes sous forme de figurines, dans des éditions effrayantes et exclusives. Une touche de frisson à collectionner !", "logo": require("../assets/logo_pop.png"), "background": require("../assets/background_POP.jpg"), "background2": require("../assets/background2_POP.jpg")},
    {"id":3, "societe":"Starbucks","adresse": "22 place de la République", "email":"starbucks@gmail.com", "motDePasse":"mdp123","theme":"Alimentation","description":"Plongez dans un univers ensorcelé avec nos boissons aux notes mystérieuses et envoûtantes. Entre saveurs automnales et créations surprises, chaque gorgée vous emmène dans l’ambiance inquiétante du festival.", "logo": require("../assets/logo_starbucks.png"), "background": require("../assets/background_starbucks.jpg"), "background2": require("../assets/background2_starbucks.jpg")},
    {"id":4, "societe":"Domino's Pizza","adresse": "45 boulevard Haussmann", "email":"dominos@gmail.com", "motDePasse":"mdp123","theme":"Alimentation", "description":"Nos recettes prennent une allure terrifiante pour l’occasion ! Des ingrédients surprenants, des associations audacieuses et une touche infernale dans chaque bouchée. Préparez-vous à une expérience gustative hors du commun","logo": require("../assets/logo_domino.png"), "background": require("../assets/background_DominosPizza.jpg"), "background2": require("../assets/background2_DominosPizza.jpg")},
    {"id":5, "societe":"Ricard","adresse": "8 rue du Commerce", "email":"ricard@gmail.com", "motDePasse":"mdp123","theme":"Boisson", "description":"Nos créations inédites pour le festival vous feront frissonner de plaisir. Des associations surprenantes, des couleurs sombres et un goût inimitable pour accompagner cette nuit d’épouvante","logo": require("../assets/logo_ricard.png"), "background": require("../assets/background_Ricard.jpg"), "background2": require("../assets/background2_Ricard.jpg")},
    {"id":6, "societe":"Nike","adresse": "4 allée Centrale", "email":"nike@gmail.com", "motDePasse":"mdp123","theme":"Goodies", "description":"Parce que l’horreur n’attend pas, nous vous accompagnons avec des modèles spécialement conçus pour braver la nuit. Styles sombres, détails lumineux et confort optimal, parfaits pour parcourir les allées du festival sans crainte.","logo": require("../assets/logo_nike.png"), "background": require("../assets/background_Nike.jpeg"), "background2": require("../assets/background2_Nike.jpeg")},
    {"id":7, "societe":"Magnum","adresse": "10 rue Saint Honoré", "email":"magnum@gmail.com", "motDePasse":"mdp123","theme":"Alimentation","description":"Succombez à des douceurs glacées aux saveurs envoûtantes. Entre contrastes saisissants et textures surprenantes, nos créations spéciales Creepy Night vous réservent des sensations inédites.", "logo": require("../assets/logo_haagenDazs.png"), "background": require("../assets/background_magnum.jpg"), "background2": require("../assets/background2_magnum.jpg")},
    {"id":8, "societe":"Taco Bell","adresse": "9 place Montmartre", "email":"tacobell@gmail.com", "motDePasse":"mdp123","theme":"Alimentation","description":"Le piquant et l’étrange se rencontrent dans nos plats spécialement imaginés pour le festival. Une explosion de saveurs relevées, des couleurs sombres et une expérience qui réveillera les esprits… et vos papilles !", "logo": require("../assets/logo_tacoBell.png"), "background": require("../assets/background_tacoBell.jpg"), "background2": require("../assets/background2_tacoBell.jpg")},
    {"id":9, "societe":"MicroMania","adresse": "6 avenue Opéra", "email":"micromania@gmail.com", "motDePasse":"mdp123","theme":"Goodies","description":"Plongez dans le frisson du jeu vidéo avec notre sélection spéciale d’univers terrifiants. Défis, tournois et surprises vous attendent pour une immersion totale dans le monde du gaming horrifique.", "logo": require("../assets/logo_micromania.png"), "background": require("../assets/background_microMania.jpg"), "background2": require("../assets/background2_microMania.jpg")}
];

let demandesPrestataires = [
    { id: 1, societe: "Société D", adresse: "Adresse D", email: "contact@societed.com", statut: "en attente", motDePasse: "mdp" },
    { id: 2, societe: "Société E", adresse: "Adresse E", email: "contact@societee.com", statut: "en attente", motDePasse: "mdp" },
    { id: 3, societe: "Société F", adresse: "Adresse F", email: "contact@societef.com", statut: "en attente", motDePasse: "mdp" },
    { id: 4, societe: "Société G", adresse: "Adresse G", email: "contact@societeg.com", statut: "en attente", motDePasse: "mdp" },
    { id: 5, societe: "Société H", adresse: "Adresse H", email: "contact@societeh.com", statut: "en attente", motDePasse: "mdp" },
    { id: 6, societe: "Société I", adresse: "Adresse I", email: "contact@societei.com", statut: "en attente", motDePasse: "mdp" },
    { id: 7, societe: "Société J", adresse: "Adresse J", email: "contact@societej.com", statut: "en attente", motDePasse: "mdp" },
    { id: 8, societe: "Société K", adresse: "Adresse K", email: "contact@societek.com", statut: "en attente", motDePasse: "mdp" },
    { id: 9, societe: "Société L", adresse: "Adresse L", email: "contact@societel.com", statut: "en attente", motDePasse: "mdp" },
    { id: 10, societe: "Société M", adresse: "Adresse M", email: "contact@societem.com", statut: "en attente", motDePasse: "mdp" }
];

let livre_DOr = [
    {"id": 1, "prestataireId": 1, "nomUtilisateur": "John Doe", "evaluation": 5, "message": "Excellent service, j'adore !", "date": "30 Octobre 2025"},
    {"id": 2, "prestataireId": 1, "nomUtilisateur": "Le festifroussard", "evaluation": 4, "message": "Je me suis péter le bide !", "date": "31 Octobre 2025"}
]

let articles = [
    { "id": 1, "prestataireId": 1, "nom": 'Menu Whopper', "description": 'Menu complet avec burger, frites et boisson', "prix": 8.99, "stock": 1000, "image": require("../assets/menu_whopper.png")},
    { "id": 2, "prestataireId": 1, "nom": 'Menu Double Cheese Bacon', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 500, "image": require("../assets/menu-doubleCheeseBacon.png")},
    { "id": 3, "prestataireId": 1, "nom": 'Menu Big King', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 735, "image": require("../assets/menu_bigKing.png")},
    { "id": 4, "prestataireId": 1, "nom": 'Menu Big Fish', "description": 'Burger avec fromage, frites et boisson', "prix": 7.99, "stock": 321, "image": require("../assets/menu_bigFish.png")},
    { "id": 5, "prestataireId": 1, "nom": 'Menu Veggie Whopper', "description": 'Burger avec fromage, frites et boisson', "prix": 6.99, "stock": 120, "image": require("../assets/menu_veggieWhopper.png")},
    { "id": 6, "prestataireId": 1, "nom": 'Menu Steakhouse', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 60, "image": require("../assets/menu_steakHouse.png")},
    { "id": 7, "prestataireId": 1, "nom": 'Menu Double Steakhouse', "description": 'Burger avec fromage, frites et boisson', "prix": 10.99, "stock": 148, "image": require("../assets/menu_doubleSteakHouse.png")},
    { "id": 8, "prestataireId": 1, "nom": 'Menu Chicken Spicy', "description": 'Burger avec fromage, frites et boisson', "prix": 8.99, "stock": 20, "image": require("../assets/menu_chickenSpicy.png")},
    { "id": 9, "prestataireId": 1, "nom": 'Menu Master Poulet Cantal', "description": 'Burger avec fromage, frites et boisson', "prix": 12.99, "stock": 0, "image": require("../assets/menu-masterPouletCantal.png")},
    { "id": 10, "prestataireId": 1, "nom": 'Menu Cheddar Lover', "description": 'Burger avec fromage, frites et boisson', "prix": 13.99, "stock": 462, "image": require("../assets/menu_cheddarLover.png")},
    { "id": 11, "prestataireId": 1, "nom": 'Menu Wrap Chicken Louisiane', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 251, "image": require("../assets/menu_wrapChickenLouisiane.png")},
    { "id": 12, "prestataireId": 1, "nom": 'Menu Wrap Crousty Chevre', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 250, "image": require("../assets/menu_wrapCroustyChevre.png")},
    { "id": 13, "prestataireId": 1, "nom": 'Menu Wrap Chicken Cheese & Bacon', "description": 'Burger avec fromage, frites et boisson', "prix": 10.99, "stock": 152, "image": require("../assets/menu_wrapChickenCheeseAndBacon.png")},
    { "id": 14, "prestataireId": 1, "nom": 'Menu Big King XXL', "description": 'Burger avec fromage, frites et boisson', "prix": 11.99, "stock": 30, "image": require("../assets/menu_bigKingXXL.png")},
    { "id": 15, "prestataireId": 1, "nom": 'Menu Crispy Chicken Cheese', "description": 'Burger avec fromage, frites et boisson', "prix": 9.99, "stock": 332, "image": require("../assets/menu_crispyChickenCheese.png")},
    { "id": 16, "prestataireId": 1, "nom": 'Menu Veggie Steakhouse', "description": 'Burger avec fromage, frites et boisson', "prix": 8.99, "stock": 30, "image": require("../assets/menu_veggieSteakhouse.png")},
    { "id": 17, "prestataireId": 1, "nom": 'Menu Chicken Louisiane Steakhouse', "description": 'Burger avec fromage, frites et boisson', "prix": 13.99, "stock": 76, "image": require("../assets/menu_ChickenLouisianeSteakhouse.png")},
    { "id": 18, "prestataireId": 1, "nom": 'Menu Double Cheese Bacon XXL', "description": 'Burger avec fromage, frites et boisson', "prix": 10.99, "stock": 612, "image": require("../assets/menu-doubleCheeseBaconXXL.png")},

    { "id": 19, "prestataireId": 2, "nom": 'Figurine Pop Ca le clown', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Ca.jpg")},
    { "id": 20, "prestataireId": 2, "nom": 'Figurine Pop Eleven', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_11.jpg")},
    { "id": 21, "prestataireId": 2, "nom": 'Figurine Pop Annabelle', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Annabelle.jpg")},
    { "id": 22, "prestataireId": 2, "nom": 'Figurine Pop Chucky', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Chucky.jpg")},
    { "id": 23, "prestataireId": 2, "nom": 'Figurine Pop Vecna', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Vecna.jpg")},
    { "id": 24, "prestataireId": 2, "nom": 'Figurine Pop Garfield', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Garfield.jpg")},
    { "id": 25, "prestataireId": 2, "nom": 'Figurine Pop Demongorgon', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_demongorgon.jpg")},
    { "id": 26, "prestataireId": 2, "nom": 'Figurine Pop Hannibal Lecter', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Hannibal.jpg")},
    { "id": 27, "prestataireId": 2, "nom": 'Figurine Pop Micheal Jackson (Thriller)', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Jackson.jpg")},
    { "id": 28, "prestataireId": 2, "nom": 'Figurine Pop Jason Voorhees', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Jason.jpg")},
    { "id": 29, "prestataireId": 2, "nom": 'Figurine Pop Micheal Myers', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_MichealMyers.jpg")},
    { "id": 30, "prestataireId": 2, "nom": 'Figurine Pop Mr Beans', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_MrBeans.jpg")},
    { "id": 31, "prestataireId": 2, "nom": 'Figurine Pop La Nonne', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Nonne.jpg")},
    { "id": 32, "prestataireId": 2, "nom": 'Figurine Pop Jigsaw', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Saw.jpg")},
    { "id": 33, "prestataireId": 2, "nom": 'Figurine Pop Ghostface', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Scream.jpg")},
    { "id": 34, "prestataireId": 2, "nom": 'Figurine Pop Garde Squid Game', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_squidGame.jpg")},
    { "id": 35, "prestataireId": 2, "nom": 'Figurine Pop Mickey Magicien', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_evilMickey.jpg")},
    { "id": 36, "prestataireId": 2, "nom": 'Figurine Pop Mercredi', "description": "Cette figurine va vous glasser le sang attention a ne pas croiser son regard", "prix": 18.99, "stock": 10, "image": require("../assets/figurine_Adams.jpg")}
];

let panier_article = []

let reservation_article = []

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
    { "id_place": 1, "id_concert": 1, "type_place": "Fosse", "nb_places": 300, "prix_place": 5 },
    { "id_place": 2, "id_concert": 2, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_place": 3, "id_concert": 3, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 4, "id_concert": 4, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 5, "id_concert": 5, "type_place": "Fosse", "nb_places": 300, "prix_place": 25 },
    { "id_place": 6, "id_concert": 6, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_place": 7,"id_concert": 7, "type_place": "Fosse", "nb_places": 300, "prix_place": 8 },
    { "id_place": 8,"id_concert": 8, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 9, "id_concert": 9, "type_place": "Fosse", "nb_places": 300, "prix_place": 30 },
    { "id_place": 10, "id_concert": 10, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 11, "id_concert": 11, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 12, "id_concert": 12, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 13, "id_concert": 13, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 14, "id_concert": 14, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 15, "id_concert": 15, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 16, "id_concert": 16, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_place": 17,"id_concert": 17, "type_place": "Fosse", "nb_places": 300, "prix_place": 20 },
    { "id_place": 18,"id_concert": 18, "type_place": "Fosse", "nb_places": 300, "prix_place": 3 },
    { "id_place": 19,"id_concert": 19, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
    { "id_place": 20, "id_concert": 20, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 21, "id_concert": 21, "type_place": "Fosse", "nb_places": 300, "prix_place": 10 },
    { "id_place": 22, "id_concert": 22, "type_place": "Fosse", "nb_places": 300, "prix_place": 15 },
];

let panier_concert = [];

let reservation_concert = [];

let coordonnees_bancaire = [
    {'nom': 'Doe', "numero_carte": "123456789ABCDEFG", 'date_expiration': "11/31", 'cvv': '484'}
]

let transactions = [
    {"id": 1, "date": "05 novembre 2024 15:30", "operation": "Remboursement", "details": "Remboursement de 10.00 €", "amount": 10.00, "id_utilisateur": 1},
    {"id": 2, "date": "31 octobre 2024 23:00", "operation": "Paiement BAR", "details": "1x Consigne Gobelet", "amount": 2.00, "id_utilisateur": 1},
    {"id": 3, "date": "31 octobre 2024 21:00", "operation": "Paiement BAR", "details": "1x Consigne Gobelet - 2.00 €\n1x Coca Cola - 4.00 €", "amount": -6.00, "id_utilisateur": 1},
    {"id": 4, "date": "31 octobre 2024 20:30", "operation": "Paiement Burger&co", "details": "1x Frites - 4.00 €\n1x Cheese Burger - 12.00 €", "amount": -16.00, "id_utilisateur": 2}
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
    {"id": 1, "nomCircuit": "La FrayeuRoute", "date": "Mercredi 29 octobre", "heure": "20h00", "nb_places": 250 },
    {"id": 2, "nomCircuit": "La FrayeuRoute", "date": "Vendredi 31 octobre", "heure": "20h00", "nb_places": 250 },
    {"id": 3, "nomCircuit": "La FrayeuRoute", "date": "Dimanche 2 novembre", "heure": "20h00", "nb_places": 250 },
    {"id": 4, "nomCircuit": "L'ÉpouvanTour", "date": "Mercredi 29 octobre", "heure": "22h00", "nb_places": 200 },
    {"id": 5, "nomCircuit": "L'ÉpouvanTour", "date": "Vendredi 31 octobre", "heure": "22h00", "nb_places": 200 },
    {"id": 6, "nomCircuit": "L'ÉpouvanTour", "date": "Dimanche 2 novembre", "heure": "22h00", "nb_places": 200 }
];

let cine_films = [
    {"id": 1, "nomFilm": "Shining", "date": "10-27-2025", "heure": "22h00", "duree": "1", "image": require("../assets/shining.jpg"), "salle": "Salle 1"},
    {"id": 2, "nomFilm": "The Thing", "date": "10-28-2025", "heure": "19h00", "duree": "1", "image": require("../assets/the_thing.jpg"), "salle": "Salle 2"},
    {"id": 3, "nomFilm": "l'Exorciste", "date": "10-29-2025", "heure": "21h00", "duree": "1", "image": require("../assets/the_exorcist.jpg"), "salle": "Salle 3"},
    {"id": 4, "nomFilm": "Alien", "date": "10-29-2025", "heure": "22h00", "duree": "1", "image": require("../assets/alien_romulus.jpg"), "salle": "Salle 4"},
    {"id": 5, "nomFilm": "Psychose", "date": "10-29-2025", "heure": "00h00", "duree": "1", "image": require("../assets/psychose.jpg"), "salle": "Salle 1"},
    {"id": 6, "nomFilm": "Massacre à la tronçonneuse", "date": "10-30-2025", "heure": "21h00", "duree": "1", "image": require("../assets/massacre_troncon.jpg"), "salle": "Salle 2"},
    {"id": 7, "nomFilm": "Conjuring", "date": "10-30-2025", "heure": "23h00", "duree": "1", "image": require("../assets/conjuring.jpg"), "salle": "Salle 3"},
    {"id": 8, "nomFilm": "La Nuit des masques", "date": "10-31-2025", "heure": "18h00", "duree": "1", "image": require("../assets/nuit_des_masques.jpg"), "salle": "Salle 4"},
    {"id": 9, "nomFilm": "[REC]", "date": "10-31-2025", "heure": "21h00", "duree": "1", "image": require("../assets/rec.jpg"), "salle": "Salle 1"},
    {"id": 10, "nomFilm": "Suspiria", "date": "10-31-2025", "heure": "22h00", "duree": "1", "image": require("../assets/suspiria.jpg"), "salle": "Salle 2"},
    {"id": 11, "nomFilm": "Le Projet Blair Witch", "date": "10-31-2025", "heure": "23h00", "duree": "1", "image": require("../assets/projet_blair_witch.jpg"), "salle": "Salle 3"},
    {"id": 12, "nomFilm": "Rosemary's Baby", "date": "11-01-2025", "heure": "18h00", "duree": "1", "image": require("../assets/rosemary_baby.jpg"), "salle": "Salle 4"},
    {"id": 13, "nomFilm": "Scream", "date": "11-01-2025", "heure": "19h00", "duree": "1", "image": require("../assets/scream.jpg"),  "salle": "Salle 1"},
    {"id": 14, "nomFilm": "Saw", "date": "11-01-2025", "heure": "20h00", "duree": "1", "image": require("../assets/saw.jpg"), "salle": "Salle 2"},
    {"id": 15, "nomFilm": "The Ring", "date": "11-01-2025", "heure": "21h00", "duree": "1", "image": require("../assets/the_ring.jpg"), "salle": "Salle 3"},
    {"id": 16, "nomFilm": "Freddy sort de la nuit", "date": "11-01-2025", "heure": "23h00", "duree": "1", "image": require("../assets/freddy_sort_nuit.jpg"), "salle": "Salle 4"},
    {"id": 17, "nomFilm": "Evil Dead", "date": "11-01-2025", "heure": "01h00", "duree": "1", "image": require("../assets/evil_dead.jpg"), "salle": "Salle 1"},
    {"id": 18, "nomFilm": "The Descent", "date": "11-02-2025", "heure": "18h00", "duree": "1", "image": require("../assets/the_descend.jpg"), "salle": "Salle 2"},
    {"id": 19, "nomFilm": "Les Dents de la mer", "date": "11-02-2025", "heure": "20h00", "duree": "1", "image": require("../assets/dents_de_mer.jpg"), "salle": "Salle 3"},
    {"id": 20, "nomFilm": "Le Silence des agneaux", "date": "11-02-2025", "heure": "21h00", "duree": "1", "image": require("../assets/silence_agneaux.jpg"), "salle": "Salle 4"},
    {"id": 21, "nomFilm": "Insidious", "date": "11-02-2025", "heure": "22h00", "duree": "1", "image": require("../assets/insidious.jpg"), "salle": "Salle 2"},
    {"id": 22, "nomFilm": "Sinister", "date": "11-02-2025", "heure": "23h00", "duree": "1", "image": require("../assets/sinister.jpg"), "salle": "Salle 3"},
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

let reserve_film = [
    {'nb_places_prises':'2', 'type_place_prises':'Fosse'}
];

let signalement = []

let soireeBaltrouille = [
    { "id_soiree": 1, "date": "2025-10-27", "description": "Soirée d'ouverture terrifiante avec DJ Zombie.", "deguisementsIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { "id_soiree": 2, "date": "2025-10-28", "description": "Soirée Disco'Horreur avec un décor ensanglanté.", "deguisementsIds": [1] },
    { "id_soiree": 3, "date": "2025-10-29", "description": "Soirée Masques et Mystères - Venez masqués !", "deguisementsIds": [1, 3] },
    { "id_soiree": 4, "date": "2025-10-30", "description": "Soirée spéciale Thriller avec surprises macabres.", "deguisementsIds": [2, 3] },
    { "id_soiree": 5, "date": "2025-10-31", "description": "Grande Nuit d'Halloween avec un concours de costumes !", "deguisementsIds": [3] },
    { "id_soiree": 6, "date": "2025-11-01", "description": "Soirée des âmes perdues avec ambiance gothique.", "deguisementsIds": [2] },
    { "id_soiree": 7, "date": "2025-11-02", "description": "Soirée de clôture - Dansez avec les esprits !", "deguisementsIds": [1] },
]

let deguisements = [
    {'id_costume':1, 'nom_costume':'Reine Zombie', 'prix':9.99,'image':require("../assets/costume_reine_zombie.jpeg")},
    {'id_costume':2, 'nom_costume':'Zombie Glouton', 'prix':9.99,'image':require("../assets/costume_zombie_glouton.jpeg")},
    {'id_costume':3, 'nom_costume':'Zombie en costume', 'prix':9.99,'image':require("../assets/costume_zombie_distingue.jpeg")},
    {'id_costume':4, 'nom_costume':'Zombie Noir', 'prix':9.99,'image':require("../assets/costume_zombie_noire.jpeg")},
    {'id_costume':5, 'nom_costume':'Zombie Classique', 'prix':9.99,'image':require("../assets/costume_zombie_enfant.jpeg")},
    {'id_costume':6, 'nom_costume':'Pom-Pom Zombie', 'prix':9.99,'image':require("../assets/pompom_zombie.jpeg")},
    {'id_costume':7, 'nom_costume':'Roi Zombie', 'prix':9.99,'image':require("../assets/roi_zombie.jpeg")},
    {'id_costume':8, 'nom_costume':'Zombie (Plants vs Zombie)', 'prix':9.99,'image':require("../assets/zombie_plants.jpeg")},
    {'id_costume':9, 'nom_costume':'Zombie Chirurgien', 'prix':9.99,'image':require("../assets/zombie_malade.jpeg")},
    {'id_costume':10, 'nom_costume':'Zombie Pretre', 'prix':9.99,'image':require("../assets/pretre_zombie.jpeg")},
    {'id_costume':11, 'nom_costume':'Zombie Militaire', 'prix':9.99,'image':require("../assets/zombie_militaire.jpeg")},
    {'id_costume':12, 'nom_costume':'Zombie Mariée', 'prix':9.99,'image':require("../assets/zombie_marie.jpeg")},
    {'id_costume':13, 'nom_costume':'Zombie Quaterback', 'prix':9.99,'image':require("../assets/zombie_sportif.jpeg")},
    {'id_costume':14, 'nom_costume':'Zombie Singe', 'prix':9.99,'image':require("../assets/zombie_singe.jpeg")},
    {'id_costume':15, 'nom_costume':'Chasseur de Zombie', 'prix':9.99,'image':require("../assets/chasseur_zombie.jpeg")},
]

let taille_deguisements = [
    {'id_deguisement':1, 'taille':'XS','quantite':3},
    {'id_deguisement':1, 'taille':'S','quantite':2},
    {'id_deguisement':1, 'taille':'M','quantite':1},
    {'id_deguisement':1, 'taille':'L','quantite':5},
    {'id_deguisement':1, 'taille':'XL','quantite':1},
    {'id_deguisement':2, 'taille':'XS','quantite':2},
    {'id_deguisement':2, 'taille':'S','quantite':2},
    {'id_deguisement':2, 'taille':'M','quantite':1},
    {'id_deguisement':2, 'taille':'L','quantite':4},
    {'id_deguisement':2, 'taille':'XL','quantite':1},
    {'id_deguisement':3, 'taille':'XS','quantite':7},
    {'id_deguisement':3, 'taille':'S','quantite':2},
    {'id_deguisement':3, 'taille':'M','quantite':1},
    {'id_deguisement':3, 'taille':'L','quantite':2},
    {'id_deguisement':3, 'taille':'XL','quantite':10},
    {'id_deguisement':4, 'taille':'XS','quantite':1},
    {'id_deguisement':4, 'taille':'S','quantite':2},
    {'id_deguisement':4, 'taille':'M','quantite':1},
    {'id_deguisement':4, 'taille':'L','quantite':1},
    {'id_deguisement':4, 'taille':'XL','quantite':1},
    {'id_deguisement':5, 'taille':'XS','quantite':1},
    {'id_deguisement':5, 'taille':'S','quantite':2},
    {'id_deguisement':5, 'taille':'M','quantite':1},
    {'id_deguisement':5, 'taille':'L','quantite':1},
    {'id_deguisement':5, 'taille':'XL','quantite':1},
    {'id_deguisement':6, 'taille':'XS','quantite':1},
    {'id_deguisement':6, 'taille':'S','quantite':2},
    {'id_deguisement':6, 'taille':'M','quantite':1},
    {'id_deguisement':6, 'taille':'L','quantite':1},
    {'id_deguisement':6, 'taille':'XL','quantite':1},
    {'id_deguisement':7, 'taille':'XS','quantite':1},
    {'id_deguisement':7, 'taille':'S','quantite':2},
    {'id_deguisement':7, 'taille':'M','quantite':1},
    {'id_deguisement':7, 'taille':'L','quantite':1},
    {'id_deguisement':7, 'taille':'XL','quantite':1},
    {'id_deguisement':8, 'taille':'XS','quantite':1},
    {'id_deguisement':8, 'taille':'S','quantite':2},
    {'id_deguisement':8, 'taille':'M','quantite':1},
    {'id_deguisement':8, 'taille':'L','quantite':1},
    {'id_deguisement':8, 'taille':'XL','quantite':1},
    {'id_deguisement':9, 'taille':'XS','quantite':1},
    {'id_deguisement':9, 'taille':'S','quantite':2},
    {'id_deguisement':9, 'taille':'M','quantite':1},
    {'id_deguisement':9, 'taille':'L','quantite':1},
    {'id_deguisement':9, 'taille':'XL','quantite':1},
    {'id_deguisement':10, 'taille':'XS','quantite':1},
    {'id_deguisement':10, 'taille':'S','quantite':2},
    {'id_deguisement':10, 'taille':'M','quantite':1},
    {'id_deguisement':10, 'taille':'L','quantite':1},
    {'id_deguisement':10, 'taille':'XL','quantite':1},
    {'id_deguisement':11, 'taille':'XS','quantite':1},
    {'id_deguisement':11, 'taille':'S','quantite':2},
    {'id_deguisement':11, 'taille':'M','quantite':1},
    {'id_deguisement':11, 'taille':'L','quantite':1},
    {'id_deguisement':11, 'taille':'XL','quantite':1},
    {'id_deguisement':12, 'taille':'XS','quantite':1},
    {'id_deguisement':12, 'taille':'S','quantite':2},
    {'id_deguisement':12, 'taille':'M','quantite':1},
    {'id_deguisement':12, 'taille':'L','quantite':1},
    {'id_deguisement':12, 'taille':'XL','quantite':1},
    {'id_deguisement':13, 'taille':'XS','quantite':1},
    {'id_deguisement':13, 'taille':'S','quantite':2},
    {'id_deguisement':13, 'taille':'M','quantite':1},
    {'id_deguisement':13, 'taille':'L','quantite':1},
    {'id_deguisement':13, 'taille':'XL','quantite':1},
    {'id_deguisement':14, 'taille':'XS','quantite':1},
    {'id_deguisement':14, 'taille':'S','quantite':2},
    {'id_deguisement':14, 'taille':'M','quantite':1},
    {'id_deguisement':14, 'taille':'L','quantite':1},
    {'id_deguisement':14, 'taille':'XL','quantite':1},
    {'id_deguisement':15, 'taille':'XS','quantite':1},
    {'id_deguisement':15, 'taille':'S','quantite':2},
    {'id_deguisement':15, 'taille':'M','quantite':1},
    {'id_deguisement':15, 'taille':'L','quantite':1},
    {'id_deguisement':15, 'taille':'XL','quantite':1},
];

let panier_deguisement = []

let location_deguisement = []

let carres = [
    {"id_carre":1, "type":"Carré VIP", "prix":100, "prixPersonne":20},
    {"id_carre":2, "type":"Carré Ultra VIP", "prix":150, "prixPersonne":30}
]

let bouteilles = [
    {"id_bouteille": 1, "type": "Champagne", "prix": 50},
    {"id_bouteille": 2, "type": "Vodka", "prix": 40},
    {"id_bouteille": 3, "type": "Whisky", "prix": 60},
    {"id_bouteille": 4, "type": "Tequila", "prix": 45},
];

let reservation_carihorreur = [
    {"id_reservation":1, "id_utilisateur": 1, "dateCarre":"2025-10-27", "id_carre": 1, "nbPersonne": 5, "bouteilles": [{"id_bouteille": 2, "quantite": 2}]}
]

let demandeUberFlippe = [
    {"id_demande":1, "zone":"Bosquepouvante","nbPersonne":3,"description":"Jeune homme noir cheveux blond et yeux bridé"}
]

let reservations_cauchemarathon= [
    {"id_reservation":1, "id_utilisateur": 1, "id_course": 1, "nb_places": 2},
]



module.exports = {
    utilisateurs,
    organisateurs,
    prestataires,
    livre_DOr,
    articles,
    panier_article,
    reservation_article,
    concerts,
    places_concerts,
    panier_concert,
    reservation_concert,
    coordonnees_bancaire,
    artistes,
    transactions,
    expo_oeuvres,
    expo_oeuvres_demande,
    courses_cauchemarathon,
    cine_films,
    places_films,
    reserve_film,
    signalement,
    soireeBaltrouille,
    deguisements,
    taille_deguisements,
    panier_deguisement,
    location_deguisement,
    carres,
    bouteilles,
    reservation_carihorreur,
    demandeUberFlippe,
    reservations_cauchemarathon,
    demandesPrestataires,
    demandesOrganisateurs
}
