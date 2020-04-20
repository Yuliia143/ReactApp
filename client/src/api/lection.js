
export default class LectureService {
    getLectures = async () => {
    const url = 'https://glacial-chamber-22605.herokuapp.com/api/lectures/all';
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };
}



