package com.woowacourse.gongseek.comment.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.gongseek.article.domain.Article;
import com.woowacourse.gongseek.article.domain.Category;
import com.woowacourse.gongseek.article.domain.repository.ArticleRepository;
import com.woowacourse.gongseek.comment.domain.Comment;
import com.woowacourse.gongseek.config.JpaAuditingConfig;
import com.woowacourse.gongseek.config.QuerydslConfig;
import com.woowacourse.gongseek.member.domain.Member;
import com.woowacourse.gongseek.member.domain.repository.MemberRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@SuppressWarnings("NonAsciiCharacters")
@Import({JpaAuditingConfig.class, QuerydslConfig.class})
@DataJpaTest
class CommentRepositoryTest {

    private final Member member = new Member("jurl", "jurlring", "");
    private final Article article = new Article("title", "content", Category.QUESTION, member, false);

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @BeforeEach
    void setUp() {
        memberRepository.save(member);
        articleRepository.save(article);
    }

    @Test
    void 댓글을_저장한다() {
        Comment comment = new Comment("content", member, article, false);

        Comment savedComment = commentRepository.save(comment);

        assertThat(savedComment).isSameAs(comment);
    }

    @Test
    void 게시물_아이디로_댓글을_조회한다() {
        Comment comment = new Comment("content", member, article, false);
        commentRepository.save(comment);

        List<Comment> comments = commentRepository.findAllByArticleId(article.getId());

        assertAll(
                () -> assertThat(comments).hasSize(1),
                () -> assertThat(comments.get(0).getMember()).isEqualTo(member),
                () -> assertThat(comments.get(0).getArticle()).isEqualTo(article),
                () -> assertThat(comments.get(0).getContent()).isEqualTo(comment.getContent()),
                () -> assertThat(comments.get(0).isAnonymous()).isFalse()
        );
    }

    @Test
    void 댓글을_수정한다() {
        Comment comment = new Comment("content", member, article, false);
        commentRepository.save(comment);

        String updateContent = "Update Content";
        comment.updateContent(updateContent);

        Comment foundComment = commentRepository.findById(comment.getId()).get();
        assertThat(foundComment.getContent()).isEqualTo(updateContent);
    }

    @Test
    void 댓글을_삭제한다() {
        Comment comment = new Comment("content", member, article, false);
        commentRepository.save(comment);

        commentRepository.delete(comment);
        Optional<Comment> deletedComment = commentRepository.findById(comment.getId());

        assertThat(deletedComment).isEmpty();
    }

    @Test
    void 회원이_작성한_댓글을_조회한다() {
        Comment firstComment = commentRepository.save(new Comment("content1", member, article, false));
        commentRepository.save(new Comment("content2", member, article, false));

        List<Comment> comments = commentRepository.findAllByMemberId(member.getId());

        assertAll(
                () -> assertThat(comments).size().isEqualTo(2),
                () -> assertThat(comments.get(0).getContent()).isEqualTo(firstComment.getContent()),
                () -> assertThat(comments.get(0).getMember()).isEqualTo(firstComment.getMember()),
                () -> assertThat(comments.get(0).getArticle()).isEqualTo(firstComment.getArticle()),
                () -> assertThat(comments.get(0).isAnonymous()).isFalse()
        );
    }
}
