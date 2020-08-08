import express from 'express';
import expressip from 'express-ip';
import path from 'path';
import { load } from 'ts-dotenv';

const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV === 'development';

interface IpInfo {
  ip: string;
  error?: string;
  city: string;
  country: string;
}

const env = load({
  USERNAME: { default: 'User', type: String } 
});

// retrieve the ip
app.use(expressip().getIpInfoMiddleware);
// static assets
app.use(express.static(path.join(process.cwd(), 'build')));

// routes
const routes = express.Router();

routes.get('/username', (req, res) => {
  res.json({
    username: env.USERNAME
  });
});

app.use('/api', routes);

app.get('/api/track', (req: any, res) => {
  const ipInfo :IpInfo = req.ipInfo;

  if(!ipInfo.error) {
    // store the tracked info
  }

  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
})

app.listen(PORT, () => {
  if (isDev) {
    console.log(`🚀 development server started in port ${PORT}`)
  } else {
    console.log(`🚀 production server started in port ${PORT}`)
  }
});
