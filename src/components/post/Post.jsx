import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { defaultPost } from "../../data.js";
import {
	CommentIcon,
	LikeIcon,
	MoreIcon,
	RemoveIcon,
	SaveIcon,
	ShareIcon,
	UnlikeIcon,
} from "../../icons.jsx";
import OptionsDialog from "../shared/OptionsDialog.jsx";
import UserCard from "../shared/UserCard.jsx";
import { usePostStyles } from "../../styles.js";
import PostSkeleton from "./PostSkeleton.jsx";

const Post = ({ id }) => {
	const post = defaultPost;
	const classes = usePostStyles();
	const [showOptionsDialog, setShowOptionsDialog] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 200);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	if (loading) {
		return <PostSkeleton />;
	}

	return (
		<div className={classes.postContainer}>
			<article className={classes.article}>
				<div className={classes.postHeader}>
					<UserCard user={post.user} avatarSize={32} />
					<MoreIcon
						className={classes.moreIcon}
						onClick={() => setShowOptionsDialog(true)}
					/>
				</div>
				<div className={classes.postImage}>
					<img src={post.media} alt="Post media" className={classes.image} />
				</div>
				<div className={classes.postButtonsWrapper}>
					<div className={classes.postButtons}>
						<LikeButton />
						<Link to={`/p/${post.id}`}>
							<CommentIcon />
						</Link>
						<ShareIcon />
						<SaveButton />
					</div>
					<Typography className={classes.likes} variant="subtitle2">
						<span>{post.likes === 1 ? "1 like" : `${post.likes} likes`}</span>
					</Typography>
					<div className={classes.postCaptionContainer}>
						<Typography
							variant="body2"
							component="span"
							className={classes.postCaption}
							dangerouslySetInnerHTML={{ __html: post.caption }}
						/>
						{post.comments.map((comment) => (
							<div key={comment.id}>
								<Link to={`/${comment.user.username}`}>
									<Typography
										variant="subtitle2"
										component="span"
										className={classes.commentUsername}
									>
										{comment.user.username}
									</Typography>{" "}
									<Typography variant="body2" component="span">
										{comment.content}
									</Typography>
								</Link>
							</div>
						))}
					</div>
					<Typography color="secondary" className={classes.datePosted}>
						{formatDistanceToNow(parseISO(post.created_at), { addSuffix: true })}
					</Typography>
					<Hidden xsDown>
						<div className={classes.comment}>
							<Divider />
							<Comment />
						</div>
					</Hidden>
				</div>
			</article>
			{showOptionsDialog && <OptionsDialog onClose={() => setShowOptionsDialog(false)} />}
		</div>
	);
};

const LikeButton = () => {
	const classes = usePostStyles();
	const [liked, setLiked] = React.useState(false);
	const Icon = liked ? UnlikeIcon : LikeIcon;
	const className = liked ? classes.liked : classes.like;
	const onClick = liked ? handleUnlike : handleLike;

	function handleUnlike() {
		setLiked(false);
	}

	function handleLike() {
		setLiked(true);
	}

	return <Icon className={className} onClick={onClick} />;
};

const SaveButton = () => {
	const classes = usePostStyles();
	const [saved, setSaved] = React.useState(false);
	const Icon = saved ? RemoveIcon : SaveIcon;
	const onClick = saved ? handleRemove : handleSave;

	function handleRemove() {
		setSaved(false);
	}

	function handleSave() {
		setSaved(true);
	}

	return <Icon className={classes.saveIcon} onClick={onClick} />;
};

const Comment = () => {
	const classes = usePostStyles();
	const [content, setContent] = React.useState("");

	function handleChange(event) {
		setContent(event.target.value);
	}

	return (
		<div className={classes.commentContainer}>
			<TextField
				fullWidth
				multiline
				value={content}
				placeholder="Add a comment..."
				rowsMax={2}
				rows={1}
				className={classes.textField}
				InputProps={{
					classes: {
						root: classes.root,
						underline: classes.underline,
					},
				}}
				onChange={handleChange}
			/>
			<Button
				color="primary"
				className={classes.commentButton}
				disabled={!content.trim()}
			>
				Post
			</Button>
		</div>
	);
};

Post.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Post;
