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
DROP TABLE IF EXISTS billet_festival CASCADE;
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

CREATE TABLE billet_festival (
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
-- Table Utilisateur
DROP TABLE IF EXISTS texte_accueil;
DROP TABLE IF EXISTS reservation_carihorreur_bouteilles;
DROP TABLE IF EXISTS reservations_cauchemarathon;
DROP TABLE IF EXISTS reservation_carihorreur;
DROP TABLE IF EXISTS location_deguisement;
DROP TABLE IF EXISTS panier_deguisement;
DROP TABLE IF EXISTS soireeBaltrouille_deguisements;
DROP TABLE IF EXISTS soireeBaltrouille;
DROP TABLE IF EXISTS reserve_film;
DROP TABLE IF EXISTS places_films;
DROP TABLE IF EXISTS reservation_concert;
DROP TABLE IF EXISTS panier_concert;
DROP TABLE IF EXISTS artistes;
DROP TABLE IF EXISTS reservation_article;
DROP TABLE IF EXISTS demandes_organisateurs;
DROP TABLE IF EXISTS demandes_prestataires;
DROP TABLE IF EXISTS demande_uber_flippe;
DROP TABLE IF EXISTS coordonnees_bancaire;
DROP TABLE IF EXISTS panier_article;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS livre_dor;
DROP TABLE IF EXISTS gere;
DROP TABLE IF EXISTS organise;
DROP TABLE IF EXISTS Signalement;
DROP TABLE IF EXISTS Bouteille;
DROP TABLE IF EXISTS Carre;
DROP TABLE IF EXISTS Taille_deguisement;
DROP TABLE IF EXISTS Deguisement;
DROP TABLE IF EXISTS Films;
DROP TABLE IF EXISTS Course_cauchemarathon;
DROP TABLE IF EXISTS Expo_oeuvre;
DROP TABLE IF EXISTS Place_concert;
DROP TABLE IF EXISTS Concert;
DROP TABLE IF EXISTS Reservation_prestation;
DROP TABLE IF EXISTS prestation;
DROP TABLE IF EXISTS billet_festival;
DROP TABLE IF EXISTS Evenement;
DROP TABLE IF EXISTS Billet_activite;
DROP TABLE IF EXISTS Activite;
DROP TABLE IF EXISTS Zone;
DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Organisateur;
DROP TABLE IF EXISTS emplacement;
DROP TABLE IF EXISTS icone_carte;
DROP TABLE IF EXISTS prestataire;
DROP TABLE IF EXISTS Utilisateur;

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

-- Table prestataire (ajout des colonnes theme, description, logo, background, background2)
CREATE TABLE prestataire (
    id UUID PRIMARY KEY,
    societe VARCHAR(50) NOT NULL,
    adresse VARCHAR(150),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    theme VARCHAR(50),
    description TEXT,
    logo VARCHAR(100),
    background VARCHAR(100),
    background2 VARCHAR(100)
);

CREATE TABLE icone_carte(
    id SERIAL PRIMARY KEY,
    nom_image VARCHAR(100) NOT NULL
);

CREATE TABLE emplacement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    coord_x INT NOT NULL,
    coord_y INT NOT NULL,
    prestataire_id UUID REFERENCES prestataire(id) ON DELETE SET NULL,
    icone_id INTEGER REFERENCES icone_carte(id) ON DELETE SET NULL
);
-- Table Organisateur
CREATE TABLE Organisateur (
    id UUID PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    tel VARCHAR(15),
    password VARCHAR(150) NOT NULL
);

-- Table Transaction
CREATE TABLE Transaction (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    operation VARCHAR(30) NOT NULL,
    details VARCHAR(75),
    montant DECIMAL NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE
);

-- Table Zone
CREATE TABLE Zone (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL
);

-- Table Activite
CREATE TABLE Activite (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    date TIMESTAMP NOT NULL,
    prix INT NOT NULL,
    places_disponibles INT NOT NULL,
    zone_id INT REFERENCES Zone(id) ON DELETE CASCADE
);

-- Table Billet_activite
CREATE TABLE Billet_activite (
    id SERIAL PRIMARY KEY,
    date_achat TIMESTAMP NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    activite_id INT REFERENCES Activite(id) ON DELETE CASCADE
);

-- Table Evenement
CREATE TABLE Evenement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL,
    lieu VARCHAR(50) NOT NULL
);

-- Table billet_festival
CREATE TABLE billet_festival (
    id SERIAL PRIMARY KEY,
    date_achat TIMESTAMPTZ NOT NULL,
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE
);

-- Table prestation
CREATE TABLE prestation (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    description VARCHAR(150),
    image VARCHAR(50),
    zone_id INT REFERENCES Zone(id) ON DELETE CASCADE
);

-- Table Reservation_prestation
CREATE TABLE Reservation_prestation (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    prestation_id INT REFERENCES prestation(id) ON DELETE CASCADE
);

-- Table Concert
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

-- Table Place_concert
CREATE TABLE Place_concert (
    id SERIAL PRIMARY KEY,
    id_concert INT REFERENCES Concert(id) ON DELETE CASCADE,
    type_place VARCHAR(50) NOT NULL,
    nb_places INT NOT NULL,
    prix_place DECIMAL NOT NULL
);

-- Table Expo_oeuvre
CREATE TABLE Expo_oeuvre (
    id SERIAL PRIMARY KEY,
    createur VARCHAR(50),
    email VARCHAR(50),
    date_crea TIMESTAMP,
    description TEXT,
    image VARCHAR(50)
);

-- Table Course_cauchemarathon
CREATE TABLE Course_cauchemarathon (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    nb_places INT NOT NULL,
    prix DECIMAL DEFAULT 0
);

-- Table Films
CREATE TABLE Films (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    duree INT NOT NULL,
    image VARCHAR(50),
    categorie VARCHAR(50) DEFAULT '',
    salle VARCHAR(50),
    nb_places INT NOT NULL DEFAULT 0,
    prix DECIMAL DEFAULT 0
);

-- Table Deguisement
CREATE TABLE Deguisement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    image VARCHAR(50)
);

-- Table Taille_deguisement
CREATE TABLE Taille_deguisement (
    id SERIAL PRIMARY KEY,
    taille VARCHAR(50) NOT NULL,
    quantite INT NOT NULL,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE
);

-- Table Carre
CREATE TABLE Carre (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    prixPersonne INT NOT NULL
);

-- Table Bouteille
CREATE TABLE Bouteille (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    prix INT NOT NULL
);

-- Table Signalement
CREATE TABLE Signalement (
    id SERIAL PRIMARY KEY,
    typeIncident VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    zone INT REFERENCES Zone(id) ON DELETE CASCADE,
    position VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL
);

-- Table organise (liaison Activite - Organisateur)
CREATE TABLE organise (
    activite_id INT REFERENCES Activite(id) ON DELETE CASCADE,
    organisateur_id UUID REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (activite_id, organisateur_id)
);

-- Table gere (liaison Evenement - Organisateur)
CREATE TABLE gere (
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    organisateur_id UUID REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (evenement_id, organisateur_id)
);

-- Table livre_dor
CREATE TABLE livre_dor (
    id SERIAL PRIMARY KEY,
    prestataire_id UUID REFERENCES prestataire(id) ON DELETE CASCADE,
    nom_utilisateur VARCHAR(255) NOT NULL,
    evaluation INT CHECK (evaluation BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    date DATE NOT NULL
);

-- Table articles
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    prestataire_id UUID REFERENCES prestataire(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image VARCHAR(255)
);

-- Table panier_article
CREATE TABLE panier_article (
    id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    quantite INT NOT NULL
);

-- Table coordonnees_bancaire
CREATE TABLE coordonnees_bancaire (
    nom VARCHAR(255) NOT NULL,
    numero_carte CHAR(16) NOT NULL,
    date_expiration CHAR(5) NOT NULL,
    cvv CHAR(3) NOT NULL
);

-- Table demande_uber_flippe
CREATE TABLE demande_uber_flippe (
    id_demande INT PRIMARY KEY,
    zone VARCHAR(255) NOT NULL,
    nb_personne INT NOT NULL,
    description TEXT NOT NULL
);

-- Table demandes_prestataires
CREATE TABLE demandes_prestataires (
    id INT PRIMARY KEY,
    societe VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table demandes_organisateurs
CREATE TABLE demandes_organisateurs (
    id INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel CHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL
);

------------------------------------------------------------
-- Tables ajoutées depuis le data.js (non présentes dans le script initial)
------------------------------------------------------------

-- Table reservation_article (pour réserver un article)
CREATE TABLE reservation_article (
    id SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    quantite INT NOT NULL,
    date_reservation TIMESTAMP NOT NULL
);

-- Table artistes
CREATE TABLE artistes (
    id SERIAL PRIMARY KEY,
    nomGroupe VARCHAR(50) NOT NULL,
    nbMembres INT NOT NULL,
    decision VARCHAR(50)
);

-- Table panier_concert (panier pour réserver des places de concert)
CREATE TABLE panier_concert (
    id SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    concert_id INT REFERENCES Concert(id) ON DELETE CASCADE,
    quantite INT NOT NULL
);

-- Table reservation_concert (réservation de places pour un concert)
CREATE TABLE reservation_concert (
    id SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    concert_id INT REFERENCES Concert(id) ON DELETE CASCADE,
    nb_places INT NOT NULL,
    date_reservation TIMESTAMP NOT NULL
);

-- Table places_films (pour les places dans les films)
CREATE TABLE places_films (
    id_film INT REFERENCES Films(id) ON DELETE CASCADE,
    type_place VARCHAR(50) NOT NULL,
    nb_places INT NOT NULL,
    prix_place DECIMAL NOT NULL,
    PRIMARY KEY (id_film, type_place)
);

-- Table reserve_film (réservation de places dans un film)
CREATE TABLE reserve_film (
    id SERIAL PRIMARY KEY,
    nb_places_prises INT NOT NULL,
    type_place_prises VARCHAR(50) NOT NULL
);

-- Table soireeBaltrouille (soirées spéciales)
CREATE TABLE soireeBaltrouille (
    id_soiree SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT NOT NULL
);

-- Table de liaison soireeBaltrouille_deguisements (association d’une soirée à plusieurs déguisements)
CREATE TABLE soireeBaltrouille_deguisements (
    id_soiree INT REFERENCES soireeBaltrouille(id_soiree) ON DELETE CASCADE,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE,
    PRIMARY KEY (id_soiree, deguisement_id)
);

-- Table panier_deguisement (panier pour les déguisements)
CREATE TABLE panier_deguisement (
    id SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE,
    quantite INT NOT NULL
);

-- Table location_deguisement (location de déguisements)
CREATE TABLE location_deguisement (
    id SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE,
    date_location TIMESTAMP NOT NULL,
    quantite INT NOT NULL
);

-- Table reservation_carihorreur (réservation d’un carré dans l’espace « carihorreur »)
CREATE TABLE reservation_carihorreur (
    id_reservation SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    dateCarre DATE NOT NULL,
    id_carre INT REFERENCES Carre(id) ON DELETE CASCADE,
    nbPersonne INT NOT NULL
);
-- Table de liaison reservation_carihorreur_bouteilles (bouteilles associées à une réservation de carré)
CREATE TABLE reservation_carihorreur_bouteilles (
    id_reservation INT REFERENCES reservation_carihorreur(id_reservation) ON DELETE CASCADE,
    id_bouteille INT REFERENCES Bouteille(id) ON DELETE CASCADE,
    quantite INT NOT NULL,
    PRIMARY KEY (id_reservation, id_bouteille)
);

-- Table reservations_cauchemarathon (réservation pour le Cauchemarathon)
CREATE TABLE reservations_cauchemarathon (
    id_reservation SERIAL PRIMARY KEY,
    utilisateur_id UUID REFERENCES Utilisateur(id) ON DELETE CASCADE,
    id_course INT REFERENCES Course_cauchemarathon(id) ON DELETE CASCADE,
    nb_places INT NOT NULL
);

CREATE TABLE texte_accueil (
    id INT PRIMARY KEY DEFAULT 1,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO utilisateur (id, nom, prenom, date_naissance, mail, password, solde, num_cashless, qr_code, est_festivalier)
VALUES
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6', 'lahasbaaa', 'yahia', '1998-09-20', 'yahia.lahasbaa@example.com', 'password123', 500, '8b975371-9be6-47cc-a121-9861430bb266', 'QR1234', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7', 'lafrime', 'tim', '1999-10-15', 'tim.lafrime@example.com', 'password1', 0, '8b975371-9be6-47cc-a121-9861430bb267', 'QR5678', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f8', 'letueur', 'enzo', '1997-05-12', 'enzo.letueur@example.com', 'password2', 1000, '8b975371-9be6-47cc-a121-9861430bb268', 'QR9101', TRUE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9', 'lemalfrat', 'harry', '1996-03-07', 'harry.lemalfrat@example.com', 'password3', 600, '8b975371-9be6-47cc-a121-9861430bb269', 'QR1121', FALSE),
('5fbd1d86-3e25-461a-be8d-bbbd9d5d94f0', 'lamenace', 'mathéo', '2000-12-25', 'matheo.lamenace@example.com', 'password', 800, '8b975371-9be6-47cc-a121-9861430bb260', 'QR3141', TRUE);

INSERT INTO prestataire (id, societe, adresse, email, password, theme, description, logo, background, background2)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Burger King', '3 rue de Japy', 'burgerking@gmail.com', 'mdp123', 'Alimentation', 'Pour le Creepy Night Festival, nous avons revisité nos classiques avec une touche effrayante ! Des recettes revisitées aux couleurs de l’horreur, des saveurs audacieuses et une ambiance qui fait frissonner. Oserez-vous y goûter ?', 'logo_burgerking.png', 'background_BK.jpg', 'background2_BK.jpg'),
    ('22222222-2222-2222-2222-222222222222', 'POP', '5 rue de Belfort', 'pop@gmail.com', 'mdp123', 'Goodies', 'Les icônes de l’horreur prennent vie dans notre collection spéciale Creepy Night ! Retrouvez vos personnages cultes sous forme de figurines, dans des éditions effrayantes et exclusives. Une touche de frisson à collectionner !', 'logo_pop.png', 'background_POP.jpg', 'background2_POP.jpg'),
    ('33333333-3333-3333-3333-333333333333', 'Starbucks', '22 place de la République', 'starbucks@gmail.com', 'mdp123', 'Alimentation', 'Plongez dans un univers ensorcelé avec nos boissons aux notes mystérieuses et envoûtantes. Entre saveurs automnales et créations surprises, chaque gorgée vous emmène dans l’ambiance inquiétante du festival.', 'logo_starbucks.png', 'background_starbucks.jpg', 'background2_starbucks.jpg'),
    ('44444444-4444-4444-4444-444444444444', 'Domino''s Pizza', '45 boulevard Haussmann', 'dominos@gmail.com', 'mdp123', 'Alimentation', 'Nos recettes prennent une allure terrifiante pour l’occasion ! Des ingrédients surprenants, des associations audacieuses et une touche infernale dans chaque bouchée. Préparez-vous à une expérience gustative hors du commun', 'logo_domino.png', 'background_DominosPizza.jpg', 'background2_DominosPizza.jpg'),
    ('55555555-5555-5555-5555-555555555555', 'Ricard', '8 rue du Commerce', 'ricard@gmail.com', 'mdp123', 'Boisson', 'Nos créations inédites pour le festival vous feront frissonner de plaisir. Des associations surprenantes, des couleurs sombres et un goût inimitable pour accompagner cette nuit d’épouvante', 'logo_ricard.png', 'background_Ricard.jpg', 'background2_Ricard.jpg'),
    ('66666666-6666-6666-6666-666666666666', 'Nike', '4 allée Centrale', 'nike@gmail.com', 'mdp123', 'Goodies', 'Parce que l’horreur n’attend pas, nous vous accompagnons avec des modèles spécialement conçus pour braver la nuit. Styles sombres, détails lumineux et confort optimal, parfaits pour parcourir les allées du festival sans crainte.', 'logo_nike.png', 'background_Nike.jpeg', 'background2_Nike.jpeg'),
    ('77777777-7777-7777-7777-777777777777', 'Magnum', '10 rue Saint Honoré', 'magnum@gmail.com', 'mdp123', 'Alimentation', 'Succombez à des douceurs glacées aux saveurs envoûtantes. Entre contrastes saisissants et textures surprenantes, nos créations spéciales Creepy Night vous réservent des sensations inédites.', 'logo_haagenDazs.png', 'background_magnum.jpg', 'background2_magnum.jpg'),
    ('88888888-8888-8888-8888-888888888888', 'Taco Bell', '9 place Montmartre', 'tacobell@gmail.com', 'mdp123', 'Alimentation', 'Le piquant et l’étrange se rencontrent dans nos plats spécialement imaginés pour le festival. Une explosion de saveurs relevées, des couleurs sombres et une expérience qui réveillera les esprits… et vos papilles !', 'logo_tacoBell.png', 'background_tacoBell.jpg', 'background2_tacoBell.jpg'),
    ('99999999-9999-9999-9999-999999999999', 'MicroMania', '6 avenue Opéra', 'micromania@gmail.com', 'mdp123', 'Goodies', 'Plongez dans le frisson du jeu vidéo avec notre sélection spéciale d’univers terrifiants. Défis, tournois et surprises vous attendent pour une immersion totale dans le monde du gaming horrifique.', 'logo_micromania.png', 'background_microMania.jpg', 'background2_microMania.jpg');

INSERT INTO icone_carte (nom_image)
VALUES
('icone_concert.png'),
('icone_secours.png'),
('icone_expo.png'),
('icone_cinema.png'),
('icone_activites.png'),
('icone_accueil.png'),
('icone_cashless.png'),
('icone_restaurants.png');


INSERT INTO Emplacement (nom, coord_x, coord_y, prestataire_id, icone_id) 
VALUES
('Emplacement 1', 22, 60, NULL, 1),
('Emplacement 2', 32, 46, NULL, 2),
('Emplacement 3', 48, 58, NULL, 3),
('Emplacement 4', 76, 46, NULL, 4),
('Emplacement 5', 73, 38, NULL, 5),
('Emplacement 6', 84, 28, NULL, 2),
('Emplacement 7', 67, 23, NULL, 6),
('Emplacement 8', 60, 14, NULL, 7),
('Emplacement 9', 78, 19, NULL, 8);

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
('2025-03-16T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6'),
('2025-03-16T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9'),
('2025-03-16T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7'),
('2024-10-02T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f7'),
('2024-10-03T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f8'),
('2024-10-04T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f9'),
('2024-10-05T00:00:00+00:00', 1, '5fbd1d86-3e25-461a-be8d-bbbd9d5d94f0');

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

INSERT INTO livre_dor (prestataire_id, nom_utilisateur, evaluation, message, date)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'John Doe', 5, 'Excellent service, parfait !', '2025-10-30'),
    ('11111111-1111-1111-1111-111111111111', 'Le festifroussard', 4, 'Je me suis péter le bide !', '2025-10-31');


INSERT INTO articles (prestataire_id, nom, description, prix, stock, image)
VALUES ('11111111-1111-1111-1111-111111111111', 'Menu Whopper',
        'Menu complet avec burger, frites et boisson',
        8.99, 1000,
        'menu_whopper.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Double Cheese Bacon',
        'Burger avec fromage, frites et boisson',
        9.99, 500,
        'menu-doubleCheeseBacon.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Big King',
        'Burger avec fromage, frites et boisson',
        9.99, 735,
        'menu_bigKing.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Big Fish',
        'Burger avec fromage, frites et boisson',
        7.99, 321,
        'menu_bigFish.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Veggie Whopper',
        'Burger avec fromage, frites et boisson',
        6.99, 120,
        'menu_veggieWhopper.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Steakhouse',
        'Le plaisir de la viande de bœuf grillée à la flamme',
        9.99, 60,
        'menu_steakHouse.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Double Steakhouse',
        'Burger avec fromage, frites et boisson',
        10.99, 148,
        'menu_doubleSteakHouse.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Chicken Spicy',
        'Burger avec fromage, frites et boisson',
        8.99, 20,
        'menu_chickenSpicy.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Master Poulet Cantal',
        'Burger avec fromage, frites et boisson',
        12.99, 0,
        'menu-masterPouletCantal.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Cheddar Lover',
        'Burger avec fromage, frites et boisson',
        13.99, 462,
        'menu_cheddarLover.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Wrap Chicken Louisiane',
        'Burger avec fromage, frites et boisson',
        9.99, 251,
        'menu_wrapChickenLouisiane.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Wrap Crousty Chevre',
        'Burger avec fromage, frites et boisson',
        9.99, 250,
        'menu_wrapCroustyChevre.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Wrap Chicken Cheese & Bacon',
        'Burger avec fromage, frites et boisson',
        10.99, 152,
        'menu_wrapChickenCheeseAndBacon.png'),
       ('11111111-1111-1111-1111-111111111111', 'Menu Big King XXL',
        'Burger avec fromage, frites et boisson',
        11.99, 30,
        'menu_bigKingXXL.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Crispy Chicken Cheese',
        'Burger avec fromage, frites et boisson',
        9.99, 332,
        'menu_crispyChickenCheese.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Veggie Steakhouse',
        'Burger avec fromage, frites et boisson',
        8.99, 30,
        'menu_veggieSteakhouse.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Chicken Louisiane Steakhouse',
        'Burger avec fromage, frites et boisson',
        13.99, 76,
        'menu_ChickenLouisianeSteakhouse.png'),
       ('11111111-1111-1111-1111-111111111111',
        'Menu Double Cheese Bacon XXL',
        'Burger avec fromage, frites et boisson',
        10.99, 612,
        'menu-doubleCheeseBaconXXL.png'),
       ('22222222-2222-2222-2222-222222222222',
        'Figurine Pop Ca le clown',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_Ca.png'),
       ('22222222-2222-2222-2222-222222222222', 'Figurine Pop Eleven',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_11.png'),
       ('22222222-2222-2222-2222-222222222222',
        'Figurine Pop Annabelle',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_Annabelle.png'),
       ('22222222-2222-2222-2222-222222222222', 'Figurine Pop Chucky',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_Chucky.png'),
       ('22222222-2222-2222-2222-222222222222', 'Figurine Pop Vecna',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_Vecna.png'),
       ('22222222-2222-2222-2222-222222222222',
        'Figurine Pop Garfield',
        'Cette figurine va vous glasser le sang attention a ne pas croiser son regard',
        18.99, 10,
        'figurine_Garfield.png');

INSERT INTO coordonnees_bancaire (nom, numero_carte, date_expiration, cvv)
VALUES ('Doe', '123456789ABCDEFG', '11/31', '484');

INSERT INTO texte_accueil (id, titre, contenu) VALUES (
  1,
  'Bienvenue au Festival de l’Horreur',
  'Préparez-vous pour une expérience terrifiante et inoubliable...'
);