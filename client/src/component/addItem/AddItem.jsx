import React, { useState, useContext } from "react";
import { Add,HighlightOff } from "@material-ui/icons";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./addItem.scss";
import { PostContext } from "../../context/postContext/PostContext";
import TextEditor from "../textEditor/TextEditor";
import { useForm } from "../controls/useForm";
import { useClickOutside } from "../controls/toggle";
import { createItem, deleteItem, updateItem } from "../../context/postContext/PostActions";
import { v4 } from "uuid";
import storage from "../../firebase";

const initialvalue = {
  type: "text",
  text: "",
  bold: false,
  italic: false,
  fontSize: "12px",
  textAlign: "left",
  fontFamily: "Roborto",
};

const AddItem = ({ item, index, snapshot,...props }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const { dispatch } = useContext(PostContext);
  const { values, setValues, handleChange, resetForm } = useForm(initialvalue);
  /**Add Img */
  const addImg = (img) =>{    
    const uploadingImg ={
      id: v4(),
      type: "img",
      img: img,
      uploading: true
    }
    dispatch(createItem(uploadingImg,index))
    const fileName = new Date().getTime() + img.name
      const uploadTask = storage.ref(`/items/${fileName}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          const newItem = {
             id: uploadingImg.id,
             type: "img",
             src: url
           }
           dispatch(updateItem(newItem))
          });
        }
      );
  }
  /**Delete Item */
  const deletePostItem = () =>{
    dispatch(deleteItem(item.id))
  }
  /**Toggle */
  let domNode = useClickOutside(() => {
    setOpenMenu(false);
  });
  return (
    <div className="addItemContainer">
      <div className="itemContent" {...props}>
        {item?.type === "img" && 
          <div className="itemImgContainer">
            <button onClick={deletePostItem} className="deleteBtn"><HighlightOff /></button>
            <img className="itemImg" src={  item.img ? URL.createObjectURL(item.img) : item.src } />
            {item.uploading === true ?
              <div className="isLoading">
                <span>isuploading.....</span>
              </div>
              : null
            }
          </div>
        }
        {item?.type === "text" && !openTextEditor && (
          <>
        <button onClick={deletePostItem} className="deleteBtn"><HighlightOff /></button>

          <p
            className="itemText"
            onClick={() => (setOpenTextEditor(true), setValues(item))}
            style={{
              fontFamily: item.fontFamily,
              fontWeight: item.bold ? "bold" : "normal",
              fontStyle: item.italic ? "italic" : "normal",
              textAlign: item.textAlign,
            }}
          >
            {item.text}
          </p>
          </>
        )}
      </div>
        <div
        ref={domNode}
        className={
          openTextEditor ? "addItemWrapper active" : snapshot?.isDragging  ? "addItemWrapper isDragging" : "addItemWrapper"
        }
      >
        <button
          className="addItem-btn"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <Add />
        </button>
        <div className={openMenu ? "menu active" : "menu"}>
          <div
            className="menu-item"
            onClick={() => (
              setOpenTextEditor(true), resetForm(), setOpenMenu(false)
            )}
          >
            <div className="icon">
              <TextFieldsIcon />
            </div>
            <span>Text</span>
          </div>
          <div className="menu-item" >
            <label htmlFor={index} className="shareImg">
              <div className="icon">
                <AddAPhotoIcon />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id={index}
                  accept=".png,.jpeg,.jpg"
                  onChange={e=>addImg(e.target.files[0])}
                />
              </div>
              <span>Photo</span>
            </label>
          </div>
        </div>
        {openTextEditor && (
          <TextEditor
            index={index }
            handleChange={handleChange}
            values={values}
            setOpenTextEditor={setOpenTextEditor}
          />
        )}
      </div>
    </div>
  );
};

export default AddItem;
