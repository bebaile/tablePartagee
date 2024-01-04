import React, { useState, useEffect } from "react";

import NewsFeed from "./NewsFeed";
import content from "../data/newsFeed.json";
import api from "@services/services";

function PublishFeed() {
  // Etat du liveFeed

  const [isComment, setIsComment] = useState(false);

  // console.log(content);
  const [liveFeed, setLiveFeed] = useState(content);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

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

  const handleLikes = (postId) => {
    const tmpLiveFeed = [...liveFeed];
    const arrayIndex = tmpLiveFeed.findIndex((item) => item.id === postId);
    if (tmpLiveFeed[arrayIndex].isLiked) {
      tmpLiveFeed[arrayIndex].likes -= 1;
    } else {
      tmpLiveFeed[arrayIndex].likes += 1;
    }
    tmpLiveFeed[arrayIndex].isLiked = !tmpLiveFeed[arrayIndex].isLiked;
    setLiveFeed(tmpLiveFeed);
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
    setLiveFeed([
      {
        id: liveFeed.length + 1,
        user: "Basile",
        text: publishContent.text,
        likes: 0,
        isLiked: false,
        // imageUrl: uploadedFileUrl,
        comments: [],
      },
      ...liveFeed.reverse(),
    ]);
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

      <div className="container">
        {liveFeed.map((item) => {
          return (
            <NewsFeed
              content={item}
              key={item.id}
              handleLikes={(likes) => handleLikes(likes)}
              handleComments={(comment) => handleComments(comment)}
              isComment={isComment}
              setIsComment={setIsComment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PublishFeed;
