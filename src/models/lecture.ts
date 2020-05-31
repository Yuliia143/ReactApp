interface Lecture {
  id?: string;
  imgUrl?: string;
  title?: string;
  author?: string;
  defaultRating?: string;
  videoUrl?: string;
  description?: string;
  file?: null | File;
  categoryId?: string;
  categoryTitle?: string;
}
export default Lecture;
