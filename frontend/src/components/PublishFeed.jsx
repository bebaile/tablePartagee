import React, { useState, useEffect } from "react";
import NewsFeed from "./NewsFeed";
import content from "../data/newsFeed.json";

function PublishFeed() {
  // Etat du liveFeed

  console.log(content);
  const [liveFeed, setLiveFeed] = useState(content);

  //   Etat du formulaire
  const [publishContent, setPublishContent] = useState({});

  //   fonctions de gestions du formulaire

  const updateContent = (e) => {
    console.error(e.target.value);
    setPublishContent({ ...publishContent, text: e.target.value });
  };

  const handleSubmit = () => {
    setLiveFeed([
      ...liveFeed,
      {
        id: liveFeed.length + 1,
        user: "Basile",
        text: publishContent.text,
        image: "",
      },
    ]);
  };

  useEffect(() => {
    console.error(publishContent);
  }, [publishContent]);

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
                onClick={handleSubmit}
              >
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        {liveFeed.map((item) => {
          return <NewsFeed content={item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default PublishFeed;
