export interface Blog {
    userId: number; 
    id: number;
    title: string;
    body: string;
    image?: string;
    author? : string;
  }