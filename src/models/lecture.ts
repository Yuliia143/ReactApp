interface Lecture {
  id?: string;
  imgUrl?: string;
  title?: string;
  author?: string;
  defaultRating?: string;
  oldPrice?: string;
  newPrice?: string;
  videoUrl?: string;
  description?: string;
  file?: null | File;
}
export default Lecture;
