import React from "react";

function NewsFeed({ content }) {
  return (
    <>
      <div className="news-feed">
        <div id="user">
          <h3>Nom de l'utilisateur :</h3> {content.user}
        </div>
        <div id="content">{content.text}</div>
      </div>
    </>
  );
}

export default NewsFeed;
