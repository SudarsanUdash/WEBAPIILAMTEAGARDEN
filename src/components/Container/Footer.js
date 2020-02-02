import React from 'react';
import SocialLinks from '../SocialLinks';

export default class Footer extends React.Component {
	render() {
		return (
			<footer>
				<p className="text-center">&copy; Sudarsan Udash 2020 <SocialLinks /></p>
			</footer>
		);
	}
}
