export interface BlogsLayoutItem {
  blogsLayout: Array<{
    blogsLayoutSeoData: BlogsLayoutSeoData;
    robots: string;
    Header: Header;
  }>;
}

type BlogsLayoutSeoData = {
  robots: string;
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraph;
  alternates: Alternates;
  twitter: Twitter;
};

type OpenGraph = {
  title: string;
  description: string;
  images: OpenGraphImage[];
};

type OpenGraphImage = {
  url: string;
  alt: string;
};

type Alternates = {
  canonical: string;
};

type Twitter = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
};

type Header = {
  blogs: string;
  title: string;
  img: string;
  question: Question[];
};

type Question = {
  que: string;
  ans: string;
};
