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

const url = 'https://mamre.kr';
const a = encodeURI(url);
const b = encodeURIComponent(url);
console.log(a, b);