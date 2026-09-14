import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type AudienceCard = {
  title: string;
  description: string;
  to: string;
  linkLabel: string;
};

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    title: '📖 사용자 가이드',
    description: '웹 페이지에 MagFlip을 붙여 Flip Book을 보여주고 싶은 분을 위한 문서입니다. 설치, 책 데이터 구성, 뷰어 제어, API 레퍼런스를 다룹니다.',
    to: '/user/intro',
    linkLabel: '사용자 가이드 시작',
  },
  {
    title: '🛠 개발자 가이드',
    description: 'MagFlip 자체를 개발·유지보수하는 분을 위한 문서입니다. 시스템/폴더 구조, Flip 이벤트 흐름과 기하 계산, 로컬 개발과 배포 절차를 다룹니다.',
    to: '/dev/intro',
    linkLabel: '개발자 가이드 시작',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{siteConfig.title}</h1>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/user/getting-started/quick-start">
            5분 만에 시작하기
          </Link>
          <Link className="button button--secondary button--lg" to="/user/demo">
            Live Demo
          </Link>
        </div>
      </header>

      <main className="container margin-vert--xl">
        <div className="row">
          {AUDIENCE_CARDS.map((card) => (
            <div key={card.to} className="col col--6 margin-bottom--lg">
              <div className={styles.card}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <Link to={card.to}>{card.linkLabel} →</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
