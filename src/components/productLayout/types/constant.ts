export interface ProductLayoutItem {
  ProductLayout: Array<{
    productLayoutSeoData: ProductLayoutSeoData;
    Header: Header;
    ProductsGrid: ProductsGrid;
  }>;
}

type ProductLayoutSeoData = {
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

type HeaderData = {
  title: string;
  description: string;
  image: string;
}

// Type for Header
type Header = {
  data: HeaderData[];
}

// Type for Product Details
type ProductDetails = {
  h1: string;
  h2: string;
  h3: string;
  s: string;
  sInformation: string;
  img: string;
  rangeTitle: string;
  range: string;
  punchTitle: string;
  punch: string;
  weightTitle: string;
  weight: string;
  image: string;
  imageInformation: string;
  information: string;
}

// Type for Product Variations (Servo Driven and Mechanical Cam)
type ProductVariations = {
  servoDriven?: ProductDetails[];
  mechanicalCam?: ProductDetails[];
}

// Type for Products Data
type ProductsData = {
  title: string;
  heading: string;
  paragraph: string;
  all: ProductVariations[];
}

// Type for ProductsGrid
type ProductsGrid = {
  inquiry: string;
  placeholder: string;
  all: string;
  servoDriven: string;
  mechanicalCam: string;
  readMore: string;
  readLess: string;
  viewMachine: string;
  data: ProductsData[];
}
