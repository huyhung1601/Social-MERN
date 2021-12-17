import React, { useContext, useState } from "react";
import {
  ArrowDropDown,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
} from "@material-ui/icons";
import "./postTitle.scss";
import { modifyTitle } from "../../context/postContext/PostActions";
import { PostContext } from "../../context/postContext/PostContext";
import { useClickOutside } from "../controls/toggle";
import { fontStyle } from "../../data";
const PostTitle = () => {
  const { post, dispatch } = useContext(PostContext);
  const [openEditor, setOpenEditor] = useState(false);

  const handleChange = (name, value) => {
    dispatch(modifyTitle(name, value));
  };

  /**Open Editor */
  let domNode = useClickOutside(() => {
    setOpenEditor(false);
  });
  return (
    <div
      className={
        openEditor ? "postTitleContainer editing" : "postTitleContainer"
      }
    >
      <div
        ref={domNode}
        className={openEditor ? "postTitleWrapper editing" : "postTitleWrapper"}
      >
        <div className={openEditor ? "editorHeader active" : "editorHeader"}>
          <div className="editorHeaderLeft">
            <ul>
              <li>
                <div className="fontMenu">
                  <div className="fontFamily">
                    <span style={{ fontFamily: post.fontFamily }}>
                      {post.fontFamily.split("").map((x, index) => (index <= 3 ? x : null))}
                      ...
                      <ArrowDropDown />
                    </span>
                  </div>
                  <div className="fontList">
                    {fontStyle.fontFamily.map((x) => (
                      <div
                        key={x.id}
                        onClick={() => handleChange("fontFamily", x)}
                        style={{ fontFamily: x }}
                        className="fontItem"
                      >
                       { x}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li onClick={() => handleChange("bold", !post.bold)}>
                <FormatBold />
              </li>
              <li onClick={() => handleChange("italic", !post.italic)}>
                <FormatItalic />
              </li>
              <li onClick={() => handleChange("textAlign", "left")}>
                <FormatAlignLeft />
              </li>
              <li onClick={() => handleChange("textAlign", "center")}>
                <FormatAlignCenter />
              </li>
              <li onClick={() => handleChange("textAlign", "right")}>
                <FormatAlignRight />
              </li>
            </ul>
          </div>
          <div className="editorHeaderRight"></div>
        </div>
        <input
          onClick={() => setOpenEditor(true)}
          value={post.title}
          name="title"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          style={{
            fontFamily: post.fontFamily,
            fontSize: "35px",
            fontWeight: post.bold ? "bold" : "normal",
            fontStyle: post.italic ? "italic" : "normal",
            textAlign: post.textAlign,
          }}
          className="postTitleInput"
          type="text"
          placeholder="Title Optional"
        />
      </div>
    </div>
  );
};
export default PostTitle;
