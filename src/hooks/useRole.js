import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useRole = () => {
  const { data: session } = useSession();

  // Fetch user data using email
  const { data } = useQuery({
    queryKey: ["role", session?.user.email],
    enabled: !!session?.user,
    queryFn: async () => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/get-user-role/${session?.user.email}`
      );
      return data;
    },
  });

  return data?.role;
};

export default useRole;
