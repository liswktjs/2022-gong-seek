import { AiFillPlusCircle } from 'react-icons/ai';

import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${({ theme }) => theme.size.SIZE_016};
`;

export const AddOptionForm = styled.form`
	display: flex;

	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
`;

export const ContentForm = styled.form`
	display: flex;

	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 100%;
`;

export const OptionInputBox = styled.div`
	display: flex;

	justify-content: space-evenly;
	align-items: center;

	width: 90%;
`;

export const Content = styled.div`
	display: flex;

	flex-direction: column;
	gap: ${({ theme }) => theme.size.SIZE_014};
	align-items: center;
	width: 90%;

	margin-top: ${({ theme }) => theme.size.SIZE_026};
`;

export const SubmitButton = styled.button`
	width: 60%;

	border-radius: ${({ theme }) => theme.size.SIZE_010};
	border-color: transparent;

	font-size: 0.8rem;

	color: ${({ theme }) => theme.colors.WHITE};
	background-color: ${({ theme }) => theme.colors.PURPLE_500};

	padding: ${({ theme }) => theme.size.SIZE_004};
	margin-top: auto;
	cursor: pointer;

	&:hover,
	&:active {
		background-color: ${({ theme }) => theme.colors.PURPLE_400};
	}
`;

export const AddButton = styled(AiFillPlusCircle)`
	width: ${({ theme }) => theme.size.SIZE_032};
	height: ${({ theme }) => theme.size.SIZE_032};

	color: ${({ theme }) => theme.colors.PURPLE_500};

	cursor: pointer;

	&:hover,
	&:active {
		color: ${({ theme }) => theme.colors.PURPLE_400};
	}
`;

export const AddButtonWrapper = styled.button`
	border: none;

	padding: 0;

	appearance: none;
	background: none;
`;

export const RegisteredOptionTitle = styled.h2`
	font-size: ${({ theme }) => theme.size.SIZE_024};
	margin-right: auto;
	padding-left: 10%;
	margin-top: ${({ theme }) => theme.size.SIZE_024};
`;
