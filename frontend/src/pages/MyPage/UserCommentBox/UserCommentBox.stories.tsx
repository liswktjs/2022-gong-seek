import UserCommentBox from '@/pages/MyPage/UserCommentBox/UserCommentBox';
import { UserComment } from '@/types/commentResponse';
import { Meta, Story } from '@storybook/react';

export default {
	title: 'pages/MyPage/UserCommentBox',
	component: UserCommentBox,
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
} as Meta;

const Template: Story<{ comment: UserComment }> = (args) => <UserCommentBox {...args} />;

export const DiscussionUserCommentBox = Template.bind({});

DiscussionUserCommentBox.args = {
	comment: {
		id: 1,
		content:
			'마이페이지에서 보여지는 글 제목 글제목이 20자 이상이 넘어갈 경우 어떻게 처리할 것인지 보기 위한 예시 문장입니다',
		createdAt: '2022-08-01T20:27',
		updatedAt: '',
	},
};
