
SET search_path = Netflix_Poly;

--1 Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)
-- $p_titre est le titre saisi par l'utilisateur
	SELECT titre, genre, dateProduction, duree, prix 
	FROM Netflix_Poly.Film  
	WHERE titre = '$p_titre';
	
					   
--2 Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
--un film a été acheté (DVD) ou visionné
	SELECT f.genre, f.titre,  MAX(c.dateCommande)
	FROM Netflix_Poly.Film f, Netflix_Poly.Commande c, Netflix_Poly.CommandeFilm cf 
	WHERE f.numero = cf.noFilm
    AND	  cf.noCommande = c.numero
	GROUP BY f.genre,f.titre
	ORDER BY f.genre
	;
	
	
--3 Pour chaque genre de film, trouvez les noms et courriels 
--  des membres qui les ont visionnés le plus souvent. --On considere le max de visionnement pour chaque genre de film
    
	WITH NV AS
	(SELECT  M.UID AS usedID, M.courrier, f.genre, count(cf.noFilm) AS nbreV
		   FROM   Netflix_Poly.Membre M,  Netflix_Poly.CommandeFilm cf, Netflix_Poly.Commande c, Netflix_Poly.Film f
		   WHERE  f.numero = cf.noFilm                                            
		   AND    cf.noCommande = c.numero
		   AND    c.UID= M.UID
		   AND    cf.typeCommande='VISIO'
		   GROUP BY M.UID,f.genre) 

SELECT U.nom, NV.courrier, NV.genre, nbreV	
   FROM  Netflix_Poly.Utilisateur U, NV
    
	WHERE U.UID = NV.usedID
	AND   nbreV = (SELECT MAX(nbreV) FROM  NV)
   

--4 Trouvez le nombre total de films groupés par réalisateur 
   SELECT p.nom, rf.roleName, count(f.numero) as nbreFilm
   FROM   Netflix_Poly.Film f, Netflix_Poly.roleFilm rf, Netflix_Poly.personne p
   WHERE  f.numero = rf.noFilm
   AND    p.personneID = rf.personneID
   AND    rf.roleName = 'Realisateur'
   GROUP BY p.nom, rf.roleName;
   
   
--5 Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la moyenne
 WITH coutDVD AS (SELECT c1.UID, sum(c1.cout) as coutTotal FROM Netflix_Poly.Commande c1,Netflix_Poly.CommandeFilm cf1 WHERE c1.numero=cf1.noCommande AND cf1.typeCommande='DVD' GROUP BY c1.UID)
  
  SELECT U.nom, coutDVD.coutTotal
  FROM   Netflix_Poly.Membre M, Netflix_Poly.Utilisateur U, coutDVD
  WHERE  M.UID = U.UID
  AND    M.UID = coutDVD.UID
  AND coutDVD.coutTotal>(SELECT AVG(c2.cout) FROM Netflix_Poly.Commande c2,Netflix_Poly.CommandeFilm cf2 WHERE c2.numero=cf2.noCommande AND cf2.typeCommande='DVD');
  
  
 --6 Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de visionnements.???
    	  
	WITH Tdvd AS (SELECT cf2.noFilm, count(cf2.noFilm) AS nbreDVD FROM Netflix_Poly.CommandeFilm cf2 WHERE cf2.typeCommande = 'DVD' GROUP BY cf2.noFilm),
	     Tvisio AS (SELECT cf3.noFilm, count(cf3.noFilm) AS nbreV FROM Netflix_Poly.CommandeFilm cf3 WHERE cf3.typeCommande = 'VISIO' GROUP BY cf3.noFilm) 

    SELECT  f.numero, f.titre, f.genre, Tdvd.nbreDVD, Tvisio.nbreV 
	FROM    Netflix_Poly.Film f, Tdvd, Tvisio
				
	WHERE f.numero = Tdvd.noFilm
	AND   f.numero = Tvisio.noFilm
	
	ORDER BY Tdvd.nbreDVD, Tvisio.nbreV 
	
	/*
   WITH Tdvd AS (SELECT cf2.noFilm, count(cf2.noFilm) AS nbreDVD FROM Netflix_Poly.CommandeFilm cf2 WHERE cf2.typeCommande = 'DVD' GROUP BY cf2.noFilm)
	SELECT  f.numero, f.titre, f.genre, Tdvd.nbreDVD, Tvisio.nbreV 
	FROM    Netflix_Poly.Film f, Tdvd
	WHERE f.numero = Tdvd.noFilm
		
	FULL OUTER JOIN
	
	WITH Tvisio AS (SELECT cf3.noFilm, count(cf3.noFilm) AS nbreV FROM Netflix_Poly.CommandeFilm cf3 WHERE cf3.typeCommande = 'VISIO' GROUP BY cf3.noFilm)
	SELECT  f.numero, f.titre, f.genre, Tvisio.nbreV 
	FROM    Netflix_Poly.Film f, Tvisio
	WHERE f.numero = Tvisio.noFilm
	
	ORDER BY Tdvd.nbreDVD, Tvisio.nbreV */
	
	  
  
--7 Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
--qui ont été visionnés plus de 10 fois
   
   WITH nbreVisio AS (SELECT cf2.noFilm, count(cf2.noFilm) AS nbreV FROM Netflix_Poly.CommandeFilm cf2 WHERE cf2.typeCommande = 'VISIO' GROUP BY cf2.noFilm)
   SELECT f.titre, f.prix 
   FROM Netflix_Poly.Film f, nbreVisio 
   WHERE nbreVisio.noFilm = f.numero
   AND   nbreV > 10
   AND NOT EXISTS (SELECT * FROM Netflix_Poly.CommandeFilm cf2 WHERE cf2.typeCommande = 'DVD')
					

--8 Trouvez le nom et la date de naissance des acteurs qui jouent dans les films qui sont visionnés
--  le plus souvent (soit plus que la moyenne)???
WITH nbreVisio AS (SELECT cf2.noFilm, count(cf2.noFilm) AS nbreV FROM Netflix_Poly.CommandeFilm cf2 WHERE cf2.typeCommande = 'VISIO' GROUP BY cf2.noFilm)

SELECT p.nom, p.dateNaissance, nbreV
FROM   Netflix_poly.personne p, Netflix_poly.roleFilm rf, Netflix_Poly.CommandeFilm cf, nbreVisio
WHERE  p.personneID=rf.personneID
AND    rf.noFilm = cf.noFilm
AND    rf.noFilm = nbreVisio.noFilm
AND    rf.roleName = 'Acteur'
AND    nbreV>(SELECT nbreV/ count(f.numero) FROM Netflix_Poly.film f);



--9 Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--  de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10 films qui ont été nominés aux oscars. 
    
	--rn: realisateur et nbre de nominations
 WITH rn AS     ( 
				   SELECT  rf.personneID, count(distinct o.noFilm) AS nominations FROM Netflix_Poly.roleFilm rf, Netflix_Poly.Oscars o
				   WHERE   rf.noFilm = o.noFilm
				   AND     rf.roleName='Realisateur'
		           --AND     o.issue = 'NOMINE'
                   GROUP BY rf.personneID
		        ) 
SELECT   p.nom, rn.nominations
FROM  rn, Netflix_Poly.personne p
WHERE  p.personneID = rn.personneID
AND rn.nominations = (SELECT MAX(rn.nominations) FROM rn)
;
	 
	 
	 
--10 Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui n’ont jamais gagné d’oscar % 

--rn: realisateur et nbre de nominations, 
--on a egalement considere le nombre de nominations qui depasse la moyenne
WITH rn AS    ( 
				   SELECT  rf.personneID, count(distinct o.noFilm) AS nominations FROM Netflix_Poly.roleFilm rf, Netflix_Poly.Oscars o
				   WHERE   rf.noFilm = o.noFilm
				   AND     rf.roleName='Realisateur'
		           AND     o.issue = 'NOMINE'
                   GROUP BY rf.personneID
		      )
			  
SELECT   p.nom

FROM     rn, Netflix_Poly.personne p 
WHERE   p.personneID = rn.personneID 
AND     rn.nominations > (SELECT AVG(rn.nominations) FROM rn ) 
AND NOT EXISTS (SELECT  o.noFilm FROM Netflix_Poly.roleFilm rf, Netflix_Poly.Oscars o
                WHERE   rf.noFilm = o.noFilm
                AND     rf.roleName='Realisateur'
				AND     rf.personneID = rn.personneID
		        AND     o.issue = 'GAGNE' )
;


--11 Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leurs réalisateurs et leurs acteurs ;

WITH OscarsGagnes AS (  SELECT  o.noFilm, count(o.noFilm) AS nbreOscars FROM   Netflix_Poly.Oscars o
                        WHERE   o.issue = 'GAGNE'
                        GROUP BY noFilm
		             )

SELECT  f.titre, extract(YEAR FROM f.dateProduction), p.nom, rf.roleName
FROM    OscarsGagnes OG, Netflix_Poly.Film f, Netflix_Poly.roleFilm rf, Netflix_Poly.Personne p
		  
WHERE  OG.nbreOscars = (SELECT MAX(OG2.nbreOscars) FROM OscarsGagnes OG2)
AND OG.noFilm = f.numero
AND OG.noFilm = rf.noFilm
AND rf.personneID = p.personneID
;
	 
	
--12 Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents films ?? 
WITH ActricesQC AS


SELECT p.* 
FROM   Netflix_Poly.Personne p,
WHERE  p.nationalite = 'QC'
AND    p.sexe = 'F'
AND 


 
	 
	 
--13   Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
--film (réalisateur, acteur, etc.) du plus ancien au plus récent)
	 
SELECT  p.nom, f.titre, f.dateProduction, rf.roleName  
FROM  Netflix_Poly.Personne p, Netflix_Poly.roleFilm rf, Netflix_Poly.Film f 
WHERE   p.nom = 'Woody Allen'
AND     p.personneID = rf.personneID
AND     rf.noFilm = f.numero
ORDER BY f.titre, f.dateProduction
;