import sanitize from "sanitize-html";
import { Company, Job } from "server/models";
import { getAllJobs, getCompanyById } from "server/services/jobs.service";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(Job)
export class JobResolver {
  @Query(() => [Job])
  async jobs(@Arg("limit", () => Number, { nullable: true }) limit?: number) {
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
        } as Job)
    );
    return results.slice(0, limit || apiResults.length);
  }

  @FieldResolver(() => Company)
  async company(@Root() job: Job) {
    const apiData = await getCompanyById(`/companies/${job.companyId}`);
    const data: Company = {
      id: apiData.id,
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
  }
}
