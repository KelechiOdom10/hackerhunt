import axios from "axios";
import NodeCache from "node-cache";
import { CompanyApiResult, JobsApiResult } from "~/types";

const stdCacheTTL = 86400;
const JOBS_API_URL = "https://www.themuse.com/api/public";
export const cache = new NodeCache({ stdTTL: stdCacheTTL, checkperiod: 600 });

async function getAllJobs(endpoint: string) {
  const cachedData = cache.get(endpoint) as JobsApiResult;
  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get<JobsApiResult>(
    `${JOBS_API_URL}${endpoint}`,
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
      params: {
        page: 1,
        category: "Software Engineering",
        location: "London, United Kingdom",
      },
    }
  );
  const data = response.data;
  cache.set(endpoint, data);

  return data;
}

async function getCompanyById(endpoint: string) {
  const cachedData = cache.get(endpoint) as CompanyApiResult;
  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get<CompanyApiResult>(
    `${JOBS_API_URL}${endpoint}`,
    { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
  );
  const data = response.data;
  cache.set(endpoint, data);

  return data;
}

export { getAllJobs, getCompanyById };
