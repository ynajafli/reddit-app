import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPopularPosts, selectAllPostIds, selectPostsStatus } from "../features/posts/postsSlice";
import Post from "../features/posts/Post";

const HomePage = () => {
    const dispatch = useDispatch();
    const postIds = useSelector(selectAllPostIds)
    const postsStatus = useSelector(selectPostsStatus);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPopularPosts());
        }
    }, [dispatch, postsStatus])

    if (postsStatus !== 'succeeded') {
        return(<div>{postsStatus}</div>);
    }

    return(
        <main className="flex flex-col items-center justify-start">
            {postIds.map((post) => (
                <Post key={post} postId={post} />
            ))}
        </main>
    );
}

export default HomePage;

