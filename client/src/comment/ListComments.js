import React from 'react';

// Component - List Comments by Post Id
const ListComments = ({ comments }) => {
	const aLLcomments = comments.map((comm) => {
		return (
			<li key={comm.id}>
				<span>{comm.content}</span>
			</li>
		);
	});
	return <ul>{aLLcomments}</ul>;
};

export default ListComments;
