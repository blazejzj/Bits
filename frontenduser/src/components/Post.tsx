import { useParams } from "react-router-dom";

function Post() {
    const params = useParams();

    return <h1>Hello from post {params.postid}</h1>;
}

export default Post;
