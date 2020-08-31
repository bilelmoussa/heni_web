const PORT = Number(process.env.PORT) || 5000;
const NODE_ENV = process.env.NODE_ENV ? String(process.env.NODE_ENV) : 'development';

export {PORT, NODE_ENV};