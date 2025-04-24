import React from 'react'
import AuthUI from '../_components/auth-ui';
import VerifyCodeForm from './_components/verify-code-form';

export default function Page() {
  return (
     <AuthUI title="Verify code">
       <VerifyCodeForm/>
     </AuthUI>
   );
 }
 