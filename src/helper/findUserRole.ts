import { db } from "@/utils/db";

const findUserRole  = (email: string) => {
   try {
    const user = db.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error finding user role:", error);
    return null;
  }
};

export default findUserRole;