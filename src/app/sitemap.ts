import { getAllPathname } from "@/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pathnames = await getAllPathname()

    const pathnameEntries: MetadataRoute.Sitemap = pathnames.map((pathname) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`,
        lastModified: new Date(),
        changefreq: 'daily',
    }))
    return [{
        url: '/',
        lastModified: new Date(),
    }, ...pathnameEntries];
}