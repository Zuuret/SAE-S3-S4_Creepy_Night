DROP TABLE IF EXISTS organise;
DROP TABLE IF EXISTS gere;
DROP TABLE IF EXISTS Taille_deguisement;
DROP TABLE IF EXISTS Deguisement;
DROP TABLE IF EXISTS Films;
DROP TABLE IF EXISTS Course_cauchemarathon;
DROP TABLE IF EXISTS Expo_oeuvre;
DROP TABLE IF EXISTS PlaceConcert;
DROP TABLE IF EXISTS Concert;
DROP TABLE IF EXISTS Reservation_prestation;
DROP TABLE IF EXISTS Billet_festival;
DROP TABLE IF EXISTS Billet_activite;
DROP TABLE IF EXISTS Prestataire;
DROP TABLE IF EXISTS Prestation;
DROP TABLE IF EXISTS Activite;
DROP TABLE IF EXISTS Zone;
DROP TABLE IF EXISTS Rechargement;
DROP TABLE IF EXISTS Evenement;
DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Organisateur;
DROP TABLE IF EXISTS Utilisateur;


CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naissance TIMESTAMP NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    solde DECIMAL NOT NULL,
    num_cashless BIGINT NOT NULL,
    qr_code VARCHAR(50),
    est_festivalier BOOLEAN NOT NULL
);

CREATE TABLE Organisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    tel VARCHAR(15),
);

CREATE TABLE Transaction (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    operation VARCHAR(30) NOT NULL,
    details VARCHAR(75),
    montant DECIMAL NOT NULL,
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE Rechargement (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    montant DECIMAL NOT NULL,
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE
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
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE,
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
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE Prestation (
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
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE,
    prestation_id INT REFERENCES Prestation(id) ON DELETE CASCADE
);

CREATE TABLE Prestataire (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    presentation TEXT,
    tel VARCHAR(15),
    prestation_id INT REFERENCES Prestation(id) ON DELETE CASCADE,
    utilisateur_id INT UNIQUE REFERENCES Utilisateur(id) ON DELETE CASCADE
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
    image VARCHAR(50),
);

CREATE TABLE Course_cauchemarathon (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    nb_places INT NOT NULL,
    prix DECIMAL NOT NULL,
);

CREATE TABLE Films (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    duree INT NOT NULL,
    image VARCHAR(50),
    categorie VARCHAR(50),
    salle VARCHAR(50)
);

CREATE TABLE Deguisement (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prix INT NOT NULL,
    image VARCHAR(50),
);

CREATE TABLE Taille_deguisement (
    id SERIAL PRIMARY KEY,
    taille VARCHAR(50) NOT NULL,
    quantite INT NOT NULL,
    deguisement_id INT REFERENCES Deguisement(id) ON DELETE CASCADE
);

CREATE TABLE organise (
    activite_id INT REFERENCES Activite(id) ON DELETE CASCADE,
    organisateur_id INT REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (activite_id, organisateur_id)
);

CREATE TABLE gere (
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    organisateur_id INT REFERENCES Organisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (evenement_id, organisateur_id)
);


INSERT INTO utilisateur (nom, prenom, date_naissance, mail, login, password, solde, num_cashless, qr_code, est_festivalier)
VALUES 
('lahasbaaa', 'yahia', '1998-09-20', 'yahia.lahasbaa@example.com', 'jdupont', 'password123', 500, 123456789, 'QR1234', TRUE),
('lafrime', 'tim', '1999-10-15', 'tim.lafrime@example.com', 'lmartin', 'password1', 0, 234567890, 'QR5678', TRUE),
('letueur', 'enzo', '1997-05-12', 'enzo.letueur@example.com', 'mlemoine', 'password2', 1000, 345678901, 'QR9101', TRUE),
('lemalfrat', 'harry', '1996-03-07', 'harry.lemalfrat@example.com', 'pdurand', 'password3', 600, 456789012, 'QR1121', TRUE),
('lamenace', 'mathéo', '2000-12-25', 'matheo.lamenace@example.com', 'spetit', 'password', 800, 567890123, 'QR3141', TRUE);

INSERT INTO organisateur (nom, prenom, email, password, tel)
VALUES 
('Kherza', 'Jean', 'jeankherza@gmail.com', 'mpd123', '0612345678'),
('Balta', 'Luc', 'lucbalta@gmail.com', 'mpd456', '0600000000');

INSERT INTO transaction (date, operation, details, montant, utilisateur_id)
VALUES 
('2024-11-05 15:30:00', 'Remboursement', 'Remboursement de 10.00 €', 10.00, 1),
('2024-10-31 23:00:00', 'Paiement BAR', '1x Consigne Gobelet', 2.00, 1),
('2024-10-31 21:00:00', 'Paiement BAR', '1x Consigne Gobelet - 2.00 €\n1x Coca Cola - 4.00 €', -6.00, 1),
('2024-10-31 20:30:00', 'Paiement Burger&co', '1x Frites - 4.00 €\n1x Cheese Burger - 12.00 €', -16.00, 2);

INSERT INTO rechargement (date, montant, utilisateur_id)
VALUES 
('2024-10-01 14:30:00', 200, 1),
('2024-10-02 16:45:00', 150, 2),
('2024-10-03 13:20:00', 300, 3),
('2024-10-01 10:10:00', 100, 4),
('2024-10-02 18:50:00', 250, 5);

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
('2024-10-15 12:00:00', 1, 1),
('2024-10-15 12:10:00', 2, 2),
('2024-10-16 13:30:00', 3, 3),
('2024-10-16 14:00:00', 4, 4),
('2024-10-17 15:20:00', 5, 5);

INSERT INTO evenement (nom, description, date_debut, date_fin, lieu)
VALUES 
('Festival Creepy Night', 'Le festival d’horreur annuel.', '2024-10-25 18:00:00', '2024-10-31 23:59:00', 'Audincourt');

INSERT INTO billet_festival (date_achat, evenement_id, utilisateur_id)
VALUES 
('2024-10-01', 1, 1),
('2024-10-02', 1, 2),
('2024-10-03', 1, 3),
('2024-10-04', 1, 4),
('2024-10-05', 1, 5);

INSERT INTO prestation (nom, prix, description, image, zone_id)
VALUES 
('Uberflippe', 15, 'giuseppe qui te fait la peur de ta vie', 'uberflippe.png', 1),
('Objets trouvés', 30, 'récupère tes objets perdus au combat', 'objets-trouves.png', 2),
('Secuflippe', 0, 'si la frayeur est trop grosse, appelle secuflippe pour te proteger', 'secuflippe.png', 2),
('Navette', 10, 'elle est pas spatiale, elle t`emmène juste au festival', 'navette.png', 2);

INSERT INTO reservation_prestation (date, utilisateur_id, prestation_id)
VALUES 
('2024-10-25 12:00:00', 1, 1),
('2024-10-25 12:10:00', 2, 2);

INSERT INTO prestataire (nom, presentation, tel, prestation_id, utilisateur_id)
VALUES 
('enzo le tueur', 'Je ne sers pas à grand chose', '0700000001', 1, 3),
('harry le malfrat', 'Je suis costaud et je peux vous défendre', '0700000002', 3, 4);

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
("L'ÉpouvanTour", '2025-10-29 22:00:00', 100, 15),
("L'ÉpouvanTour", '2025-10-31 22:00:00', 100, 15),
("L'ÉpouvanTour", '2025-11-02 22:00:00', 100, 15);

INSERT INTO Films (nom, date, duree, image, categorie, salle)
VALUES
('Shining', '2025-10-27 22:00:00', 1, 'affiche_BigAli.jpg', 'House', 'Salle 1'),
('The Thing', '2025-10-28 19:00:00', 1, 'affiche_TravisScott.jpg', 'Rap', 'Salle 2'),
("l'Exorciste", '2025-10-29 21:00:00', 1, 'affiche_Muse.jpg', 'Rock', 'Salle 3'),
('Alien', '2025-10-29 22:00:00', 1, 'affiche_Vald.jpg', 'Rap', 'Salle 4'),
('Psychose', '2025-10-29 00:00:00', 1, 'affiche_DavidGuetta.jpg', 'Électro', 'Salle 1'),
('Massacre à la tronçonneuse', '2025-10-30 21:00:00', 1, 'affiche_Kungs.jpg', 'House', 'Salle 2'),
('Conjuring', '2025-10-30 23:00:00', 1, 'affiche_VladimirCauchemard.jpg', 'Électro', 'Salle 3'),
('La Nuit des masques', '2025-10-31 18:00:00', 1, 'affiche_Gims.jpg', 'Rap', 'Salle 4'),
('[REC]', '2025-10-31 21:00:00', 1, 'affiche_DaftPunk.jpg', 'Électro', 'Salle 1'),
('Suspiria', '2025-10-31 22:00:00', 1, 'affiche_KendrickLamar.jpg', 'Rap', 'Salle 2'),
('Le Projet Blair Witch', '2025-10-31 23:00:00', 1, 'affiche_RollingStones.jpg', 'Rock', 'Salle 3'),
("Rosemary's Baby", '2025-11-01 18:00:00', 1, 'affiche_Guy2Bezbar.jpg', 'Rap', 'Salle 4');

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
 
INSERT INTO organise (activite_id, organisateur_id)
VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 1);

INSERT INTO gere (evenement_id, organisateur_id)
VALUES 
(1, 1),
(1, 2);
