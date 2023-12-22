import React, { useState } from "react";

function NewsFeed({
  content,
  handleLikes,
  handleComments,
  isComment,
  setIsComment,
}) {
  //   console.error(typeof content.imageUrl);
  //   console.error(content.imageUrl);
  //   console.error(content.comments);

  const [areCommentsDisplayed, setAreCommentsDisplayed] = useState(false);

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
          <div id={!isComment ? "" : "comment"}>{content.text}</div>
        </div>
        <div className="reactions">
          <div className="">
            <div>Likes: {content.likes}</div>
            <div
              id="comments-nbr"
              onClick={() => {
                setAreCommentsDisplayed(!areCommentsDisplayed);
              }}
            >
              Comments: {content.comments.length}
            </div>
          </div>
          <div>
            <button
              className="submit-btn"
              id="comment-btn"
              type="button"
              onClick={() => handleComments(content.id)}
            >
              Commenter
            </button>
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
        {areCommentsDisplayed
          ? content.comments.map((comment) => {
              return (
                <section id="comment">
                  <NewsFeed
                    content={{
                      id: 0,
                      user: "Basile",
                      text: comment.content,
                      image: "",
                      likes: 1,
                      isLiked: false,
                      comments: [],
                    }}
                    handleLikes={(likes) => handleLikes(likes)}
                    handleComments={(comment) => handleComments(comment)}
                  />
                </section>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default NewsFeed;
