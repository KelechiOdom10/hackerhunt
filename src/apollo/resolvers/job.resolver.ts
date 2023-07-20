import { gql } from "graphql-tag";
import { Company, Job } from "../generated";
import sanitize from "sanitize-html";
import { getAllJobs, getCompanyById } from "server/services/jobs.service";

export const jobTypeDef = gql`
  type Company {
    description: String!
    id: ID!
    image: String!
    industries: [String!]!
    jobsPage: String!
    landingPage: String!
    location: String!
    name: String!
    publicationDate: String!
  }

  type Job {
    categories: [String!]!
    company: Company
    companyId: Float!
    description: String!
    id: ID!
    landingPage: String!
    level: String!
    location: String!
    name: String!
    publicationDate: String!
  }

  type Query {
    jobs(limit: Float): [Job!]!
  }
`;

export const jobResolver = {
  Query: {
    jobs: async (_parent, { limit }: { limit?: number }) => {
      const { results: apiResults } = await getAllJobs("/jobs");
      const results = apiResults.map(
        job =>
          ({
            id: job.id,
            name: job.name,
            companyId: job.company.id,
            description: sanitize(job.contents),
            landingPage: job.refs.landing_page,
            level: job.levels[0].name,
            location: job.locations[0].name,
            publicationDate: job.publication_date,
            categories: job.categories.map(category => category.name),
          } as unknown as Job)
      );
      return results.slice(0, limit || apiResults.length);
    },
  },
  Job: {
    company: async (parent: Job) => {
      try {
        const apiData = await getCompanyById(`/companies/${parent.companyId}`);
        const data: Company = {
          id: String(apiData.id),
          name: apiData.name,
          description: apiData.description,
          location: apiData.locations[0].name,
          image: apiData.refs.logo_image,
          jobsPage: apiData.refs.jobs_page,
          landingPage: apiData.refs.landing_page,
          industries: apiData.industries.map(industry => industry.name),
          publicationDate: apiData.publication_date,
        };
        return data;
      } catch (error) {
        return null;
      }
    },
  },
};
