import { auth } from "@/lib/auth"; // Import your Better Auth instance
import { hashPassword } from "better-auth/crypto"; // Correct export name

async function seedAdmin() {
  const { internalAdapter } = await auth.$context;
  const adminEmail = "admin@example.com";
  const adminPassword = "YourSecurePassword123";

  try {
    const existingUser = await internalAdapter.findUserByEmail(adminEmail);
    if (existingUser) {
      console.log("Admin user already exists.");
      return;
    }

    // Use hashPassword here
    const hashedPassword = await hashPassword(adminPassword);

    const user = await internalAdapter.createUser({
      email: adminEmail,
      name: "System Admin",
      role: "admin",
      emailVerified: true,
      username: "admin_user",
      displayUsername: "System Admin",
      firstName: "System",
      lastName: "Admin",
      department: "Admin",
      active: true,
    });

    await internalAdapter.linkAccount({
      userId: user.id,
      accountId: adminEmail,
      providerId: "credential",
      password: hashedPassword, // Hashed version
    });

    console.log("✅ Admin created with hashed password!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit();
  }
}

seedAdmin();