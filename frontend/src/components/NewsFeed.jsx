import React, { useState } from "react";
import PublishFeed from "./PublishFeed";

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
  //   console.error(content.comments);

  const [areCommentsDisplayed, setAreCommentsDisplayed] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [liveFeed, setLiveFeed] = useState(content.comments);

  const updateContent = (e) => {
    console.error(e.target.value);
    setTextAreaValue(e.target.value);
  };

  const postComment = (e) => {
    e.preventDefault();
    setLiveFeed([
      {
        id: liveFeed.length + 1,
        user: "Basile",
        text: textAreaValue,
        likes: 0,
        isLiked: false,
        comments: [],
      },
      ...liveFeed,
    ]);
    setTextAreaValue("");
    setIsPostingComment(false);
  };

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
              onClick={() => setIsPostingComment(!isPostingComment)}
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
        {/* section publier un commentaire */}
        {isPostingComment ? (
          <div className="posting-comment">
            <div className="publish-form">
              <form onSubmit={postComment} method="post">
                <div className="input-text">
                  <textarea
                    name="content"
                    onChange={updateContent}
                    id="input-text"
                    value={textAreaValue}
                  />
                </div>
                <div className="submit-comment">
                  <button className="submit-btn" type="submit">
                    Publier
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* sections commentaires */}
        {areCommentsDisplayed
          ? liveFeed.map((comment) => {
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
