import React, { useContext } from "react";
import "./textEditor.scss";
import { v4 } from "uuid";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,ArrowDropDown
} from "@material-ui/icons";
import { useClickOutside } from "../controls/toggle";
import { createItem,deleteItem,updateItem,} from "../../context/postContext/PostActions";
import { PostContext } from "../../context/postContext/PostContext";
import { fontStyle } from "../../data";
const TextEditor = ({  setOpenTextEditor,values, handleChange,index,}) => {
  const { dispatch } = useContext(PostContext);
  const handleItem = () => {
    if (values.id) {
      if (values.text) {
        const updatedItem = { ...values };
        dispatch(updateItem(updatedItem));
      } else dispatch(deleteItem(values.id));
    } else {
      const newItem = {
        id: v4(),
        ...values,
      };
      if (values.text) {
        dispatch(createItem(newItem, index));
      } else return null;
    }
  };
  let domNode = useClickOutside(() => {
    setOpenTextEditor(false);
    handleItem();
  });
  return (
    <div ref={domNode} className="textEditorContainer active">
      <div className="textEditorWrapper">
        <div className="textEditorHeader">
          <div className="textEditorHeaderLeft">
            <ul>
              <li>
                <div className="fontMenu">
                  <div className="fontFamily">
                    <span style={{ fontFamily: values.fontFamily }}>
                      {values.fontFamily
                        .split("")
                        .map((x, index) => (index <= 3 ? x : null))}
                      ...
                      <ArrowDropDown />
                    </span>
                  </div>
                  <div className="fontList">
                    {fontStyle.fontFamily.map((x,index) => (
                      <div
                      key={index}
                      onClick={()=>handleChange("fontFamily", x)}
                        style={{ fontFamily: x }}
                        className="fontItem"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <FormatBold
                  onClick={() => handleChange("bold", !values.bold)}
                />
              </li>
              <li>
                <FormatItalic
                  onClick={() => handleChange("italic", !values.italic)}
                />
              </li>
              <li>
                <FormatAlignLeft
                  onClick={() => handleChange("textAlign", "left")}
                />
              </li>
              <li>
                <FormatAlignCenter
                  onClick={() => handleChange("textAlign", "center")}
                />
              </li>
              <li>
                <FormatAlignRight
                  onClick={() => handleChange("textAlign", "right")}
                />
              </li>
            </ul>
          </div>
          <div className="textEditorHeaderRight">            
          </div>
        </div>
        <textarea
          name="text"
          value={values.text}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          style={{
            fontFamily: values.fontFamily,
            fontWeight: values.bold ? "bold" : "normal",
            fontStyle: values.italic ? "italic" : "normal",
            textAlign: values.textAlign,
          }}
          placeholder=""
          class="textEditorInput"
          rows="5"
        ></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
