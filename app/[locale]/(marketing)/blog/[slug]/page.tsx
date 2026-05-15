import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, Breadcrumb } from "@/features/design-system";
import { NewsletterEmbed } from "@/features/newsletter/components/NewsletterEmbed";
import { getBlogPosts } from "@/features/content/blog-data";
import { isLocale, type Locale } from "@/features/i18n/config";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const posts = getBlogPosts("en");
  return posts.flatMap((p) =>
    (["en", "ar"] as const).map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getBlogPosts(locale).find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const post = getBlogPosts(typedLocale).find((p) => p.slug === slug);
  if (!post) notFound();
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={post.category} headline={post.title} body={post.excerpt} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px">
          <Breadcrumb
            items={[
              { label: t("nav.home"), href: `/${typedLocale}` },
              { label: t("nav.blog"), href: `/${typedLocale}/blog` },
              { label: post.title },
            ]}
          />
          <div className="mt-6 flex items-center gap-3 text-sm text-[color:var(--color-muted-foreground)]">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date, typedLocale)}</span>
            <span aria-hidden>·</span>
            <span>{t("blog.minutesRead", { count: post.readingMinutes })}</span>
          </div>
          <article className="prose prose-lg mt-8 max-w-none text-[color:var(--color-foreground)]">
            {post.bodyParagraphs.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-[color:var(--color-foreground)]">
                {para}
              </p>
            ))}
          </article>
          <div className="mt-12 rounded-[var(--radius-lg)] bg-[color:var(--color-mist)] p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
              {t("home.newsletterHeading")}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
              {t("home.newsletterBody")}
            </p>
            <div className="mt-4">
              <NewsletterEmbed source={`blog_${post.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
