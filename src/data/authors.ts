export interface Props {
  name: string;
  slug: string;
  image: string;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [

  {
    name: "Ivan Arias",
    slug: "ivan-arias",
    image: "./src/assets/authors/ivan.webp",
    bio: "Ivan Arias is Proficient with Python, Flask, and JavaScript-based programming.",
  }
];
