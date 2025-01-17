import reactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/common/MenuSlider/MenuSlider.styles';
import { getUserIsLogin } from '@/store/userState';

export interface MenuSliderProps {
	closeSlider: () => void;
}

const MenuSlider = ({ closeSlider }: MenuSliderProps) => {
	const menuSlider = document.getElementById('menu-slider');
	const isLogin = useRecoilValue(getUserIsLogin);

	const navigate = useNavigate();

	const onLogoutClick = () => {
		if (confirm('정말로 로그아웃 하시겠습니까?')) {
			localStorage.removeItem('accessToken');
			window.location.href = '/';
		}
	};

	if (menuSlider === null) {
		throw new Error('슬라이더를 찾지 못하였습니다');
	}

	return reactDom.createPortal(
		<S.Container>
			<S.MenuBox>
				<S.Header>
					<S.BackButtonBox onClick={closeSlider}>
						<S.BackButton />
					</S.BackButtonBox>
				</S.Header>
				<S.LinkBox>
					{isLogin && (
						<S.LinkItem
							onClick={() => {
								onLogoutClick();
								closeSlider();
							}}
						>
							로그 아웃
						</S.LinkItem>
					)}
					{!isLogin && (
						<S.LinkItem
							onClick={() => {
								navigate('/login');
								closeSlider();
							}}
						>
							로그인
						</S.LinkItem>
					)}
					<S.LinkItem
						onClick={() => {
							navigate('/category');
							closeSlider();
						}}
					>
						글 쓰러 가기
					</S.LinkItem>
					<S.LinkItem
						onClick={() => {
							navigate('/articles/question');
							closeSlider();
						}}
					>
						질문 카테고리
					</S.LinkItem>
					<S.LinkItem
						onClick={() => {
							navigate('/articles/discussion');
							closeSlider();
						}}
					>
						토론 카테고리
					</S.LinkItem>
					<S.LinkItem onClick={() => alert('준비중입니다..!')}>문의하기</S.LinkItem>
				</S.LinkBox>
			</S.MenuBox>
		</S.Container>,
		menuSlider,
	);
};

export default MenuSlider;
