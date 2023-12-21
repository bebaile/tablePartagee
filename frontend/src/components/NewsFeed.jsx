import React from "react";

function NewsFeed({ content }) {
  return (
    <>
      <div>{content.text}</div>
    </>
  );
}

export default NewsFeed;
