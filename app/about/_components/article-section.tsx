interface ArticleSectionProps {
  heading?: string;
  body: string;
}

export default function ArticleSection({ heading, body }: ArticleSectionProps) {
  const paragraphs = body.split('\n\n');

  return (
    <section>
      {heading && (
        <h2 className="text-brand-700 mt-2 mb-4 font-serif text-[22px] font-bold max-sm:text-[19px]">
          {heading}
        </h2>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-6 font-sans text-[17px] leading-[1.8] font-normal text-[#0f172a] last:mb-0 max-sm:text-base"
        >
          {p}
        </p>
      ))}
    </section>
  );
}
