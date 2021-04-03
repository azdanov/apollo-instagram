import React from "react";
import { useParams } from "react-router-dom";
import MorePostsFromUser from "../components/post/MorePostsFromUser.jsx";
import Post from "../components/post/Post.jsx";
import Layout from "../components/shared/Layout.jsx";

const PostPage = () => {
	const { postId } = useParams();

	return (
		<Layout>
			<Post id={postId} />
			<MorePostsFromUser />
		</Layout>
	);
};

export default PostPage;
