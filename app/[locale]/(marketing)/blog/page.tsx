import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, BlogCard } from "@/features/design-system";
import { getBlogPosts } from "@/features/content/blog-data";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const posts = getBlogPosts(typedLocale);
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.blog")} headline={t("blog.title")} body={t("blog.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading={t("blog.title")} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} locale={typedLocale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
