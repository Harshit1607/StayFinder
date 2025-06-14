import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173'], // 👈 Frontend URL(s) — add more if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you're using cookies or authorization headers
};

export const corsMiddleware = cors(corsOptions);
