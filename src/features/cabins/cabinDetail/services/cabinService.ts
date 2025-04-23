import axios from "axios";
import { Cabin } from "../types/cabinDetailTypes";
import { ParamValue } from "next/dist/server/request/params";

export async function getCabinDetail( _id: ParamValue ): Promise<Cabin> {
    try {
      const response = await axios.get<Cabin>(
        `http://localhost:5000/api/cabins/cabinDetail/${_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cabin detail:", error);
      throw error;
    }
  }