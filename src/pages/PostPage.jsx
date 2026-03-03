import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, fetchPopularPosts, selectPostsStatus } from "../features/posts/postsSlice";
import { useEffect } from "react";

const PostPage = () => {
    let { postId } = useParams();
    const post = useSelector(selectPostById(postId));
    const postsStatus = useSelector(selectPostsStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!post) {
            dispatch(fetchPopularPosts());
        }
    }, [post, dispatch]);

    if (postsStatus !== 'succeeded') {
        return <div>{postsStatus}</div>
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
}

export default PostPage;