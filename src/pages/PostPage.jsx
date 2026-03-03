import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, fetchPostById, selectSinglePostStatus, selectSinglePostError } from "../features/posts/postsSlice";
import { useEffect } from "react";

const PostPage = () => {
    let { postId } = useParams();
    const post = useSelector(selectPostById(postId));

    const singlePostStatus = useSelector(selectSinglePostStatus);
    const singlePostError = useSelector(selectSinglePostError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!post) {
            dispatch(fetchPostById(postId));
        }

    }, [postId, post, dispatch]);

    if (singlePostStatus === 'loading') return <div>Loading...</div>;
    if (singlePostStatus === 'failed') return <div>Error loading post: {singlePostError}</div>;
    if (!post) return <div>Post not found</div>

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
}

export default PostPage;