import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if(url) {

    fetch("/api/v1/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        body: body,
        photo: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
        } else {
          toast.success("New Post uploaded!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "avi-social-media");
    data.append("cloud_name", "prochesta-eis");

     fetch("https://api.cloudinary.com/v1_1/prochesta-eis/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Posting!!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setUrl(data.url);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login create__post">
      <form>
        <h2>Create New Post</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Description"
        />
        <div className="file-input">
        <input
          onChange={(e) => setImage(e.target.files[0])}
          id="file" className="file"
          type="file"
        />
        <label htmlFor="file">
          Upload Photo
          <p className="file-name"></p>
        </label>
        </div>
      </form>
      <button
        onClick={postDetails}
        id="cretePost__button"
        className="register__button"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
