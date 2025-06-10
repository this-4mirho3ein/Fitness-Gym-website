import React, { useEffect, useState } from "react";
import Header from "./header";
import toast from "react-hot-toast";
import { getCurrentUserFromSupabase } from "@/actions/users";
import { error } from "console";
import { IUser } from "@/interfaces";
import Spinner from "@/components/ui/spinner";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getCurrentUserFromSupabase();
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);
      }
    } catch (error: any) {
      setError(error.message || "an error occured while fetching user data");
      toast.error("an error occured while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner parentHeight={"100vh"} />;
  }

  if (error) {
    return <div className="p-5">{error}</div>;
  }

  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
