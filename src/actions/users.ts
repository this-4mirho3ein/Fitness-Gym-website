"use server";

import supabase from "@/config/supabase-config";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserFromSupabase = async () => {
  try {
    // if the clerk user is present in the supabase return the user , else create a new user and return the user
    const clerkUser = await currentUser();

    const { data, error } = await supabase
      .from("user_profile")
      .select("*")
      .eq("clerk_user_id", clerkUser?.id);
      
    if (error) {
      throw error;
    }
    if (data && data.length) {
      return {
        success: true,
        data: data[0],
      };
    throw new Error("user not found");

    }

    //create a new user in the supabase db

    const newUserObj = {
      clerk_user_id: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
      name: clerkUser?.fullName + " " + clerkUser?.lastName,
      is_active: true,
      is_admin: false,
    };

    const { data: newUser, error: newUserError } = await supabase
      .from("user_profile")
      .insert([newUserObj])
      .select("*");
    if (newUserError) {
      throw newUserError;
    }
    return {
      success: true,
      data: newUser[0],
    };
    
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
