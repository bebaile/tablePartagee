import React, { useState } from "react";

function NewsFeed() {
  // Etat du liveFeed

  const [liveFeed, setLiveFeed] = useState([
    {
      text: "bonjour, je vais bien, je viens de cuisiner des lasagnes végétariennes délicieuses pour mes invités",
      image: "",
    },
  ]);

  //   Etat du formulaire
  const [textContent, setTextContent] = useState("");
  const [picture, setPicture] = useState("");
  const [publishContent, setPublishContent] = useState({});

  //   fonctions de gestions du formulaire

  const updateContent = (e) => {
    console.error(e.target.value);
    setPublishContent({ ...publishContent, text: e.target.value });
  };

  const handleSubmit = () => {
    console.error(publishContent);
  };

  return (
    <>
      <div className="container">
        <h2>Que voulez vous partager aujourd'hui ?</h2>
        <div className="publish-form">
          <form>
            <div className="input-text">
              <textarea name="content" onChange={updateContent} />
            </div>
            <div className="submit">
              <button
                className="submit-btn"
                type="button"
                onSubmit={handleSubmit}
              >
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        {liveFeed.map((item) => {
          return <p>{item.text}</p>;
        })}
      </div>
    </>
  );
}

export default NewsFeed;
