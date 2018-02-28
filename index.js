// import {
// 	getFavicon,
// 	getTitle,
// 	urlExists,
// } from './src/lib/appInfo';
//
// favicon("http://naver.com", function(err, favicon_url) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log(favicon_url);
// 	}
// });
// getTitleAtUrl("http://naver.com", function(title,d) {
// 	console.log(title);
// 	console.log(d);
// });

function getInfo(n) {
  return new Promise((resolve, reject) => {
    if (n > 0) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}
async function test () {
  try {
    const url = 'https://naver.com';
    const result = await getInfo(0)
      .catch(() => getInfo(2));
    console.log(result);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}
test();

