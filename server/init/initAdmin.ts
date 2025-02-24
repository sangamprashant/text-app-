import _env from "../config/env";
import { User, UserRole } from "../models/User";

export const initializeAdmin = async () => {
  const existingAdmin = await User.findOne({ role: UserRole.ADMIN });
  if (!existingAdmin) {
    await User.create({
      name: _env.ADMIN_NAME,
      email: _env.ADMIN_EMAIL,
      password: _env.ADMIN_PASSWORD,
      role: UserRole.ADMIN,
    });
    console.log("Admin created...");
  }
};
