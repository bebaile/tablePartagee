import React from "react";

function NewsFeed({ content, handleLikes }) {
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
        <div className="reactions">
          <div>Likes: {content.likes}</div>
          <div>
            <button
              className="submit-btn"
              id="like-btn"
              type="button"
              onClick={() => handleLikes(content.id)}
            >
              {content.isLiked === false ? "Liker" : "Unliker"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsFeed;
