/*DROP TABLE IF EXISTS gere CASCADE;
DROP TABLE IF EXISTS organise CASCADE;
DROP TABLE IF EXISTS Signalement CASCADE;
DROP TABLE IF EXISTS panier_article CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS livre_dor CASCADE;
DROP TABLE IF EXISTS Taille_deguisement CASCADE;
DROP TABLE IF EXISTS Deguisement CASCADE;
DROP TABLE IF EXISTS Films CASCADE;
DROP TABLE IF EXISTS Course_cauchemarathon CASCADE;
DROP TABLE IF EXISTS Expo_oeuvre CASCADE;
DROP TABLE IF EXISTS Place_concert CASCADE;
DROP TABLE IF EXISTS Concert CASCADE;
DROP TABLE IF EXISTS Reservation_prestation CASCADE;
DROP TABLE IF EXISTS prestation CASCADE;
DROP TABLE IF EXISTS Billet_festival CASCADE;
DROP TABLE IF EXISTS Evenement CASCADE;
DROP TABLE IF EXISTS Billet_activite CASCADE;
DROP TABLE IF EXISTS Activite CASCADE;
DROP TABLE IF EXISTS Zone CASCADE;
DROP TABLE IF EXISTS Transaction CASCADE;
DROP TABLE IF EXISTS coordonnees_bancaire CASCADE;
DROP TABLE IF EXISTS demande_uber_flippe CASCADE;
DROP TABLE IF EXISTS demandes_prestataires CASCADE;
DROP TABLE IF EXISTS demandes_organisateurs CASCADE;
DROP TABLE IF EXISTS Bouteille CASCADE;
DROP TABLE IF EXISTS Carre CASCADE;
DROP TABLE IF EXISTS Organisateur CASCADE;
DROP TABLE IF EXISTS prestataire CASCADE;
DROP TABLE IF EXISTS Prestataire CASCADE;
DROP TABLE IF EXISTS Prestation CASCADE;

DROP TABLE IF EXISTS Utilisateur CASCADE;


CREATE TABLE Utilisateur (
    id UUID PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naissance TIMESTAMP NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    solde DECIMAL NOT NULL,
    num_cashless UUID NOT NULL,
    qr_code VARCHAR(50),
    est_festivalier BOOLEAN NOT NULL
);

CREATE TABLE prestataire (
    id UUID PRIMARY KEY,
    societe VARCHAR(50) NOT NULL,
    adresse VARCHAR(150),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE Organisateur (
    id UUID PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    tel VARCHAR(15),
    password VARCHAR(150) NOT NULL
);

CREATE TABLE Transaction (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    operation VARCHAR(30) NOT NULL,
    details VARCHAR(75),
    montant DECIMAL NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE Zone (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Activite (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    date TIMESTAMP NOT NULL,
    prix INT NOT NULL,
    places_disponibles INT NOT NULL,
    zone_id INT REFERENCES Zone(id) ON DELETE CASCADE
);

CREATE TABLE Billet_activite (
    id SERIAL PRIMARY KEY,
    date_achat TIMESTAMP NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    activite_id INT REFERENCES Activite(id) ON DELETE CASCADE
);

CREATE TABLE Evenement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL,
    lieu VARCHAR(50) NOT NULL
);

CREATE TABLE Billet_festival (
    id SERIAL PRIMARY KEY,
    date_achat TIMESTAMP NOT NULL,
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE prestation (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    description VARCHAR(150),
    image VARCHAR(50),
    zone_id INT REFERENCES Zone(id) ON DELETE CASCADE
);

CREATE TABLE Reservation_prestation (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    prestation_id INT REFERENCES prestation(id) ON DELETE CASCADE
);

CREATE TABLE Concert (
    id SERIAL PRIMARY KEY,
    artiste VARCHAR(100) NOT NULL,
    nationalite VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    duree INT NOT NULL,
    categorie VARCHAR(50),
    scene VARCHAR(50)
);

CREATE TABLE Place_concert (
    id SERIAL PRIMARY KEY,
    id_concert INT REFERENCES Concert(id) ON DELETE CASCADE,
    type_place VARCHAR(50) NOT NULL,
    nb_places INT NOT NULL,
    prix_place DECIMAL NOT NULL
);

CREATE TABLE Expo_oeuvre (
    id SERIAL PRIMARY KEY,
    createur VARCHAR(50),
    email VARCHAR(50),
    date_crea TIMESTAMP,
    description TEXT,
    image VARCHAR(50)
);

CREATE TABLE Course_cauchemarathon (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    nb_places INT NOT NULL,
    prix DECIMAL NOT NULL
);

CREATE TABLE Films (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    duree INT NOT NULL,
    image VARCHAR(50),
    categorie VARCHAR(50),
    salle VARCHAR(50),
    nb_places INT NOT NULL,
    prix DECIMAL NOT NULL
);

CREATE TABLE Deguisement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    image VARCHAR(50)
);

CREATE TABLE Taille_deguisement (
    id SERIAL PRIMARY KEY,
    taille VARCHAR(50) NOT NULL,
    quantite INT NOT NULL,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE
);

CREATE TABLE Carre (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    prixPersonne INT NOT NULL
);

CREATE TABLE Bouteille (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE Signalement (
    id SERIAL PRIMARY KEY,
    typeIncident VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    zone INT REFERENCES Zone(id) ON DELETE CASCADE,
    position VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE organise (
    activite_id INT REFERENCES Activite(id) ON DELETE CASCADE,
    organisateur_id UUID REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (activite_id, organisateur_id)
);

CREATE TABLE gere (
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    organisateur_id UUID REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (evenement_id, organisateur_id)
);

CREATE TABLE livre_dor (
    id INT PRIMARY KEY,
    prestataire_id UUID REFERENCES prestataire(id) ON DELETE CASCADE,
    nom_utilisateur VARCHAR(255) NOT NULL,
    evaluation INT CHECK (evaluation BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE articles (
    id INT PRIMARY KEY,
    prestataire_id UUID REFERENCES prestataire(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image VARCHAR(255) 
);

CREATE TABLE panier_article (
    id INT PRIMARY KEY,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    quantite INT NOT NULL
);

CREATE TABLE coordonnees_bancaire (
    nom VARCHAR(255) NOT NULL,
    numero_carte CHAR(16) NOT NULL,
    date_expiration CHAR(5) NOT NULL,
    cvv CHAR(3) NOT NULL
);

CREATE TABLE demande_uber_flippe (
    id_demande INT PRIMARY KEY,
    zone VARCHAR(255) NOT NULL,
    nb_personne INT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE demandes_prestataires (
    id INT PRIMARY KEY,
    societe VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE demandes_organisateurs (
    id INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel CHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO utilisateur (id, nom, prenom, date_naissance, mail, password, solde, num_cashless, qr_code, est_festivalier)
VALUES
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6', 'lahasbaaa', 'yahia', '1998-09-20', 'yahia.lahasbaa@example.com', 'password123', 500, '8b975371-9be6-47cc-a121-9861430bb266', 'QR1234', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7', 'lafrime', 'tim', '1999-10-15', 'tim.lafrime@example.com', 'password1', 0, '8b975371-9be6-47cc-a121-9861430bb267', 'QR5678', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f8', 'letueur', 'enzo', '1997-05-12', 'enzo.letueur@example.com', 'password2', 1000, '8b975371-9be6-47cc-a121-9861430bb268', 'QR9101', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9', 'lemalfrat', 'harry', '1996-03-07', 'harry.lemalfrat@example.com', 'password3', 600, '8b975371-9be6-47cc-a121-9861430bb269', 'QR1121', FALSE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f0', 'lamenace', 'mathéo', '2000-12-25', 'matheo.lamenace@example.com', 'password', 800, '8b975371-9be6-47cc-a121-9861430bb260', 'QR3141', TRUE);

INSERT INTO prestataire (id, societe, adresse, email, password)
VALUES
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f1', 'UberFlippe', '1 rue de la peur', 'uberflippe@outlook.fr', 'mpd123'),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f2', 'Burger&co', '2 rue de la frite', 'burgerandco@gmail.com', 'mpd456');

INSERT INTO organisateur (id ,nom, prenom, email, tel, password)
VALUES
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f3', 'Kherza', 'Jean', 'jeankherza@gmail.com',  '0612345678','mpd123'),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f4', 'Balta', 'Luc', 'lucbalta@gmail.com', '0600000000', 'mpd456');

INSERT INTO demandes_organisateurs (id, nom, prenom, email, tel, password) VALUES
(1, 'Duncan', 'Tim', 'timduncan@gmail.com', '0707070707', 'mdp'),
(2, 'Ferrari', 'Enzo', 'enzoferrari@gmail.com', '0606060606', 'mdp'),
(3, 'Touré', 'Yahia', 'yahiatoure@gmail.com', '0505050505', 'mdp'),
(4, 'Leclerc', 'Sophie', 'sophieleclerc@gmail.com', '0404040404', 'mdp'),
(5, 'Dumas', 'Antoine', 'antoinedumas@gmail.com', '0303030303', 'mdp'),
(6, 'Germain', 'Camille', 'camillegermain@gmail.com', '0202020202', 'mdp'),
(7, 'Blanc', 'Hugo', 'hugoblanc@gmail.com', '0101010101', 'mdp'),
(8, 'Renard', 'Juliette', 'julietterenard@gmail.com', '0909090909', 'mdp'),
(9, 'Fabre', 'Aurélien', 'aurelienfabre@gmail.com', '0808080808', 'mdp'),
(10, 'Fontaine', 'Chloé', 'chloefontaine@gmail.com', '0707070707', 'mdp');

INSERT INTO demandes_prestataires (id, societe, adresse, email, statut, password) VALUES
(1, 'Société D', 'Adresse D', 'contact@societed.com', 'en attente', 'mdp'),
(2, 'Société E', 'Adresse E', 'contact@societee.com', 'en attente', 'mdp'),
(3, 'Société F', 'Adresse F', 'contact@societef.com', 'en attente', 'mdp'),
(4, 'Société G', 'Adresse G', 'contact@societeg.com', 'en attente', 'mdp'),
(5, 'Société H', 'Adresse H', 'contact@societeh.com', 'en attente', 'mdp'),
(6, 'Société I', 'Adresse I', 'contact@societei.com', 'en attente', 'mdp'),
(7, 'Société J', 'Adresse J', 'contact@societej.com', 'en attente', 'mdp'),
(8, 'Société K', 'Adresse K', 'contact@societek.com', 'en attente', 'mdp'),
(9, 'Société L', 'Adresse L', 'contact@societel.com', 'en attente', 'mdp'),
(10, 'Société M', 'Adresse M', 'contact@societem.com', 'en attente', 'mdp');

INSERT INTO transaction (date, operation, details, montant, utilisateur_id)
VALUES
('2024-11-05 15:30:00', 'Remboursement', 'Remboursement de 10.00 €', 10.00, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6'),
('2024-10-31 23:00:00', 'Paiement BAR', '1x Consigne Gobelet', 2.00, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6'),
('2024-10-31 21:00:00', 'Paiement BAR', '1x Consigne Gobelet - 2.00 €\n1x Coca Cola - 4.00 €', -6.00, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6'),
('2024-10-31 20:30:00', 'Paiement Burger&co', '1x Frites - 4.00 €\n1x Cheese Burger - 12.00 €', -16.00, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7');

INSERT INTO zone (nom)
VALUES
('Foréffroi'),
('Cauchemanoir'),
('Bosquépouvante'),
('Malaispace'),
('Maudîle');

INSERT INTO activite (nom, description, date, prix, places_disponibles, zone_id)
VALUES
('Baltrouille', 'le bal de la trouille', '2024-10-25 19:00:00', 50, 100, 1),
('Concert', 'le concert de traitre gims', '2024-10-26 20:00:00', 30, 50, 2),
('Cauchemarathon', 'la course de la peur', '2024-10-27 21:00:00', 70, 30, 3),
('Carihorreur', 'la boite de nuit de la peur', '2024-10-28 22:00:00', 40, 80, 4),
('Cinépeur', 'le cinéma qui fout la frousse', '2024-10-29 18:00:00', 60, 20, 5);

INSERT INTO billet_activite (date_achat, utilisateur_id, activite_id)
VALUES
('2024-10-15 12:00:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6', 1),
('2024-10-15 12:10:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7', 2),
('2024-10-16 13:30:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f8', 3),
('2024-10-16 14:00:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9', 4),
('2024-10-17 15:20:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f0', 5);

INSERT INTO evenement (nom, description, date_debut, date_fin, lieu)
VALUES
('Festival Creepy Night', 'Le festival d’horreur annuel.', '2024-10-25 18:00:00', '2024-10-31 23:59:00', 'Audincourt');

INSERT INTO billet_festival (date_achat, evenement_id, utilisateur_id)
VALUES
('2024-10-01', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6'),
('2024-10-02', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7'),
('2024-10-03', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f8'),
('2024-10-04', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9'),
('2024-10-05', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f0');

INSERT INTO prestation (nom, prix, description, image, zone_id)
VALUES
('Objets trouvés', 30, 'récupère tes objets perdus au combat', 'objets-trouves.png', 2),
('Secuflippe', 0, 'si la frayeur est trop grosse, appelle secuflippe pour te proteger', 'secuflippe.png', 2),
('Navette', 10, 'elle est pas spatiale, elle t`emmène juste au festival', 'navette.png', 2);

INSERT INTO reservation_prestation (date, utilisateur_id, prestation_id)
VALUES
('2024-10-25 12:00:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6', 1),
('2024-10-25 12:10:00', '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7', 2);

INSERT INTO Concert (artiste, nationalite, date, heure, duree, categorie, scene)
VALUES
('BigAli', 'USA', '2025-10-27', '22:00:00', 1, 'House', 'Grande Scène'),
('Travis Scott', 'USA', '2025-10-28', '19:00:00', 1, 'Rap', 'Grande Scène'),
('Muse', 'USA', '2025-10-29', '21:00:00', 1, 'Rock', 'Grande Scène'),
('Vald', 'FR', '2025-10-29', '22:00:00', 1, 'Rap', 'Grande Scène'),
('David Guetta', 'FR', '2025-10-29', '00:00:00', 1, 'Électro', 'Grande Scène'),
('Kungs', 'FR', '2025-10-30', '21:00:00', 1, 'House', 'Grande Scène'),
('Vladimir Cauchemar', 'FR', '2025-10-30', '23:00:00', 1, 'Électro', 'Grande Scène'),
('Gims', 'FR', '2025-10-31', '18:00:00', 1, 'Rap', 'Grande Scène');

INSERT INTO Place_concert (id_concert, type_place, nb_places, prix_place)
VALUES
(1, 'Fosse', 300, 5),
(2, 'Fosse', 300, 25),
(3, 'Fosse', 300, 10),
(4, 'Fosse', 300, 10),
(5, 'Fosse', 300, 25),
(6, 'Fosse', 300, 8),
(7, 'Fosse', 300, 8),
(8, 'Fosse', 300, 15);

INSERT INTO Expo_oeuvre (createur, email, date_crea, description, image)
VALUES
('Jean Rene', 'jean.rene@outloook.fr', '2025-10-27 22:00:00', 'Statue à taille humaine de Michael Myers', 'jean_rene.png'),
('Pierre Paul', 'pierre.paul@gmail.com', '2025-10-28 19:00:00', 'Tableau de la scène de la douche de Psychose', 'pierre_paul.png'),
('Jacques Michel', 'jacques.michel@example.com', '2025-10-29 21:00:00', 'Sculpture de la tête de Freddy Krueger', 'jacques_michel.png'),
('Jeanne Marie', 'jeanne.marie@hotmail.fr', '2025-10-29 22:00:00', 'Tronconneuse Poulan 245A utilisée pour le film Massacre à la tronconneuse', 'jeanne_marie.png');

INSERT INTO Course_cauchemarathon (nom, date, nb_places, prix)
VALUES
('La FrayeuRoute', '2025-10-29 20:00:00', 150, 10),
('La FrayeuRoute', '2025-10-31 20:00:00', 150, 10),
('La FrayeuRoute', '2025-11-02 20:00:00', 150, 10),
('L''ÉpouvanTour', '2025-10-29 22:00:00', 100, 15),
('L''ÉpouvanTour', '2025-10-31 22:00:00', 100, 15),
('L''ÉpouvanTour', '2025-11-02 22:00:00', 100, 15);

INSERT INTO Films (nom, date, duree, image, categorie, salle, nb_places, prix)
VALUES
('Shining', '2025-10-27 22:00:00', 1, 'affiche_BigAli.jpg', 'House', 'Salle 1', 100, 10),
('Halloween', '2025-10-28 19:00:00', 1, 'affiche_TravisScott.jpg', 'Rap', 'Salle 2', 100, 10),
('l''Exorciste', '2025-10-29 21:00:00', 1, 'affiche_Muse.jpg', 'Rock', 'Salle 3', 100, 10),
('Alien', '2025-10-29 22:00:00', 1, 'affiche_Vald.jpg', 'Rap', 'Salle 4', 100, 10),
('Psychose', '2025-10-29 00:00:00', 1, 'affiche_DavidGuetta.jpg', 'Électro', 'Salle 1', 100, 10),
('Massacre à la tronçonneuse', '2025-10-30 21:00:00', 1, 'affiche_Kungs.jpg', 'House', 'Salle 2', 100, 10),
('Conjuring', '2025-10-30 23:00:00', 1, 'affiche_VladimirCauchemard.jpg', 'Électro', 'Salle 3', 100, 10),
('La Nuit des masques', '2025-10-31 18:00:00', 1, 'affiche_Gims.jpg', 'Rap', 'Salle 4', 100, 10),
('[REC]', '2025-10-31 21:00:00', 1, 'affiche_DaftPunk.jpg', 'Électro', 'Salle 1', 100, 10),
('Suspiria', '2025-10-31 22:00:00', 1, 'affiche_KendrickLamar.jpg', 'Rap', 'Salle 2', 100, 10),
('Le Projet Blair Witch', '2025-10-31 23:00:00', 1, 'affiche_RollingStones.jpg', 'Rock', 'Salle 3', 100, 10),
('Rosemary''s Baby', '2025-11-01 18:00:00', 1, 'affiche_Guy2Bezbar.jpg', 'Rap', 'Salle 4', 100, 10);

INSERT INTO Deguisement (nom, prix, image)
VALUES
('Sorcière', 10, 'sorciere.jpg'),
('Zombie', 15, 'zombie.jpg'),
('Vampire', 20, 'vampire.jpg'),
('Fantôme', 10, 'fantome.jpg'),
('Squelette', 15, 'squelette.jpg');

INSERT INTO Taille_deguisement (taille, quantite, deguisement_id)
VALUES
('S', 10, 1),
('M', 10, 1),
('L', 10, 1),
('XL', 10, 2),
('S', 10, 3),
('M', 10, 3),
('L', 10, 3),
('M', 10, 4),
('XL', 10, 4),
('S', 10, 5),
('M', 10, 5),
('L', 10, 5),
('XL', 10, 5);

INSERT INTO Carre (type, prix, prixPersonne)
VALUES
('Carré VIP', 100, 20),
('Carré Ultra VIP', 150, 30);

INSERT INTO Bouteille (type, prix)
VALUES
('Champagne', 100),
('Vodka', 40),
('Whisky', 60),
('Tequila', 45);

INSERT INTO Signalement (typeIncident, description, zone, position, date)
VALUES
('Aggression', 'Un homme a été agressé par un autre homme', 1, '45.0000, 5.0000', '2024-10-25 20:00:00'),
('Vol', 'Un homme a volé le sac d`une femme', 2, '45.0000, 5.0000', '2024-10-26 21:00:00'),
('Bagarre', 'Deux hommes se sont battus', 3, '45.0000, 5.0000', '2024-10-27 22:00:00'),
('Incendie', 'Un stand a pris feu', 4, '45.0000, 5.0000', '2024-10-28 23:00:00'),
('Blessure', 'Un homme est tombé et s`est blessé', 5, '45.0000, 5.0000', '2024-10-29 00:00:00');

INSERT INTO organise (activite_id, organisateur_id)
VALUES
(1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f3'),
(2, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f3'),
(3, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f4'),
(4, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f4'),
(5, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f3');

INSERT INTO gere (evenement_id, organisateur_id)
VALUES
(1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f3'),
(1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f4');
*/
DROP TABLE IF EXISTS reservation_carihorreur_bouteilles;
DROP TABLE IF EXISTS reservation_carihorreur;
DROP TABLE IF EXISTS soireeBaltrouille_deguisements;
DROP TABLE IF EXISTS soireeBaltrouille;
DROP TABLE IF EXISTS reserve_film;
DROP TABLE IF EXISTS places_films;
DROP TABLE IF EXISTS cine_films;
DROP TABLE IF EXISTS reservations_cauchemarathon;
DROP TABLE IF EXISTS demandeUberFlippe;
DROP TABLE IF EXISTS bouteilles;
DROP TABLE IF EXISTS carres;
DROP TABLE IF EXISTS location_deguisement;
DROP TABLE IF EXISTS panier_deguisement;
DROP TABLE IF EXISTS taille_deguisements;
DROP TABLE IF EXISTS deguisements;
DROP TABLE IF EXISTS expo_oeuvres_demande;
DROP TABLE IF EXISTS expo_oeuvres;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS coordonnees_bancaire;
DROP TABLE IF EXISTS reservation_concert;
DROP TABLE IF EXISTS panier_concert;
DROP TABLE IF EXISTS places_concerts;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS artistes;
DROP TABLE IF EXISTS reservation_article;
DROP TABLE IF EXISTS panier_article;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS demandesPrestataires;
DROP TABLE IF EXISTS prestataires;
DROP TABLE IF EXISTS demandesOrganisateurs;
DROP TABLE IF EXISTS organisateurs;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS signalement;
DROP TABLE IF EXISTS courses_cauchemarathon;


CREATE TABLE utilisateurs (
    id INT PRIMARY KEY,
    prenom VARCHAR(255),
    nom VARCHAR(255),
    dateNaissance VARCHAR(10),  -- format dd-mm-yyyy (ou vous pouvez utiliser DATE en convertissant le format)
    email VARCHAR(255),
    motDePasse VARCHAR(255),
    solde DECIMAL(10,2),
    numCashless INT
);

-- Table des organisateurs
CREATE TABLE organisateurs (
    id INT PRIMARY KEY,
    prenom VARCHAR(255),
    nom VARCHAR(255),
    email VARCHAR(255),
    motDePasse VARCHAR(255),
    numTelephone VARCHAR(20)
);

-- Table des demandes d'organisateurs
CREATE TABLE demandesOrganisateurs (
    id INT PRIMARY KEY,
    prenom VARCHAR(255),
    nom VARCHAR(255),
    email VARCHAR(255),
    telephone VARCHAR(20),
    motDePasse VARCHAR(255)
);

-- Table des prestataires
CREATE TABLE prestataires (
    id INT PRIMARY KEY,
    societe VARCHAR(255),
    adresse VARCHAR(255),
    email VARCHAR(255),
    motDePasse VARCHAR(255),
    theme VARCHAR(255),
    description TEXT,
    logo VARCHAR(255),
    background VARCHAR(255),
    background2 VARCHAR(255)
);

-- Table des demandes de prestataires
CREATE TABLE demandesPrestataires (
    id INT PRIMARY KEY,
    societe VARCHAR(255),
    adresse VARCHAR(255),
    email VARCHAR(255),
    statut VARCHAR(255),
    motDePasse VARCHAR(255)
);

-- Table du livre d'or
CREATE TABLE livre_DOr (
    id INT PRIMARY KEY,
    prestataireId INT,
    nomUtilisateur VARCHAR(255),
    evaluation INT,
    message TEXT,
    date VARCHAR(50),
    FOREIGN KEY (prestataireId) REFERENCES prestataires(id)
);

-- Table des articles
CREATE TABLE articles (
    id INT PRIMARY KEY,
    prestataireId INT,
    nom VARCHAR(255),
    description TEXT,
    prix DECIMAL(10,2),
    stock INT,
    image VARCHAR(255),
    FOREIGN KEY (prestataireId) REFERENCES prestataires(id)
);

-- Table du panier pour les articles
CREATE TABLE panier_article (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    articleId INT,
    quantite INT,
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (articleId) REFERENCES articles(id)
);

-- Table des réservations d'articles
CREATE TABLE reservation_article (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    articleId INT,
    quantite INT,
    dateReservation DATETIME,
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (articleId) REFERENCES articles(id)
);

-- Table des artistes
CREATE TABLE artistes (
    id INT PRIMARY KEY,
    nomGroupe VARCHAR(255),
    nbMembres INT,
    decision VARCHAR(255)  -- peut être NULL
);

-- Table des concerts
CREATE TABLE concerts (
    id INT PRIMARY KEY,
    artiste VARCHAR(255),
    nationalite VARCHAR(100),
    date VARCHAR(20),       -- format "10-27-2025", à convertir si besoin
    heure VARCHAR(20),
    duree VARCHAR(10),
    image VARCHAR(255),
    categorie VARCHAR(100),
    scene VARCHAR(255)
);

-- Table des places pour les concerts
CREATE TABLE places_concerts (
    id_place INT PRIMARY KEY,
    id_concert INT,
    type_place VARCHAR(100),
    nb_places INT,
    prix_place DECIMAL(10,2),
    FOREIGN KEY (id_concert) REFERENCES concerts(id)
);

-- Table du panier pour les concerts
CREATE TABLE panier_concert (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    concertId INT,
    quantite INT,
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (concertId) REFERENCES concerts(id)
);

-- Table des réservations de concerts
CREATE TABLE reservation_concert (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    concertId INT,
    nb_places INT,
    dateReservation DATETIME,
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (concertId) REFERENCES concerts(id)
);

-- Table des coordonnées bancaires
CREATE TABLE coordonnees_bancaire (
    nom VARCHAR(255),
    numero_carte VARCHAR(50) PRIMARY KEY,
    date_expiration VARCHAR(10),
    cvv VARCHAR(10)
);

-- Table des transactions
CREATE TABLE transactions (
    id INT PRIMARY KEY,
    date VARCHAR(50),
    operation VARCHAR(255),
    details TEXT,
    amount DECIMAL(10,2),
    id_utilisateur INT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)
);

-- Table des expositions d’œuvres
CREATE TABLE expo_oeuvres (
    id INT PRIMARY KEY,
    createur VARCHAR(255),
    email VARCHAR(255),
    dateCrea VARCHAR(20),
    description TEXT,
    image VARCHAR(255)
);

-- Table des demandes d'expositions (structure similaire à expo_oeuvres)
CREATE TABLE expo_oeuvres_demande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    createur VARCHAR(255),
    email VARCHAR(255),
    dateCrea VARCHAR(20),
    description TEXT,
    image VARCHAR(255)
);

-- Table des courses "Cauchemarathon"
CREATE TABLE courses_cauchemarathon (
    id INT PRIMARY KEY,
    nomCircuit VARCHAR(255),
    date VARCHAR(50),
    heure VARCHAR(20),
    nb_places INT
);

-- Table des films de cinéma
CREATE TABLE cine_films (
    id INT PRIMARY KEY,
    nomFilm VARCHAR(255),
    date VARCHAR(20),
    heure VARCHAR(20),
    duree VARCHAR(10),
    image VARCHAR(255),
    salle VARCHAR(100)
);

-- Table des places pour les films (clé composite)
CREATE TABLE places_films (
    id_film INT,
    type_place VARCHAR(100),
    nb_places INT,
    prix_place DECIMAL(10,2),
    PRIMARY KEY (id_film, type_place),
    FOREIGN KEY (id_film) REFERENCES cine_films(id)
);

-- Table des réservations de places de films
CREATE TABLE reserve_film (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nb_places_prises INT,
    type_place_prises VARCHAR(100)
);

-- Table des signalements (exemple de structure)
CREATE TABLE signalement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    description TEXT,
    date DATETIME
);

-- Table des soirées Baltrouille
CREATE TABLE soireeBaltrouille (
    id_soiree INT PRIMARY KEY,
    date DATE,
    description TEXT
);

-- Table de jonction pour lier une soirée à plusieurs déguisements
CREATE TABLE soireeBaltrouille_deguisements (
    id_soiree INT,
    id_deguisement INT,
    PRIMARY KEY (id_soiree, id_deguisement),
    FOREIGN KEY (id_soiree) REFERENCES soireeBaltrouille(id_soiree),
    FOREIGN KEY (id_deguisement) REFERENCES deguisements(id_costume)
);

-- Table des déguisements
CREATE TABLE deguisements (
    id_costume INT PRIMARY KEY,
    nom_costume VARCHAR(255),
    prix DECIMAL(10,2),
    image VARCHAR(255)
);

-- Table des tailles disponibles pour les déguisements (clé composite)
CREATE TABLE taille_deguisements (
    id_taille_deguisement INT PRIMARY KEY,
    id_deguisement INT,
    taille VARCHAR(10),
    quantite INT,
    PRIMARY KEY (id_deguisement, taille),
    FOREIGN KEY (id_deguisement) REFERENCES deguisements(id_costume)
);

-- Table du panier pour les déguisements
CREATE TABLE panier_deguisement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    id_deguisement INT,
    quantite INT
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_deguisement) REFERENCES deguisements(id_costume)
);

-- Table de location de déguisements
CREATE TABLE location_deguisement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateurId INT,
    id_deguisement INT,
    dateLocation DATE,
    quantite INT
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_deguisement) REFERENCES deguisements(id_costume)
);

-- Table des carrés (espaces VIP par exemple)
CREATE TABLE carres (
    id_carre INT PRIMARY KEY,
    type VARCHAR(255),
    prix DECIMAL(10,2),
    prixPersonne DECIMAL(10,2)
);

-- Table des bouteilles (ex : champagne)
CREATE TABLE bouteilles (
    id_bouteille INT PRIMARY KEY,
    type VARCHAR(255),
    prix DECIMAL(10,2)
);

-- Table des réservations pour un carré dans un "carihorreur"
CREATE TABLE reservation_carihorreur (
    id_reservation INT PRIMARY KEY,
    id_utilisateur INT,
    dateCarre DATE,
    id_carre INT,
    nbPersonne INT
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_carre) REFERENCES carres(id_carre)
);

-- Table de jonction pour associer des bouteilles à une réservation de carré
CREATE TABLE reservation_carihorreur_bouteilles (
    id_reservation INT,
    id_bouteille INT,
    quantite INT,
    PRIMARY KEY (id_reservation, id_bouteille)
    FOREIGN KEY (id_reservation) REFERENCES reservation_carihorreur(id_reservation),
    FOREIGN KEY (id_bouteille) REFERENCES bouteilles(id_bouteille)
);

-- Table des demandes UberFlippe
CREATE TABLE demandeUberFlippe (
    id_demande INT PRIMARY KEY,
    zone VARCHAR(255),
    nbPersonne INT,
    description TEXT
);

-- Table des réservations pour le Cauchemarathon
CREATE TABLE reservations_cauchemarathon (
    id_reservation INT PRIMARY KEY,
    id_utilisateur INT,
    id_course INT,
    nb_places INT
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_course) REFERENCES courses_cauchemarathon(id)
);

-- Insertion d'un organisateur
INSERT INTO `organisateurs` (`id`, `prenom`, `nom`, `email`, `motDePasse`, `numTelephone`)
VALUES (1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'MotDePasse123!', '0612345678');

-- Insertion de deux demandes de prestataires
INSERT INTO `demandesPrestataires` (`id`, `societe`, `adresse`, `email`, `statut`, `motDePasse`)
VALUES 
    (1, 'HorreurEvents', '13 Rue de l’Épouvante, 75001 Paris', 'contact@horreurevents.com', 'En attente', 'PassHorreur123!'),
    (2, 'FreakyShow', '42 Avenue des Cauchemars, 69002 Lyon', 'info@freakyshow.fr', 'Approuvée', 'FreakyPass456!');
