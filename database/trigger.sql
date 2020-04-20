
--1 Une fonction nbAvions en PL/pgSQL qui retourne le nombre total d’avions

	CREATE OR REPLACE FUNCTION calculerDistance(codePostal1 varchar(6),codePostal2 varchar(6)) 	
	RETURNS numeric AS 
	$distance$
	DECLARE 
	  distance numeric DEFAULT 0;
	BEGIN
	    --Using PostGis to convert zipcode to GPS points
		
		SET distance = 1;		-- A calculer via Google API
		RETURN distance;
	END;  $distance$ LANGUAGE plpgsql;
	


	-- Creation de la fonction qui retourne le trigger
	--Ce dernier calcule le cout total de la commande: DVD + distance
	CREATE OR REPLACE FUNCTION calculerCoutCommande(codePostal1 varchar(6),codePostal2 varchar(6)) 
	RETURNS trigger AS 
	$cout$
	DECLARE 
		prixDVD number DEFAULT 0;
		prixDVDUnitaire number DEFAULT 0;
		resultats RECORD;
		v_distance integer DEFAULT 1;
	BEGIN
	    FOR resultats IN SELECT d.prix  
                               FROM Netflix_Poly.commande c, Netflix_Poly.commandeFilmDVD cfd, Netflix_Poly.DVD d
							   WHERE c.numero = cfd.noCommande
							   AND d.noFilm = cfd.noFilm 
							   AND d.numero = cfd.noDVD;
		LOOP
			SET prixDVD = prixDVD+resultats.prix;
		END LOOP;
		
		SELECT calculerDistance(codePostal1,codePostal2) into v_distance FROM Netflix_Poly.dual;
		
		
		UPDATE Netflix_Poly.commande c
		SET    c.cout = prixDVD+v_distance*0.25;
		WHERE  c.numero=new.numero;
		RETURN NEW;
	END;
    $cout$ LANGUAGE plpgsql;

	--Le trigger proprement dit
	CREATE TRIGGER cout_envoie_dvd AFTER INSERT ON Netflix_Poly.commande
	FOR EACH ROW EXECUTE FUNCTION calculerCout(codePostal1 varchar(6),codePostal2 varchar(6));
	
	

