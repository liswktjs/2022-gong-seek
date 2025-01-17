import { Component } from 'react';

import CustomError from '@/components/helper/CustomError';

type Props = {
	fallback?: React.ReactNode;
	children?: React.ReactNode;
	enable: boolean;
};

type State = {
	error: CustomError | null;
};

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { error: null };
	}

	reset() {
		this.setState({ error: null });
	}

	componentDidUpdate(_, prevState: State) {
		if (prevState.error !== this.state.error) {
			if (this.state.error && this.state.error.errorCode === '1005') {
				alert('토큰이 만료되었습니다.');

				localStorage.removeItem('accessToken');
				window.location.href = '/';
			}
		}

		if (this.state.error !== null && prevState.error !== null) {
			this.reset();
		}
	}

	static getDerivedStateFromError(error: Error) {
		return { error: error };
	}

	render() {
		const { children, fallback } = this.props;

		if (this.state.error && this.props.enable) {
			return fallback;
		}

		return children;
	}
}

export default ErrorBoundary;
