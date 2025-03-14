export interface ICourse {
  id: string;
  title: string;
  description: string;
  smallImg: string;
  bigImg: string;
  rating: number;
  alumniCount: number;
  lessonsCount: number;
  duration: number;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
}
