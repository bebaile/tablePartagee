import React, { useState, useContext, useEffect } from "react";
import api from "@services/services";
import Context from "../context/Context";

function NewsFeed({
  content,
  id,
  handleLikes,
  isLiked,
  handleComments,
  isComment,
  setIsComment,
}) {
  //   console.error(typeof content.imageUrl);
  //   console.error(content.imageUrl);
  //   console.error(content.comments);
  //   console.error(content.comments);

  const { isConnected, updateRequired, setUpdateRequired } =
    useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [textLikeBtn, setTextLikeBtn] = useState("");
  const [nbLike, setNbLike] = useState(0);
  // const [updateRequired, setUpdateRequired] = useState(false);
  const [areCommentsDisplayed, setAreCommentsDisplayed] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [liveFeed, setLiveFeed] = useState(content.comments);

  // récupérer le nombre de like pour ce post / commentaire
  useEffect(() => {
    const type = content.isAComment ? "commentaire" : "post";
    async function nbLikes(elementId) {
      try {
        const result = await api.get(`/like/count/${type}/${elementId}`);
        console.log(result.data[0][0].nb_likes);
        setNbLike(result.data[0][0].nb_likes);
      } catch (error) {
        console.error(error);
      }
    }
    nbLikes(id);
  }, [updateRequired]);

  // est ce que j'aime ce post / commentaire ou pas
  async function checkIsLiked() {
    try {
      const result = await isLiked({
        id: content.id,
        isAComment: content.isAComment,
      });
      if (result.isLiked) {
        setTextLikeBtn("Unliker");
      } else {
        setTextLikeBtn("liker");
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkIsLiked();
  }, [updateRequired]);

  useEffect(() => {
    if (textLikeBtn.length > 0) {
      setIsLoading(false);
    }
  }, [textLikeBtn]);

  // récupère les commentaires
  useEffect(() => {
    api
      .get(`/commentaire/${id}`)
      .then((results) => {
        setComments(results.data.reverse());
        console.error(results.data.reverse());
      })
      .catch((error) => {
        if (error.response.status === 404) {
          null;
          // provides room for error handling if necessary
        }
      });
  }, [updateRequired]);

  // réinitialise le champ de commentaire
  const updateContent = (e) => {
    setTextAreaValue(e.target.value);
  };

  // insere la publication dans la base de donnée
  const postComment = (e) => {
    e.preventDefault();
    const toBePosted = {
      email: isConnected ? `${sessionStorage.getItem("email")}` : null,
      user: isConnected ? `${sessionStorage.getItem("pseudo")}` : "Inconnu",
      text: textAreaValue,
      postId: id,
    };
    api
      .post("/commentaire", toBePosted)
      .then((result) => {
        if (result.data === "Created") {
          console.log("commentaire ajouté avec succès");
          setUpdateRequired(!updateRequired);
          setAreCommentsDisplayed(true);
        } else {
          console.error();
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
            <div>Likes: {nbLike}</div>
            <div
              id="comments-nbr"
              onClick={() => {
                setAreCommentsDisplayed(!areCommentsDisplayed);
              }}
            >
              Comments: {comments.length}
            </div>
          </div>
          <div>
            {content.isAComment ? null : (
              <button
                className={"submit-btn"}
                id={"comment-btn"}
                type="button"
                onClick={() => setIsPostingComment(!isPostingComment)}
              >
                Commenter
              </button>
            )}

            <button
              className="submit-btn"
              id="like-btn"
              type="button"
              onClick={() =>
                handleLikes({
                  id: content.id,
                  isAComment: content.isAComment,
                }).then(() => setUpdateRequired(!updateRequired))
              }
            >
              {isLoading ? "" : textLikeBtn}
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
          ? comments.map((comment) => {
              return (
                <section id="comment">
                  <NewsFeed
                    content={{
                      id: comment.ID_Commentaire,
                      user: comment.Pseudo_Utilisateur,
                      text: comment.Contenu,
                    }}
                    key={`commentaire${comment.ID_Commentaire}`}
                    handleLikes={(likes) => handleLikes(likes)}
                    handleComments={(comment) => handleComments(comment)}
                    id={comment.ID_Commentaire}
                    isLiked={(ref) => isLiked(ref)}
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
