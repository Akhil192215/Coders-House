import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";


export function useLoadingWithrefresh() {
    const dispatch = useDispatch()
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        dispatch(setAuth(data))
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {Loading}
}
