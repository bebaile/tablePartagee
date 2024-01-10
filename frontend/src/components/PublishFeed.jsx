import React, { useState, useEffect, useContext } from "react";
import NewsFeed from "./NewsFeed";
import Context from "../context/Context";
import content from "../data/newsFeed.json";
import api from "@services/services";

function PublishFeed() {
  const { isConnected, setIsConnected, infoUser, setInfoUser } =
    useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  // Etat du liveFeed

  useEffect(() => {
    api
      .get(`/posts`)
      .then((result) => {
        console.log(result.data);
        const tmpArray = [...result.data];
        setPosts(
          tmpArray
            .map((post) => {
              return {
                id: post.ID_Post,
                user: post.Pseudo_Utilisateur,
                text: post.Contenu,
                image: "",
                likes: "",
                isLiked: false,
                comments: [],
              };
            })
            .reverse()
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [update]);

  // console.log(content);
  const [liveFeed, setLiveFeed] = useState();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  useEffect(() => {
    if (posts.length !== 0) {
      console.log(posts);
      setLiveFeed([...posts, ...content]);
    }
  }, [posts]);

  useEffect(() => {
    if (typeof liveFeed !== "undefined") {
      console.log([liveFeed]);
      setIsLoading(false);
    }
  }, [liveFeed]);

  //   Etat du formulaire
  const [textAreaValue, setTextAreaValue] = useState("");
  const [publishContent, setPublishContent] = useState({});
  const [image, setImage] = useState(null);

  //   fonctions de gestions du formulaire

  const updateContent = (e) => {
    setTextAreaValue(e.target.value);
    setPublishContent({ ...publishContent, text: e.target.value });
  };

  const handleImageChange = (e) => {
    console.error(e.target.files[0].name);
    setImage(e.target.files[0]);
    // setUploadedFileUrl(`../../backend/uploads/${e.target.files[0].name}`);
  };

  const handleLikes = (ref) => {
    console.log(ref.id, ref.isAComment);
    const type = ref.isAComment ? "commentaire" : "post";
    const email = isConnected ? sessionStorage.getItem("email") : "inconnu";
    api
      .post("/like/add", {
        id: ref.id,
        type: type,
        email: email,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

    // const tmpLiveFeed = [...liveFeed];
    // const arrayIndex = tmpLiveFeed.findIndex((item) => item.id === postId);
    // if (tmpLiveFeed[arrayIndex].isLiked) {
    //   tmpLiveFeed[arrayIndex].likes -= 1;
    // } else {
    //   tmpLiveFeed[arrayIndex].likes += 1;
    // }
    // tmpLiveFeed[arrayIndex].isLiked = !tmpLiveFeed[arrayIndex].isLiked;
    // setLiveFeed(tmpLiveFeed);
  };

  const handleComments = (postId) => {
    const tmpLiveFeed = [...liveFeed];
    const arrayIndex = tmpLiveFeed.findIndex((item) => item.id === postId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // upload file
    if (image != null) {
      const url = "/uploadFile";
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", image.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      console.error(formData);
      api
        .post(url, formData, config)
        .then((response) => {
          console.error(uploadedFileUrl);
          setUploadedFileUrl(response.data.fileUrl);
        })
        .catch((error) => {
          console.error("Erreur d'upload: ", error);
        });
    }

    // update livefeeed
    const toBePosted = {
      email: isConnected ? `${sessionStorage.getItem("email")}` : null,
      user: isConnected ? `${sessionStorage.getItem("pseudo")}` : "Inconnu",
      text: publishContent.text,
    };
    console.log(toBePosted);
    api
      .post("/posts", toBePosted)
      .then((result) => {
        if (result.data === "Created") {
          setUpdate(!update);
        } else {
          console.error();
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setTextAreaValue("");
  };

  return (
    <div>
      <div className="container">
        <h2>Que voulez vous partager aujourd'hui ?</h2>

        <div className="publish-form">
          <form onSubmit={handleSubmit} method="post">
            <div className="input-text">
              <textarea
                name="content"
                onChange={updateContent}
                id="input-text"
                value={textAreaValue}
              />
            </div>
            <div className="submit">
              <input
                type="file"
                className="add-picture"
                accept="image/*"
                name="image-upload"
                // multiple
                onChange={handleImageChange}
              ></input>

              <button className="submit-btn" type="submit">
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>

      {isLoading ? (
        ""
      ) : (
        <div className="container">
          {liveFeed.map((item) => {
            return (
              <NewsFeed
                content={item}
                key={item.id}
                id={item.id}
                handleLikes={(likes) => handleLikes(likes)}
                handleComments={(comment) => handleComments(comment)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PublishFeed;
