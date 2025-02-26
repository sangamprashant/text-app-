import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  ADMIN_NAME: string;
  ADMIN_PASSWORD: string;
  ADMIN_EMAIL: string;
  JWT_SECRET: string;
}

const _env: EnvConfig = {
  ADMIN_NAME: process.env.ADMIN_NAME || "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
};

// Validate that required variables are set
for (const [key, value] of Object.entries(_env)) {
  if (!value) {
    console.warn(`⚠️ Warning: Missing environment variable ${key}`);
  }
}

export default _env;
