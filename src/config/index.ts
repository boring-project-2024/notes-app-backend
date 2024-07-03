export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT as string, 10),
  HOST: process.env.HOST,
  HOST_URL: `http://${process.env.HOST}:${process.env.PORT}`,
  isDev: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
});
