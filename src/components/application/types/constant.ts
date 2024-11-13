export interface ApplicationItem {
  Application: Array<{
    applicationSeoData: ApplicationSeoData;
    Header: Header;
    SelectProduct: SelectProduct;
    Technology: Technology;
    CustomizedProjects: CustomizedProjects;
  }>;
}

type ApplicationSeoData = {
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraph;
  robots: string;
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
  applicaion: string;
  title: string;
  paragraph: string;
};

export type SelectProduct = {
  placeholder: string;
  paperCup: string;
  viewMore: string;
  viewAll: string;
  category: string;
  products: Product[];
};

export type Product = {
  img: string;
  title: string;
  description: string;
  image: string;
};

type Technology = {
  craftsmanshipTechnology: string;
  paragraph: string;
  container: Craftsmanship[];
};

type Craftsmanship = {
  title: string;
  description: string;
  craftsmanshipImg: string;
};

type CustomizedProjects = {
  title: string;
  paragraph: string;
  container: ProjectContainer[];
};

type ProjectContainer = {
  title1: string;
  title2: string;
  description: string;
  img: string;
};
