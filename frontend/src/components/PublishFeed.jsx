import React, { useState, useEffect } from "react";
import NewsFeed from "./NewsFeed";
import content from "../data/newsFeed.json";
import api from "@services/services";

function PublishFeed() {
  // Etat du liveFeed

  // console.log(content);
  const [liveFeed, setLiveFeed] = useState(content);

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
    // console.error(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    api.post(url, formData, config).then((response) => {
      console.error(response.data);
    });

    setLiveFeed([
      ...liveFeed.reverse(),
      {
        id: liveFeed.length + 1,
        user: "Basile",
        text: publishContent.text,
        image: "",
      },
    ]);
    setTextAreaValue("");
  };

  return (
    <>
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
          return <NewsFeed content={item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default PublishFeed;
