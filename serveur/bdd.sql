DROP TABLE IF EXISTS organise;
DROP TABLE IF EXISTS gere;
DROP TABLE IF EXISTS Reservation_prestation;
DROP TABLE IF EXISTS Billet_festival;
DROP TABLE IF EXISTS Billet_activite;
DROP TABLE IF EXISTS Prestataire;
DROP TABLE IF EXISTS Prestation;
DROP TABLE IF EXISTS Activite;
DROP TABLE IF EXISTS Zone;
DROP TABLE IF EXISTS Rechargement;
DROP TABLE IF EXISTS Organisateur;
DROP TABLE IF EXISTS Evenement;
DROP TABLE IF EXISTS Utilisateur;

CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    portefeuille INT NOT NULL,
    qr_code VARCHAR(50),
    est_festivalier BOOLEAN NOT NULL
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

CREATE TABLE Organisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    presentation TEXT,
    tel VARCHAR(15),
    utilisateur_id INT UNIQUE REFERENCES Utilisateur(id) ON DELETE CASCADE
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


INSERT INTO utilisateur (nom, prenom, mail, login, password, portefeuille, qr_code, est_festivalier)
VALUES 
('lahasbaaa', 'yahia', 'yahia.lahasbaa@example.com', 'jdupont', 'password123', 500, 'QR1234', TRUE),
('lafrime', 'tim', 'tim.lafrime@example.com', 'lmartin', 'password123', 750, 'QR5678', TRUE),
('letueur', 'enzo', 'enzo.letueur@example.com', 'mlemoine', 'password123', 1000, 'QR9101', TRUE),
('lemalfrat', 'harry', 'harry.lemalfrat@example.com', 'pdurand', 'password123', 600, 'QR1121', TRUE),
('Petit', 'Sophie', 'sophie.petit@example.com', 'spetit', 'password123', 800, 'QR3141', TRUE);

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

INSERT INTO organisateur (nom, presentation, tel, utilisateur_id)
VALUES 
('yahia la hasbaa', 'Expert en organisation d’événements terrifiants.', '0600000001', 1),
('tim la frime', 'Spécialiste des festivals immersifs.', '0600000002', 2);

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
