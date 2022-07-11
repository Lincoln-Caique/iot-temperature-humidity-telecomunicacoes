import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/datalogger', async (req, res) => {
  const { temperature, humidity } = req.body;
  const sensorData = await prisma.log.create({
      data: {
        temperature: temperature,
        humidity: humidity,
      }
  });
  return res.json(sensorData)
});


router.get('/get', async (req, res) => {
  const datas = await prisma.log.findMany()
  res.json(datas)
});



export { router };