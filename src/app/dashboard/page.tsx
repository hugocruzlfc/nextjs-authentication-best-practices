import { verifySession } from "@/lib";
import { Role } from "@prisma/client";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const session = await verifySession();
  const role = session?.role;

  if (role === Role.ADMIN) {
    return <div>AdminDashboard</div>;
  }

  return <div>UserDashboard</div>;
};

export default Page;
