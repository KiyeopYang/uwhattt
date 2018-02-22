import express from 'express';
import UrlParser from 'url-parse';
import Multer from 'multer';
import pathLib from 'path';
import {
  getUrl,
  upload,
} from '../../lib/GCSFileManager';
import logging from '../../lib/logging';
import keyGen from '../../lib/generateKey';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  getInfo,
} from '../../lib/appInfo';
import {
  App,
} from '../../models';
import auth from '../../auth';

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});
const router = express.Router();
const NAME = '앱';

router.get(
  '/info/:url',
  async (req, res) => {
    const PROCESS = '정보 조회';
    const baseUrl = req.params.url;
    let url = decodeURIComponent(baseUrl);
    const httpsIncluded = url.includes('https://');
    const httpIncluded = url.includes('http://');
    try {
      let isHttps = httpsIncluded;
      let info;
      if (!httpsIncluded && !httpIncluded) {
        try {
          url = `https://${baseUrl}`;
          info = await getInfo(url);
          isHttps = true;
        } catch (error) {
          url = `http://${baseUrl}`;
          info = await getInfo(url);
        }
      } else {
        info = await getInfo(url);
      }
      if (!info) {
        logging.error(error);
        return res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
      }
      const { favicon, title } = info;
      const URL = new UrlParser(url);
      return res.json({
        url,
        favicon,
        title,
        isHttps,
        domain: URL.hostname,
        path: URL.pathname,
      });
    } catch (error) {
      logging.error(error);
      return res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
    }
  },
);
// 추가
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '추가';
    try {
      const {
        favicon,
        title,
        isHttps,
        domain,
        path,
      } = req.body;
      let app = await new App({
        favicon,
        title,
        isHttps,
        domain,
        path,
      }).save();
      res.json(fromMongo(app.toObject()));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
    }
  },
);
// 추가(파일)
router.post(
  '/withCustomImg',
  multer.single('file'),
  async (req, res) => {
    const PROCESS = '추가';
    try {
      const { file, body } = req;
      const {
        title,
        isHttps,
        domain,
        path,
      } = JSON.parse(body.data);
      const url = await upload({
        filename: `${keyGen()}${pathLib.extname(file.originalname)}`,
        dir: 'appImages',
        content: file.buffer,
      });
      let app = await new App({
        favicon: url,
        title,
        isHttps,
        domain,
        path,
      }).save();
      res.json(fromMongo(app.toObject()));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
    }
  },
);
router.get(
  '/:id',
  async (req, res) => {
    const PROCESS = '조회';
    try {
      const { id } = req.params;
      const app =  await App.findOne({ _id: id }).lean().exec();
      res.json(fromMongo(app));
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
router.get(
  '/',
  async (req, res) => {
    const PROCESS = '조회';
    try {
      const appList =  await App.find({}).lean().exec();
      res.json(fromMongo(appList));
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
// 삭제
router.delete(
  '/:id',
  async (req, res) => {
    const PROCESS = '삭제';
    const { id } = req.params;
    try {
      await App.deleteOne(
        { _id: id },
      );
      res.json({ success: true });
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
export default router;
