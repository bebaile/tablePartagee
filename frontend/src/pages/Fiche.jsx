import React, { useState } from "react";
import "../styles/styles.css";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import bechamel from "@assets/bechamel.jpeg";

function Fiche() {
  const [isDisplayed, setIsDisplayed] = useState("");

  const menuItems = [
    {
      class: "introduction",
      title: "Introduction",
      html: "<h2>Introduction :</h2>        <p>          La sauce blanche, également connue sous le nom de béchamel, est une          sauce de base de la cuisine française. Polyvalente, elle est utilisée          dans de nombreuses recettes comme base pour d'autres sauces, dans les          gratins, ou encore pour lier des plats. La maîtrise de la sauce          blanche est une compétence fondamentale pour tout cuisinier.        </p>      </div>",
    },
    {
      class: "ingrédients",
      title: "Ingrédients",
      html: "<div  className='tab-content'>        <h2>Ingrédients :</h2>        <ul>                   <li>50 g de beurre</li>          <li>50 g de farine</li>          <li>500 ml de lait</li>          <li>Sel et poivre au goût</li>          <li>Une pincée de noix de muscade (facultatif)</li>        </ul>      </div>",
    },
    {
      class: "materiel",
      title: "Matériel",
      html: "<div id=‘materiels’ className=‘tab-content’>        <h2>Matériel :</h2>        <ul>                   <li>Casserole moyenne</li>          <li>Fouet</li>        </ul>      </div>",
    },
    {
      class: "etapes",
      title: "Étapes",
      html: "<div id=‘etapes’ className=‘tab-content’>        <h2>Étapes :</h2>        <ol>                    <li>            <strong>Préparation des Ingrédients :</strong> Mesurer précisément            le beurre, la farine et le lait. Préparer tous les ingrédients à            portée de main.          </li>          <li>            <strong>Réalisation du Roux :</strong> Dans une casserole à feu            moyen, faire fondre le beurre. Ajouter la farine en une seule fois            et mélanger vigoureusement avec un fouet pour former un roux.            Laisser cuire pendant 2 minutes pour éliminer le goût de la farine            crue.          </li>          <li>            <strong>Incorporation du Lait :</strong> Ajouter le lait            graduellement en fouettant constamment pour éviter la formation de            grumeaux. Continuer à fouetter jusqu'à ce que la sauce épaississe.            Cela peut prendre environ 5-7 minutes.          </li>          <li>            <strong>Assaisonnement :</strong> Assaisonner la sauce avec du sel,            du poivre et éventuellement une pincée de noix de muscade pour un            arôme subtil.          </li>          <li>            <strong>Contrôle de la Consistance :</strong> Ajuster la consistance            en ajoutant plus de lait si la sauce est trop épaisse, ou en            laissant cuire un peu plus longtemps si elle est trop liquide.          </li>          <li>            <strong>Filtrage (Optionnel) :</strong> Pour une sauce ultra-lisse,            passer la sauce à travers un tamis fin pour éliminer les éventuels            grumeaux.          </li>          <li>            <strong>Utilisation :</strong> La sauce blanche est prête à être            utilisée comme base pour d'autres sauces, pour napper des légumes            dans les gratins, ou pour accompagner des plats tels que les            lasagnes.          </li>        </ol>      </div>",
    },
    {
      class: "conseils",
      title: "Conseils et astuces",
      html: "<div id=‘conseils’ className=‘tab-content’>        <h2>Conseils et Astuces :</h2>        <ul>                    <li>            Utiliser du lait à température ambiante pour faciliter            l'incorporation.          </li>          <li>Fouetter constamment pour éviter les grumeaux.</li>          <li>            La noix de muscade ajoute une touche de saveur, mais peut être omise            si nécessaire.          </li>          <li>            Réchauffer doucement la sauce si elle épaissit trop lors du            refroidissement.          </li>        </ul>      </div>",
    },
    {
      class: "objectifs",
      title: "Objectifs d'apprentissage",
      html: "      <div id=‘objectifs’ className=‘tab-content’>        <h2>Objectifs d'Apprentissage :</h2>        <p>          La réalisation de cette sauce blanche permet aux apprentis cuisiniers          de maîtriser la technique du roux, d'apprendre à ajuster la          consistance d'une sauce et d'acquérir les compétences de base          nécessaires à de nombreuses autres préparations culinaires.        </p>      </div>",
    },
  ];

  const handleDisplay = (itemToDisplay) => {
    setIsDisplayed(itemToDisplay);
  };

  return (
    <>
      <div className="illustration">
        <img src={bechamel} alt="Sauce bechamel" />
      </div>

      <h1>Fiche Technique : Sauce Blanche</h1>

      <div className="tabbar">
        {menuItems.map((item) => {
          return (
            <>
              <div
                className="tab"
                onClick={() => {
                  handleDisplay(item.class);
                }}
              >
                <div>{item.title}</div>
              </div>
            </>
          );
        })}
      </div>

      {menuItems.map((item) => {
        const html = DOMPurify.sanitize(item.html);
        return (
          <>
            {isDisplayed === item.class || isDisplayed === "" ? (
              <div className={`tab-content ${item.class}`} key={item.title}>
                {HTMLReactParser(html)}
              </div>
            ) : null}
          </>
        );
      })}
    </>
  );
}

export default Fiche;
