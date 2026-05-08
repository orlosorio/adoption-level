import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getAboutContent } from '@/lib/about-content';
import ArticleHeader from './_components/article-header';
import ArticleSection from './_components/article-section';
import CitationCard from './_components/citation-card';
import AuthorSignoff from './_components/author-signoff';
import StickyAssessmentBar from './_components/sticky-assessment-bar';
import ReadingProgress from './_components/reading-progress';
import styles from './about.module.css';

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const content = getAboutContent(locale);
  const tSidebar = await getTranslations('about.sidebar');
  const tCta = await getTranslations('about.cta');
  const citationAfterIndex = 1;

  return (
    <>
      <ReadingProgress />
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <div className="pt-10 pb-[120px]">
          <ArticleHeader meta={content.meta} />

          {content.sections.map((section, i) => (
            <div key={section.id}>
              <ArticleSection heading={section.heading} body={section.body} />
              {i === citationAfterIndex && <CitationCard citation={content.citation} />}
              {i < content.sections.length - 1 && (
                <hr className="my-10 border-t border-none border-t-[#d8defa]" />
              )}
            </div>
          ))}

          <AuthorSignoff />

          <div className="mt-14 mb-12 border-t border-t-[rgba(31,54,169,0.08)] py-10 text-center">
            <h2 className="text-brand-700 m-0 mb-2 font-sans text-[22px] font-bold">
              {tCta('heading')}
            </h2>
            <p className="text-brand-700 m-0 mb-6 font-sans text-[15px] font-normal opacity-55">
              {tCta('text')}
            </p>
            <Link href="/assessment" className={styles.bottomCtaBtn}>
              {tCta('button')}
            </Link>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className={styles.sidebarCard}>
            <p className="text-brand-700 font-sans text-[15px] leading-[1.35] font-semibold">
              {tSidebar('heading')}
            </p>
            <p className="text-brand-700 font-sans text-[13px] leading-[1.55] font-normal opacity-65">
              {tSidebar('text')}
            </p>
            <Link href="/assessment" className={styles.sidebarBtn}>
              {tSidebar('button')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyAssessmentBar />
    </>
  );
}
