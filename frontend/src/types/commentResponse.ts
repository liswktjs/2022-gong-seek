import { Author } from '@/types/author';

export interface CommentType {
	id: number;
	author: Author;
	content: string;
	createdAt: string;
	isAuthor: boolean;
}

export interface UserComment {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserCommentResponse {
	comments: UserComment[];
}
