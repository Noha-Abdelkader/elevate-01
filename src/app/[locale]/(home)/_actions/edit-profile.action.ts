"use server";

import { JSON_HEADER } from "@/lib/constants/api.constants";
import { EditProfileSchemaFields } from "@/lib/schemes/auth.schema";
import { AuthHeader } from "@/lib/utils/auth-info";

export const editProfileAction = async (values: EditProfileSchemaFields) => {
  console.log(values , 'actiiiiiiiiiiiiiiiiiiiiiiion')
 
    const response = await fetch(`${process.env.BASEURL}/auth/editProfile`, {
      method: "PUT",
      body: JSON.stringify({ ...values }),
      headers: { ...JSON_HEADER,
        ... await AuthHeader()
       },
    });
    
    const payload = await response.json();
    return payload;
   
};
