"use server";

import { JSON_HEADER } from "@/lib/constants/api.constants";
import { SignupSchemaFields } from "@/lib/schemes/auth.schema";

export const signupAction = async (signupFields: SignupSchemaFields) => {
 
    const response = await fetch(`${process.env.BASEURL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ ...signupFields }),
        headers: { ...JSON_HEADER },
    });
    
    const payload = await response.json();
    return payload;
   
};
