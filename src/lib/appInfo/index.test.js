import test from 'ava';
import {
  getFavicon,
  getTitle,
  urlExists,
  getInfo,
} from './';

const URL = 'https://google.com';

test('getFavicon', async (t) => {
  try {
    const data = await getFavicon(URL);
    t.truthy(data);
  } catch (error) {
    t.fail(error);
  }
});
test('getTitle', async (t) => {
  try {
    const data = await getTitle(URL);
    t.truthy(data);
  } catch (error) {
    t.fail(error);
  }
});
test('urlExists', async (t) => {
  try {
    const data = await urlExists(URL);
    t.truthy(data);
  } catch (error) {
    t.fail(error);
  }
});
test('getInfo', async (t) => {
  try {
    const data = await getInfo(URL);
    t.truthy(data);
  } catch (error) {
    t.fail(error);
  }
});