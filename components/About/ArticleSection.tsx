interface ArticleSectionProps {
  heading?: string;
  body: string;
}

export default function ArticleSection({ heading, body }: ArticleSectionProps) {
  const paragraphs = body.split('\n\n');

  return (
    <section className="about-section">
      {heading && <h2 className="about-section-heading">{heading}</h2>}
      {paragraphs.map((p, i) => (
        <p key={i} className="about-body">
          {p}
        </p>
      ))}
    </section>
  );
}
