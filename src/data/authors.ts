export interface Props {
  name: string;
  slug: string;
  image: string;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [
  {
    name: "神崎優人",
    slug: "mario-sanchez",
    image: "./src/assets/authors/6nlg3sej.png",
    bio: "Mario is a Staff Engineer specialising in Frontend at Vercel, as well as being a co-founder of Acme and the content management system Sanity. Prior to this, he was a Senior Engineer at Apple.",
  },
  {
    name: "Nana-Yoshioka",
    slug: "nana-yoshioka",
    image: "./src/assets/authors/aikon.jpg",
    bio: "ehehe",
  },
  {
    name:"wakayume",
    slug:"waka-yume",
    image:"./src/assets/authors/yannguusagi.jpg",
    bio:"clarkmember",
  },
  {
    name:"AIアーティスト選手権 実行委員会",
    slug:"ai-art",
    image:"./src/assets/authors/ai-art.jpg",
    bio:"当委員会は、AIが持つ可能性を探究する目的で設立された機関です。尚、所属メンバー数は1名です。",
  },
];
