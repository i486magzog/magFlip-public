import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type DemoFrameProps = {
  /** Height of the iframe in pixels. */
  height?: number;
};

/**
 * Embeds the local demo (docs/examples/local) copied by scripts/sync-demo.mjs.
 */
export default function DemoFrame({ height = 760 }: DemoFrameProps) {
  // Keep the trailing slash: the demo page loads its bundle with relative paths.
  const demoUrl = useBaseUrl('/demo/docs/examples/local/');

  return (
    <div className={styles.wrapper}>
      <iframe className={styles.frame} src={demoUrl} style={{ height }} title="MagFlip live demo" />
      <a className={styles.newTab} href={demoUrl} target="_blank" rel="noreferrer">
        새 탭에서 열기 ↗
      </a>
    </div>
  );
}
