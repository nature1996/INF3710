// tslint:disable: max-line-length max-file-line-count
export const schema: string = `
SET search_path = Netflix_Poly;

DROP SCHEMA IF EXISTS Netflix_Poly CASCADE;

CREATE SCHEMA Netflix_Poly;



CREATE TABLE Netflix_Poly.Adresse
(   idAdresse          serial,
    noRue              varchar(20),
    nomRue             varchar(50),
    ville              varchar(50),
    codePostal         varchar(6),
	Province           varchar(30),
	pays               varchar(30),
    PRIMARY KEY (idAdresse)
);
ALTER SEQUENCE netflix_poly.adresse_idadresse_seq RESTART WITH 1; --parfois necessaire pour les tests


--Utilisateur(UID, motDePasseCrypte, nom, idAdresse, Membre);
--PK: UID
--FK: idAdresse References Adresse(idAdresse)
--# Membre -> bool

CREATE TABLE Netflix_Poly.Utilisateur
(
    UID               serial,
    motDePasseCrypte  varchar(256),
    nom               varchar(256) not null,
    courrier          varchar(256) not null,
	idAdresse         smallint not null,
    membre      	  boolean,
    PRIMARY KEY (UID),
	FOREIGN KEY (idAdresse) REFERENCES Netflix_Poly.Adresse(idAdresse)
);
ALTER SEQUENCE netflix_poly.utilisateur_uid_seq RESTART WITH 1; --parfois necessaire pour les tests

--Membre(UID, prixAbonnement, dateDebut, dateEcheance);
--PK: UID
--FK: UID References Utilisateur(UID)

CREATE TABLE Netflix_Poly.Membre
(
    UID               smallint,
	prixAbonnement    numeric(4,2) not null,
    dateDebut         date not null,
	dateEcheance      date not null,
    PRIMARY KEY (UID),
	FOREIGN KEY (UID) REFERENCES Netflix_Poly.Utilisateur(UID)
);



CREATE TABLE Netflix_Poly.NonMembre
(
    UID                   smallint,
    filmPayPerView        smallint default 0,
    PRIMARY KEY (UID),
	FOREIGN KEY (UID) REFERENCES Netflix_Poly.Utilisateur(UID)
);



--CarteDeCredit(UID, numero, titulaire, dateExpiration, CCV)???
--PK: (UID, numero)
--FK: UID References Utilisateur(UID)

CREATE TABLE Netflix_Poly.CarteDeCredit
(
    UID                 smallint,
	numero              varchar(20),
    reseauDecarte       varchar(20) not null,
    titulaire           varchar(256) not null,
    dateExpiration      date not null,
	ccv                 smallint not null,
    PRIMARY KEY (UID, numero),
    FOREIGN KEY (UID) REFERENCES Netflix_Poly.Utilisateur(UID)
);
--ALTER SEQUENCE avion_idAvion_seq RESTART WITH 1; parfois necessaire pour les test


--Personne(personneID, nom, dateDeNaissance, sexe, nationalite)
--PK: personneID

CREATE TABLE Netflix_Poly.Personne
(
    personneID     serial,
    nom            varchar(250) not null,
    dateNaissance  date,                     -- Modification, meilleure modelisation qu'avec l'age
    sexe		   CHAR
				   CONSTRAINT personne_sexeCHK   CHECK (sexe IN ('M','F')),
    nationalite    varchar(30),
    PRIMARY KEY (personneID)
);
ALTER SEQUENCE personne_personneID_seq RESTART WITH 1;  --parfois necessaire pour les test


--Film(numero, titre, genre, dateProduction, duree, prix)
--PK: numero

CREATE TABLE Netflix_Poly.Film
(
    numero         serial,
    titre          varchar(250) not null,
    genre          varchar(50) not null,
	dateProduction date not null,
    duree          smallint not null,
	prix           numeric(3,2),
	lien           varchar(256),
    PRIMARY KEY (numero)
);

ALTER SEQUENCE netflix_poly.film_numero_seq RESTART WITH 1; --parfois necessaire pour les test


--roleFilm(filmID, roleName, personneID, salaire)
--PK:(filmID, roleName, personneID)
--FK: filmID References Film(filmID)
--personneID References Personne(personneID)

CREATE TABLE Netflix_Poly.roleFilm   --Association entre personne et film avec role
(
    personneID    smallint,
    noFilm        smallint,
    roleName      varchar(256),
    salaire       numeric,
    PRIMARY KEY (personneID, noFilm, roleName),
    FOREIGN KEY (personneID) REFERENCES Netflix_Poly.Personne(personneID),
    FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero)
);

--DVD(filmID, dvdID, disponible)
--PK: (filmID, dvdID)
--FK: filmID References Film(filmID)

CREATE TABLE Netflix_Poly.DVD
(
    noFilm            smallint,
    numero            smallint not null,
	prix              numeric(4,2) not null,
	disponibilite     boolean,
	UNIQUE(noFilm, numero),
    PRIMARY KEY (noFilm, numero),
	FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero)

);


--Commande(numero, date, typeCommande, cout, statut, membre)
--Commande(commandeID, UID, filmID, type)
--PK: commandeID
--FK: UID References Utilisateur(UID)
--filmID References Film(filmID)

CREATE TABLE Netflix_Poly.Commande   --Relation commande
(
    numero         serial,
    dateCommande   date,
	cout           numeric(4,2),  --derive
	UID            smallint,
    PRIMARY KEY (numero),
    FOREIGN KEY (UID) REFERENCES Netflix_Poly.Utilisateur(UID)
 );
--netflix_poly.commande_numero_seq
ALTER SEQUENCE netflix_poly.commande_numero_seq RESTART WITH 1; --parfois necessaire pour les test


--Table des visionnements
--Visionnement(commandeID, FilmID, date, duree)
--

CREATE TABLE Netflix_Poly.Visionnement   --Relation commande
(
    noFilm             smallint,
    dateVisionnement   date,
	duree              smallint,
	noCommande         smallint,
    PRIMARY KEY (noFilm, noCommande),
    FOREIGN KEY (noCommande) REFERENCES Netflix_Poly.Commande(numero),
    FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero)
);
--ALTER SEQUENCE netflix_poly.visionnement_numero_seq RESTART WITH 1; --parfois necessaire pour les tests



--Prends en compte seulement les DVD
--PK: commandeID
--FK: commandeID References Commande(commandeID)

CREATE TABLE Netflix_Poly.CommandeFilmDVD   --Association entre commande et film
(
    noFilm	 		  smallint,
    noCommande        smallint,
	noDVD              smallint,
	PRIMARY KEY (noFilm, noCommande),
    FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero),
    FOREIGN KEY (noCommande) REFERENCES Netflix_Poly.Commande(numero)
);


--CeremonieOscars(date, maitre, lieux)
--PK: date

--Oscar(annee, dateCeremonie, lieuCeremonie, maitreCeremonie)
CREATE TABLE Netflix_Poly.CeremonieOscars
(
    dateOscar             date,
    lieu             varchar(256) not null,
    maitre           varchar(256) not null,
    PRIMARY KEY (dateOscar)

);

--Oscars(date, categorie, filmID, victoire)
--PK: (date, categorie, filmID)
--FK: filmID References Film(filmID)
--   date References CeremonieOscars(date)

CREATE TABLE Netflix_Poly.Oscars
(
    dateOscar     date,
    noFilm        smallint,
    categorie     varchar(256) not null,
	issue         varchar(6),
    PRIMARY KEY (dateOscar, noFilm, categorie),
    FOREIGN KEY (dateOscar) REFERENCES Netflix_Poly.CeremonieOscars(dateOscar),
    FOREIGN KEY (noFilm) REFERENCES Netflix_Poly.Film(numero)
);

CREATE OR REPLACE FUNCTION insererVisionnement(pnoFilm smallint, pUID smallint)
    RETURNS integer AS
    $visio$
    DECLARE
      v_commande integer DEFAULT 0;
    BEGIN
        INSERT INTO Netflix_Poly.Commande(dateCommande, cout, UID)
         VALUES(CURRENT_DATE, 0, pUID);

        SELECT MAX(c.numero) into v_commande FROM Netflix_Poly.Commande c;

        INSERT INTO Netflix_Poly.Visionnement(noFilm, noCommande, dateVisionnement, duree)
         VALUES(pnoFilm, v_commande, CURRENT_DATE, 0);

        return 1;
	END;  $visio$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insererUtilisateur(pNoRue varchar(20), pNomRue varchar(50), pville varchar(50), pCode varchar(6), pProvince varchar(36), pPays varchar(30), pMotDePasse varchar(256), pnom varchar(256), pcourrier varchar(256), pmembre boolean, pprixAbonement numeric(4,2), pdateDebut date, pdateEcheance date)
	RETURNS integer AS
	$user$
	DECLARE
      v_adresse integer DEFAULT 0;
      v_user integer DEFAULT 0;
	BEGIN
        INSERT INTO Netflix_Poly.Adresse(noRue, nomRue, ville, codePostal, Province, pays)
         VALUES (pNoRue, pNomRue, pVille,pCode,pProvince, pPays);

        SELECT MAX(a.idAdresse) into v_adresse FROM Netflix_Poly.Adresse a;


        INSERT INTO Netflix_Poly.Utilisateur(motDePasseCrypte, nom, courrier, idAdresse, membre)
        VALUES(pmotDePasse, pnom, pcourrier, v_adresse, pmembre);

        SELECT MAX(u.UID) into v_user FROM Netflix_Poly.Utilisateur u;

        IF(pmembre) THEN
            INSERT INTO Netflix_Poly.Membre(UID, prixAbonnement, dateDebut,dateEcheance)
            VALUES (v_user,  pprixAbonement, pdateDebut,pdateEcheance);
        else
            INSERT INTO Netflix_Poly.NonMembre(UID, filmPayPerView) VALUES (v_user, 0);
        END IF;

        return 1;
	END;  $user$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteFilm(pnumero smallint)
	RETURNS integer AS
	$user$
	DECLARE
	  v_adresse integer DEFAULT 0;
    BEGIN
        DELETE FROM Netflix_Poly.Visionnement
        WHERE noFilm = pnumero;

        DELETE FROM Netflix_Poly.CommandeFilmDVD
        WHERE noFilm = pnumero;

        DELETE FROM Netflix_Poly.DVD
        WHERE noFilm = pnumero;

        DELETE FROM Netflix_Poly.Oscars
        WHERE noFilm = pnumero;

        DELETE FROM Netflix_Poly.roleFilm
        WHERE noFilm = pnumero;

        DELETE FROM Netflix_Poly.Film
        WHERE numero = pnumero;

        return 1;
	END;  $user$ LANGUAGE plpgsql;
`;
