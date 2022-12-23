import { Comment, Link, PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.vote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();

  let users: User[] = [];
  let links: Link[] = [];
  let comments: Comment[] = [];

  for (let index = 0; index < 5; index++) {
    const user = await prisma.user.create({
      data: {
        username: `${faker.name.middleName("female")}_${faker.datatype.number(
          12
        )}`,
        email: faker.internet.email(),
        password: await bcrypt.hash("password1234", 10),
      },
    });

    users.push(user);
  }

  for (let index = 0; index < 20; index++) {
    const randomUserId = faker.helpers.arrayElement(users).id;

    const link = await prisma.link.create({
      data: {
        title: faker.lorem.sentence(10),
        description: faker.lorem.paragraph(),
        url: faker.internet.url(),
        image: faker.image.business(640, 480, true),
        userId: randomUserId,
      },
    });

    links.push(link);
  }

  for (let index = 0; index < 30; index++) {
    const randomUserId = faker.helpers.arrayElement(users).id;
    const randomLinkId = faker.helpers.arrayElement(links).id;
    const name = faker.lorem.word();
    await prisma.comment.create({
      data: {
        text: faker.lorem.sentence(),
        userId: randomUserId,
        linkId: randomLinkId,
      },
    });

    const tag = await prisma.tag.findUnique({ where: { name } });
    if (!tag) {
      await prisma.tag.create({
        data: {
          name,
          links: {
            connect: { id: randomLinkId },
          },
        },
      });
    } else {
      await prisma.tag.update({
        where: {
          name,
        },
        data: {
          links: {
            connect: { id: randomLinkId },
          },
        },
      });
    }

    const vote = await prisma.vote.findFirst({
      where: { userId: randomUserId, linkId: randomLinkId },
    });
    if (!vote) {
      await prisma.vote.create({
        data: {
          userId: randomUserId,
          linkId: randomLinkId,
        },
      });
    }
  }
}

main()
  .catch(e => {
    console.log("Error seeding db", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
