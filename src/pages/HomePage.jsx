import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPopularPosts, selectAllPostIds, selectPostsStatus, selectPostsError } from "../features/posts/postsSlice";
import Post from "../features/posts/Post";

const HomePage = () => {
    const dispatch = useDispatch();
    const postIds = useSelector(selectAllPostIds)
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPopularPosts());
        }
    }, [dispatch, postsStatus])

    if (postsStatus === 'loading') return <div>Loading...</div>;
    if (postsStatus === 'failed') return <div>Error loading post: {postsError}</div>;
    if (postIds.length === 0) return <div>No posts found</div>;

    return(
        <main className="flex flex-col items-center justify-start">
            {postIds.map((post) => (
                <Post key={post} postId={post} />
            ))}
        </main>
    );
}

export default HomePage;

