import EditorPage from '@/components/StaticEditor/EditorPage';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';


export async function generateStaticParams() {
  const allPages = await db.select().from(users);
  return allPages.map((page) => ({
    slug: page.pathName,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await db.select().from(users).where(eq(users.pathName, params.slug)).get();

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return <EditorPage initialData={pageData} />;
}