export interface JobsApiResult {
  page: number;
  page_count: number;
  items_per_page: number;
  took: number;
  timed_out: boolean;
  total: number;
  results: JobsResult[];
  aggregations: unknown;
}

export interface JobsResult {
  contents: string;
  name: string;
  type: string;
  publication_date: string;
  short_name: string;
  model_type: string;
  id: number;
  locations: Array<{ name: string }>;
  categories: Array<{ name: string }>;
  levels: Level[];
  tags: unknown[];
  refs: {
    landing_page: string;
  };
  company: Company;
}

interface Level {
  name: string;
  short_name: string;
}

interface Company {
  id: number;
  short_name: string;
  name: string;
}

export interface CompanyApiResult {
  description: string;
  locations: Array<{ name: string }>;
  industries: Array<{ name: string }>;
  tags: unknown[];
  short_name: string;
  name: string;
  publication_date: string;
  model_type: string;
  twitter: unknown;
  id: number;
  size: Size;
  refs: Refs;
}

interface Size {
  name: string;
  short_name: string;
}

interface Refs {
  landing_page: string;
  jobs_page: string;
  mini_f1_image: string;
  f2_image: string;
  logo_image: string;
  f1_image: string;
  f3_image: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  image: string;
  keywords: string[];
  author: {
    name: string;
  };
  social: Record<string, string>;
}
