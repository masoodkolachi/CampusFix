import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error("MONGODB_URI and JWT_SECRET must be set in server/.env");
    process.exit(1);
  }
  await connectDatabase(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
