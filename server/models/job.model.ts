import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Job {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  level: string;

  @Field(() => String)
  landingPage: string;

  @Field(() => [String])
  categories: string[];

  @Field(() => String)
  publicationDate: string;

  @Field(() => Number)
  companyId: number;

  @Field(() => Company)
  company: Company;
}

@ObjectType()
export class Company {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  landingPage: string;

  @Field(() => String)
  jobsPage: string;

  @Field(() => String)
  image: string;

  @Field(() => [String])
  industries: string[];

  @Field(() => String)
  publicationDate: string;
}
