export interface ICourse {
  id: string;
  title: string;
  description: string;
  coverImg: string;
  rating: number;
  alumniCount: number;
  lessonsCount: number;
  timeToComplete: number;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
}
