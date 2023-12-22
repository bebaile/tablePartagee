import React from "react";

function NewsFeed({ content }) {
  //   console.error(typeof content.imageUrl);
  //   console.error(content.imageUrl);
  return (
    <>
      <div className="news-feed">
        <div id="user">
          <h3>Nom de l'utilisateur :</h3> {content.user}
        </div>
        <div id="content">
          {typeof content.imageUrl !== "undefined" ? (
            <div className="image">
              <img
                src={content.imageUrl}
                alt="Illustration Publication"
                className="illustration"
              />
            </div>
          ) : null}
          <div>{content.text}</div>
        </div>
      </div>
    </>
  );
}

export default NewsFeed;
