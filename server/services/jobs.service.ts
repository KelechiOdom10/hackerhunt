import axios from "axios";
import { cache } from "server/utils/cache";
import { CompanyApiResult, JobsApiResult } from "~/types";

const JOBS_API_URL = "https://www.themuse.com/api/public";

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
