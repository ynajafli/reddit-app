import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Post = ({ postId }) => {
    const post = useSelector(selectPostById(postId));
    return(
        <div className="mb-10 w-1/2 border">
            <Link to={`/posts/${post.id}`} className="text-2xl font-bold">{post.title}</Link>
        </div>
    );
}

export default Post;