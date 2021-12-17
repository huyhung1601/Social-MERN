export const changeText = (name,index,value) =>({
    type: "CHANGE_TEXT",
    payload: {name, index, value}
})

export const modifyTitle = (name,value) =>({
    type: "MODIFY_TITLE",
    payload: {name,value}
})

export const createItem = (item,index) =>({
    type: "CREATE_ITEM",
    payload: {item,index}
})

export const deleteItem = (id) =>({
    type: "DELETE_ITEM",
    payload: id
})

export const updateItem = (updatedItem) =>({
    type: "UPDATE_ITEM",
    payload: updatedItem
})

export const arrangeItems = (destination,source) =>({
    type: "ARRANGE_ITEMS",
    payload: {destination,source}
})

export const resetPostEditor = () =>({
    type: "RESET_POST_EDITOR",
    payload: null
})

export const fetchPostStart = () =>({
    type: "FETCH_POST_START",
})

export const fetchPostSuccess = (post,comment) =>({
    type: "FETCH_POST_SUCCESS",
    payload: {post,comment}
})

export const fetchPostFailure = () =>({
    type: "FETCH_POST_FAILURE",
})

export const createCommentStart = ()=>({
    type: "CREATE_COMMENT_START"
})
export const createCommentSuccess = (newComment)=>({
    type: "CREATE_COMMENT_SUCCESS",
    payload: newComment
})
export const createCommentFailure = ()=>({
    type: "CREATE_COMMENT_FAILURE"
})