SET search_path = Netflix_Poly;


--Suppresion des anciennes donnees
DELETE FROM Netflix_Poly.Oscars;
DELETE FROM Netflix_Poly.CeremonieOscars;
DELETE FROM Netflix_Poly.roleFilm;
DELETE FROM Netflix_Poly.Personne;
DELETE FROM Netflix_Poly.CommandeFilmDVD;
DELETE FROM Netflix_Poly.DVD;
DELETE FROM Netflix_Poly.Visionnement;
DELETE FROM Netflix_Poly.Film; --pour nettoyage prealable
DELETE FROM Netflix_Poly.Commande;
DELETE FROM Netflix_Poly.CarteDeCredit;
DELETE FROM Netflix_Poly.Membre;
DELETE FROM Netflix_Poly.NonMembre;
DELETE FROM Netflix_Poly.Utilisateur;
DELETE FROM Netflix_Poly.Adresse;

-- Insertion d'adresses

--ALTER SEQUENCE netflix_poly.adresse_idadresse_seq RESTART WITH 1; --parfois necessaire pour les tests

INSERT INTO Netflix_Poly.Adresse(noRue, nomRue, ville, codePostal, Province, pays) VALUES ('444', 'Briggs Est', 'Longueuil','J4J1R7','Quebec', 'Canada');
INSERT INTO Netflix_Poly.Adresse(noRue, nomRue, ville, codePostal, Province, pays) VALUES ('6889', '14e Avenue', 'Montreal','V1V2A4','Quebec', 'Canada');
INSERT INTO Netflix_Poly.Adresse(noRue, nomRue, ville, codePostal, Province, pays) VALUES ('2500', 'Rue de lUniversite', 'Quebec','C1V2A4','Quebec', 'Canada');


--Insertion de membres abonnes
--ALTER SEQUENCE netflix_poly.utilisateur_uid_seq RESTART WITH 1; --parfois necessaire pour les tests

INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Olson Italis', 2, 'oitalis@gmail.com', true,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Jocelyn Dupenor', 1, 'jdupenor@gmail.com', true,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Gerline Antoine', 1, 'gantoine@gmail.com', false,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Marc-Olivier Dupenor', 1, 'm-odupenor@gmail.com', false,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Noslo Italis', 2, 'nosloitalis@gmail.com', false,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Priscille O. Italis', 2, 'prisci@gmail.com', false,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO Netflix_Poly.Utilisateur(nom, idAdresse, courrier, membre, motDePasseCrypte) VALUES ('Charles Bouchard-Levasseur', 2, 'nature1996@polymtl.ca', true,'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');


--Insertion donnees abonnement
INSERT INTO Netflix_Poly.Membre(UID, prixAbonnement, dateDebut,dateEcheance) VALUES (1,  50.5, '2020-04-01','2021-03-31');
INSERT INTO Netflix_Poly.Membre(UID, prixAbonnement, dateDebut,dateEcheance) VALUES (2,  60.5, '2020-04-01','2021-03-31');


--Insertion de donnees non abonnes
INSERT INTO Netflix_Poly.NonMembre(UID, filmPayPerView) VALUES (3, 0);
INSERT INTO Netflix_Poly.NonMembre(UID, filmPayPerView) VALUES (4, 0);
INSERT INTO Netflix_Poly.NonMembre(UID, filmPayPerView) VALUES (5, 0);
INSERT INTO Netflix_Poly.NonMembre(UID, filmPayPerView) VALUES (6, 0);


--Insertion de carte de credit
INSERT INTO Netflix_Poly.CarteDeCredit(UID,numero, reseauDecarte, titulaire, dateExpiration,ccv) VALUES (1,'4444444444444444', 'Amex', 1, '2024-07-24',314);
INSERT INTO Netflix_Poly.CarteDeCredit(UID, numero, reseauDecarte, titulaire, dateExpiration,ccv) VALUES (2, '3333333333333333', 'Mastercard', 1, '2025-02-25',235);


--Insertion dans Film
--ALTER SEQUENCE netflix_poly.film_numero_seq RESTART WITH 1; --parfois necessaire pour les tests

INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('The Matrix', 'SCI-FI/ACTION','1999-03-31',136, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('The Matrix Reloaded', 'SCI-FI/ACTION','2003-05-07',138, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('The Matrix Revolutions', 'SCI-FI/ACTION','2003-11-05',129, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('War Room', 'Christian drama','2015-08-28',120, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Overcomer', 'Christian drama','2019-08-23',115, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Who Framed Roger Rabbit', 'Live Action','1988-06-22',104, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Paris-Manhattan', 'Comedy','2012-07-18',77, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Irrational Man', 'Drama','2015-05-16',95, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Hannah and Her Sisters', 'Comedy','2015-05-16',95, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Annie Hall', 'Comedy','1977-04-20',93, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Coups de feu sur Broadway', 'Comedy','1994-04-20',98, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Lawrence of Arabia', 'historic drama','1962-12-10',180, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Becket', 'historic drama','1964-03-11',148, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('The Stunt Man', 'Comedy','1980-06-27',131, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('My Favorite Year', 'Comedy','1982-10-08',92, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Venus', 'Comedy','2006-09-02',95, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Reds', 'Drama','1981-12-04',108, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Bulworth', 'Comedy','1998-05-15',195, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Le Retour de Mary Poppins', 'Musical','2018-12-23',130, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Can You Ever Forgive Me?', 'Biographie','2018-09-01',106, 'http://static.videogular.com/assets/videos/videogular.mp4');
INSERT INTO Netflix_Poly.Film(titre, genre,dateProduction, duree, lien) VALUES ('Chicago', 'Comedy','2002-12-10',113, 'http://static.videogular.com/assets/videos/videogular.mp4');


--  Insertion de DVD

INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (1, 1,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (1, 2,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (1, 3,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (2, 1,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (2, 2,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (2, 3,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (3, 1,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (3, 2,  5, true);
INSERT INTO Netflix_Poly.DVD(noFilm, numero, prix,disponibilite) VALUES (3, 3,  5, true);


--Insertion de commandes
ALTER SEQUENCE netflix_poly.commande_numero_seq RESTART WITH 1; --parfois necessaire pour les tests

INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-03-12', 30,  1);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-03-14',  5,  2);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-03-18',  4.5,  2);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-16',  4.5,  2);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-17',  4.5,  3);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-18',  4.5,  4);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-10',  4.5,  5);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-12',  4.5,  6);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-14',  4.5,  6);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-15',  4.5,  4);
INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID) VALUES ('2020-04-15',  4.5,  1);



--Insertion dans commandeFilmDVD
INSERT INTO Netflix_Poly.CommandeFilmDVD(noFilm, noCommande, noDVD) VALUES (1, 1,  1);
INSERT INTO Netflix_Poly.CommandeFilmDVD(noFilm, noCommande, noDVD) VALUES (2, 1,  1);
INSERT INTO Netflix_Poly.CommandeFilmDVD(noFilm, noCommande, noDVD) VALUES (3, 1,  1);


--Insertion dans Visionnement
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 1,  '2020-03-12', 120);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 2,  '2020-03-14',90);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 2,  '2020-03-14', 90);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 3,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 4,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 5,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 5,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 6,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 6,  '2020-03-18',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (1, 7,  '2020-04-10',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 7,  '2020-04-10',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 7,  '2020-04-10',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 8,  '2020-04-10',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 8,  '2020-04-10',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 9,  '2020-04-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 9,  '2020-04-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 1,  '2020-03-12',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 10,  '2020-04-15',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 10,  '2020-04-15',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (4, 11,  '2020-04-16',60);
INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree) VALUES (5, 11,  '2020-04-16',60);



-- Insertion de personnes
--ALTER SEQUENCE personne_personneID_seq RESTART WITH 1;  --parfois necessaire pour les tests

INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Keanu Charles Reeves', '1964-09-02', 'M','CANADA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Joel Silver', '1952-07-14', 'M','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Carrie-Anne Moss', '1967-08-21', 'F','CANADA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Woody Allen', '1935-12-01', 'M','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Alex Kendrick', '1970-06-11', 'M','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Peter Seamus O Toole', '1932-08-02', 'M','British');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Henry Warren Beaty', '1937-03-30', 'M','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Robert Doyle Marshall Jr', '1960-10-17', 'M','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Marielle Heller', '1979-10-01', 'F','USA');
INSERT INTO Netflix_Poly.Personne(nom, dateNaissance, sexe, nationalite) VALUES ('Diane Hall (Keaton)', '1946-01-05', 'F','USA');



--Insertion dans roleFilm
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (1, 1, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (1, 2, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (1, 3, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (3, 1, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (3, 2, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (3, 3, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (2, 1, 'Realisateur', 3000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (2, 2, 'Realisateur', 3000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (2, 3, 'Realisateur', 3000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (2, 6, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 7, 'Acteur', 200000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 8, 'Realisateur', 200000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (5, 4, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (5, 5, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 9, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 10, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 11, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (6, 12, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (6, 13, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (6, 14, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (6, 15, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (6, 16, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (7, 17, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (7, 18, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (8, 19, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (9, 20, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (8, 21, 'Realisateur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (4, 10, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (10, 10, 'Acteur', 2000000);
INSERT INTO Netflix_Poly.roleFilm(personneID, noFilm, roleName, salaire) VALUES (5, 5, 'Acteur', 200000);

-- Insertion des ceremonies d'oscars
/*
CREATE TABLE Netflix_Poly.CeremonieOscars
(
    dateOscar             smallint,
    lieu             varchar(30) not null,
    maitre           varchar(30) not null,
    PRIMARY KEY (dateOscar)

);
*/

INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1978-04-03', 'Dorothy Chandler Pavilion - Los Angeles', 'Bob Hope');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1995-03-27', 'Shrine Auditorium - Los Angeles', 'David Letterman');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1963-04-08', 'Santa Monica Civic Auditorium', 'Frank Sinatra');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1965-04-05', 'Santa Monica Civic Auditorium', 'Bob Hope');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1981-03-31', 'Dorothy Chandler Pavilion - Los Angeles', 'Johnny Carson');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1983-04-11', 'Dorothy Chandler Pavilion - Los Angeles', 'Liza Minnelli');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('2003-03-23', 'Kodak Theatre in Hollywood - Los Angeles', 'Steve Martin');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('2007-02-25', 'Kodak Theatre in Hollywood - Los Angeles', 'Ellen DeGeneres');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1982-03-29', 'Dorothy Chandler Pavilion - Los Angeles', 'Johnny Carson');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('1999-03-21', 'Dorothy Chandler Pavilion - Los Angeles', 'Whoopi Goldberg');
INSERT INTO Netflix_Poly.CeremonieOscars(dateOscar,lieu,maitre) VALUES ('2019-02-24', 'Théâtre Dolby de Los Angeles', 'Non determine');


--Insertion d'Oscars
/*
CREATE TABLE Netflix_Poly.Oscars
(
    dateOscar     smallint,
    noFilm        smallint,
    categorie     varchar(15),
	issue         varchar(6),
    PRIMARY KEY (dateOscar, noFilm, categorie),
    FOREIGN KEY (dateOscar) REFERENCES Netflix_Poly.CeremonieOscars(dateOscar),
    FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero)
);
*/

INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1978-04-03', 10, 'Meilleur scenario original','GAGNE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1978-04-03', 10, 'Meilleur realisateur','GAGNE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1978-04-03', 10, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1995-03-27', 11, 'Meilleur scenario original','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1995-03-27', 11, 'Meilleur realisateur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1963-04-08', 12, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1965-04-05', 13, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1981-03-31', 14, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1983-04-11', 15, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('2007-02-25', 16, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1982-03-29', 17, 'Meilleur film','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1982-03-29', 17, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1982-03-29', 17, 'Meilleur scenario original','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1999-03-21', 18, 'Meilleur acteur','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('1999-03-21', 18, 'Meilleur son','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('2019-02-24', 19, 'Meilleur son','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('2019-02-24', 19, 'Meilleur decor','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('2019-02-24', 20, 'Meilleur scenario adapte','NOMINE');
INSERT INTO Netflix_Poly.Oscars(dateOscar,noFilm,categorie,issue) VALUES ('2003-03-23', 21, 'Meilleur realisateur','NOMINE');




-- DVD
--DELETE FROM Netflix_Poly.DVD; --pour nettoyage prealable
--ALTER SEQUENCE avion_idAvion_seq RESTART WITH 1; parfois necessaire pour redemarrer la sequence
/*
INSERT INTO Netflix_Poly.DVD(numero, noFilm, disponibilite) VALUES (1, 1,true);
INSERT INTO Netflix_Poly.DVD(numero, noFilm, disponibilite) VALUES (2,2,true);
INSERT INTO Netflix_Poly.DVD(numero, noFilm, disponibilite) VALUES (3,3, true);



--DELETE FROM Netflix_Poly.DVD; --pour nettoyage prealable
--ALTER SEQUENCE avion_idAvion_seq RESTART WITH 1; parfois necessaire pour redemarrer la sequence

INSERT INTO Netflix_Poly.DVDFilm(noDVD, noFilm) VALUES (1, 1);
INSERT INTO Netflix_Poly.DVDFilm(noDVD, noFilm) VALUES (1, 2);
INSERT INTO Netflix_Poly.DVDFilm(noDVD, noFilm) VALUES (1, 3);
INSERT INTO Netflix_Poly.DVDFilm(noDVD, noFilm) VALUES (2, 4);
INSERT INTO Netflix_Poly.DVDFilm(noDVD, noFilm) VALUES (2, 5);

*/