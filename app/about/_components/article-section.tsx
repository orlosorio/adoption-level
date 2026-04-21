import styles from '../about.module.css';

interface ArticleSectionProps {
  heading?: string;
  body: string;
}

export default function ArticleSection({ heading, body }: ArticleSectionProps) {
  const paragraphs = body.split('\n\n');

  return (
    <section>
      {heading && <h2 className={styles.sectionHeading}>{heading}</h2>}
      {paragraphs.map((p, i) => (
        <p key={i} className={styles.body}>
          {p}
        </p>
      ))}
    </section>
  );
}
