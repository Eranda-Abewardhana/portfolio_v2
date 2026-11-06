# Search visibility for Eranda Sathsara Abewardhana

The portfolio identifies Eranda Sathsara Abewardhana in its page title, description,
visible main heading, portrait alt text, and structured data. The `Person`,
`ProfilePage`, and `WebSite` records connect the portfolio to the GitHub and
LinkedIn profiles already listed on the page.

## Vercel configuration

The canonical origin, social preview URLs, structured data, robots.txt, and sitemap
all use `src/lib/site.ts`. The origin is chosen in this order:

1. `NEXT_PUBLIC_SITE_URL`, if you set it to your preferred public origin.
2. `VERCEL_PROJECT_PRODUCTION_URL`, Vercel's stable production domain.
3. `VERCEL_URL`, the deployment hostname, if the production domain is unavailable.
4. `http://localhost:3000` for local use.

Vercel's production domain is available in preview builds too, so previews still
point their canonical links to production. Development, preview, custom staging,
and localhost builds are marked `noindex` and do not publish sitemap entries.
The original `/legacy` page is also marked `noindex`; only `/` is in the sitemap.

For the usual Vercel setup, no URL variable is needed. Ensure access to System
Environment Variables is enabled in the project's environment variable settings.
If you use a custom domain or need to override the chosen origin, set
`NEXT_PUBLIC_SITE_URL` in Vercel to the complete HTTPS origin without a page path.
Changing these values requires a new deployment because the pages are prerendered.
See [Vercel's system environment variable documentation](https://vercel.com/docs/environment-variables/system-environment-variables).

## Tell Google about the deployed site

1. Deploy the changes to Vercel Production and make sure the production site is
   publicly accessible without signing in or Deployment Protection.
2. Open [Google Search Console](https://search.google.com/search-console/), add a
   **URL-prefix** property, and enter the exact production HTTPS origin. Use this
   option for a `vercel.app` hostname because you do not control its DNS.
3. Choose **HTML tag** verification. Copy the tag's `content` value into a Vercel
   **Production** environment variable named `GOOGLE_SITE_VERIFICATION`. The app
   also accepts the full verification tag and the existing
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` variable.
4. Redeploy, then return to Search Console and select **Verify**.
5. Submit `sitemap.xml` in Search Console's **Sitemaps** screen.
6. Inspect the production homepage in **URL Inspection**, run **Test live URL**,
   and select **Request indexing** if the page is eligible.

These steps follow Google's [crawl request guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
Google may take days or weeks to crawl changes, and neither indexing nor a first
place ranking is guaranteed. Add the same portfolio URL to your GitHub and
LinkedIn profiles so visitors can find the site from those profiles too.

## Check after deployment

- `/`: one canonical URL using the production origin, a title starting with the
  full name, `index, follow` robots metadata, and valid JSON-LD using the same origin.
- `/robots.txt`: allows crawling and links to the production `/sitemap.xml`.
- `/sitemap.xml`: contains only the production homepage, with no invented
  modification date or section anchor URLs.
- `/legacy`: retains `noindex` and a canonical link to the current homepage.
- A preview deployment: `noindex` metadata and `Disallow: /` in `/robots.txt`.

Validate structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results)
or the [Schema Markup Validator](https://validator.schema.org/).
