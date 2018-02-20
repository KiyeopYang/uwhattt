import express from 'express';
import logging from '../../lib/logging';
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

const router = express.Router();
const NAME = '앱';

router.get(
  '/:url',
  async (req, res) => {
    const PROCESS = '정보 조회';
    const { url } = req.params;
    const decodedUrl = decodeURIComponent(url);
    try {
      const { favicon, title } = await getInfo(decodedUrl);
      res.json({
        url,
        favicon,
        title,
      });
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
    }
  },
);
// 여기부터

// 회원가입
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '회원 가입';
    try {
      const {
        domain,
        favicon,
        title,
      } = req.body;
      let app = await new App({
        domain,
        favicon,
        title,
      }).save();
      res.json(fromMongo(app.toObject()));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
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
