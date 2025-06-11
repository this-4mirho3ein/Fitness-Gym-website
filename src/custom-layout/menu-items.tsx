import { IUser } from "@/interfaces";
import React from "react";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { FolderKanban, Heart, Home, List, LogOut, ShieldCheck, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface IMenuItemsProps {
  user: IUser;
  openMenuItems: boolean;
  setOpenMenuItems: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuItems({ user, openMenuItems, setOpenMenuItems }: IMenuItemsProps) {
  const iconSize = 15;

  const pathname = usePathname();
  const router = useRouter();

  const userMenuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      route: "/account",
    },
    {
      name: "Profile",
      icon: <User2 size={iconSize} />,
      route: "/account/user/profile",
    },
    {
      name: "My Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/user/subscriptions",
    },
    {
      name: "Referrals",
      icon: <Heart size={iconSize} />,
      route: "/account/user/referrals",
    },
  ];
  const adminMenuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      route: "/account",
    },
        {
      name: "Plans",
      icon: <FolderKanban size={iconSize} />,
      route: "/account/admin/plans",
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      route: "/account/admin/users",
    },
    {
      name: "Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/admin/subscriptions",
    },
    {
      name: "Customers",
      icon: <List size={iconSize} />,
      route: "/account/admin/customers",
    },
    {
      name: "Referrals",
      icon: <List size={iconSize} />,
      route: "/account/admin/referrals",
    },
  ];

  let menuItemsToRender = user.is_admin ? adminMenuItems : userMenuItems;

  return (
    <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
      <SheetContent className="px-5">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-10 mt-20">
          {menuItemsToRender.map((item, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer gap-3 p-3 rounded ${
                pathname === item.route
                  ? "bg-gray-200 border border-gray-500"
                  : ""
              }`}
              onClick={() => {
                router.push(item.route);
                setOpenMenuItems(false);
              }}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
          <SignOutButton>
            <Button>
              <LogOut size={iconSize} />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuItems;
