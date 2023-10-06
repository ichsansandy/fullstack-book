export type Book = {
  code: string;
  title: string;
  author: string;
  stock: number;
};

export type Action = 'rent' | 'available'