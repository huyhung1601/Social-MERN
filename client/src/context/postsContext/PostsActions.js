export const getPostsStart = () =>({
    type: "GET_POSTS_START",
})

export const getPostsSuccess = (posts,hasMore)=>({
    type: "GET_POSTS_SUCCESS",
    payload: {posts,hasMore}
})

export const getPostsFailure = () =>({
    type: "GET_POSTS_FAILURE",    
})

export const createPostStart = () =>({
    type: "CREATE_POST_START",
})

export const createPostSuccess = (post)=>({
    type: "CREATE_POST_SUCCESS",
    payload: post
})

export const createPostFailure = () =>({
    type: "CREATE_POST_FAILURE",    
})

export const updatePostStart = () =>({
    type: "UPDATE_POST_START",
})

export const updatePostSuccess = (post)=>({
    type: "UPDATE_POST_SUCCESS",
    payload: post
})

export const updatePostFailure = () =>({
    type: "UPDATE_POST_FAILURE",    
})

export const resetPosts = () =>({
    type: "RESET_POSTS",
})

export const editLike = (postId,userId)=>({
    type: "EDIT_LIKE",
    payload: {postId,userId}
})