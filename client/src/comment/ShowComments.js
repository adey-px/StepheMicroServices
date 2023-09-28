import React from 'react';

// Component - Display Comments by Post Id
const ShowComments = ({ comments }) => {
	const aLLcomments = comments.map((comment) => {
		let content;
		if (comment.status === 'Pending') {
			content = 'Comment is awaiting moderation';
		}
		if (comment.status === 'Rejected') {
			content = 'Comment has been rejected';
		}
		if (comment.status === 'Approved') {
			content = comment.content;
		}

		return (
			<li key={comment.id}>
				<span>{content}</span>
			</li>
		);
	});
	return <ul>{aLLcomments}</ul>;
};

export default ShowComments;
