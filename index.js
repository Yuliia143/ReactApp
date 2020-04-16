// const getLectures = async () => {
//     console.log('bla')
//     const url = 'http//:localhost:3000/api/lectures'
//     const res = await fetch(url);
//     return await res.json();
//   };
  
const getLectures = async () => {
  console.log('bla')
  const url = 'http//:localhost:3000/api/lectures'
  const res = await fetch(url);
  return await res.json();
};

getLectures()
  
  