import { useDispatch } from "react-redux";
import { client } from "./../../utils/KindeConfig";
import { supabase } from "./../../utils/SupabaseConfig";
import { useEffect } from "react";
import { setUser } from "../redux/userSlice";
import { setCategory } from "../redux/categorySlice";

export const getAllCategory = (setLoad) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoryList = async () => {
      setLoad(true);
      try {
        const user = await client.getUserDetails();
        console.log(user);
        dispatch(setUser(user));
        const { data, error } = await supabase
          .from("category")
          .select("*,categoryItems(*)")
          .eq("created_by", user.email)
          .order("created_at", { ascending: false });
        console.log("data", data);
        dispatch(setCategory(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    getCategoryList();
  }, []);
};
