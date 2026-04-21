import styles from '../about.module.css';

export default function AuthorSignoff() {
  return (
    <div className={styles.signoff}>
      <p className={styles.signoffName}>&mdash; Orlando Osorio &amp; Alberto Sadde</p>
      <div className={styles.signoffLinks}>
        <a
          href="https://x.com/orlandosorio_"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.signoffLink}
        >
          @orlandosorio_
        </a>
        <span className={styles.signoffSeparator}>&middot;</span>
        <a
          href="https://x.com/aesadde"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.signoffLink}
        >
          @aesadde
        </a>
      </div>
    </div>
  );
}
