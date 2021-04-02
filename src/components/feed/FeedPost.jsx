import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import HtmlEllipsis from "react-lines-ellipsis/lib/html.js";
import { Link } from "react-router-dom";
import {
	CommentIcon,
	LikeIcon,
	MoreIcon,
	RemoveIcon,
	SaveIcon,
	ShareIcon,
	UnlikeIcon,
} from "../../icons.jsx";
import { useFeedPostStyles } from "../../styles.js";
import FollowSuggestions from "../shared/FollowSuggestions.jsx";
import UserCard from "../shared/UserCard.jsx";

const FeedPost = ({ index, post }) => {
	const classes = useFeedPostStyles();
	const [showCaption, setShowCaption] = React.useState(false);

	const showFollowSuggestions = index === 1;

	return (
		<>
			<article
				className={classes.article}
				style={{ marginBottom: showFollowSuggestions && 30 }}
			>
				<div className={classes.postHeader}>
					<UserCard user={post.user} />
					<MoreIcon className={classes.moreIcon} />
				</div>
				<div>
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
					<div className={showCaption ? classes.expanded : classes.collapsed}>
						<Link to={`/${post.user.username}`}>
							<Typography
								variant="subtitle2"
								component="span"
								className={classes.username}
							>
								{post.user.username}
							</Typography>
						</Link>
						{showCaption ? (
							<Typography
								variant="body2"
								component="span"
								dangerouslySetInnerHTML={{ __html: post.caption }}
							/>
						) : (
							<div className={classes.captionWrapper}>
								<HtmlEllipsis
									unsafeHTML={post.caption}
									className={classes.caption}
									maxLine={0}
									ellipsis="..."
									basedOn="letters"
								/>
								<Button
									className={classes.moreButton}
									onClick={() => setShowCaption(true)}
								>
									more
								</Button>
							</div>
						)}
					</div>
					<Link to={`/p/${post.id}`}>
						<Typography className={classes.commentsLink} variant="body2" component="div">
							View all {post.comments.length} comments
						</Typography>
					</Link>
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
					<Typography color="secondary" className={classes.datePosted}>
						{formatDistanceToNow(parseISO(post.created_at), { addSuffix: true })}
					</Typography>
				</div>
				<Hidden xsDown>
					<Divider />
					<Comment />
				</Hidden>
			</article>
			{showFollowSuggestions && <FollowSuggestions />}
		</>
	);
};

const LikeButton = () => {
	const classes = useFeedPostStyles();
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
	const classes = useFeedPostStyles();
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
	const classes = useFeedPostStyles();
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

FeedPost.propTypes = {
	index: PropTypes.number.isRequired,
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		caption: PropTypes.string.isRequired,
		user: PropTypes.shape({
			id: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			profile_image: PropTypes.string.isRequired,
		}).isRequired,
		media: PropTypes.string.isRequired,
		comments: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
				user: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
			}),
		).isRequired,
		created_at: PropTypes.string.isRequired,
	}).isRequired,
};

export default FeedPost;
