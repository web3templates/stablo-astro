export interface Props {
  name: string;
  slug: string;
  image: string;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [
  {
    name: "Mario Sanchez",
    slug: "mario-sanchez",
    image: "./src/assets/authors/mario.webp",
    bio: "Mario is a Staff Engineer specialising in Frontend at Vercel, as well as being a co-founder of Acme and the content management system Sanity. Prior to this, he was a Senior Engineer at Apple.",
  },
  {
    name: "Joshua Wood",
    slug: "joshua-wood",
    image: "./src/assets/authors/joshua.webp",
    bio: "Joshua is a Microsoft Azure Certified Cloud Professional and a Google Certified Associate Cloud Engineer. A Data Analytics at Acme, specializing in the use of cloud infrastructure for Machine Learning and Deep Learning operation at scale.",
  },
  {
    name: "Erika Oliver",
    slug: "erika-oliver",
    image: "./src/assets/authors/erika.webp",
    bio: "Erika Oliver is a successful entrepreuner. She is the founder of Acme Inc, a bootstrapped business that builds affordable SaaS tools for local news, indie publishers, and other small businesses.",
  },
];
