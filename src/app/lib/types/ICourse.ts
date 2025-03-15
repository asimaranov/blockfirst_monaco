export interface IReadyCourseInfo {
  rating: number;
  alumniCount: number;
  lessonsCount: number;
  duration: number;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
  labelTitle: string;
  labelImg: string;

}
export interface ICourse {
  id: string;
  title: string;
  description: string;
  smallImg: string;
  bigImg: string;
  soon: boolean;
  info?: IReadyCourseInfo;
}
