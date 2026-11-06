import Portfolio from "@/components/portfolio/Portfolio";
import JsonLd from "@/components/seo/JsonLd";
import ThemeProvider from "@/components/portfolio/ThemeProvider";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ThemeProvider>
        <Portfolio />
      </ThemeProvider>
    </>
  );
}
