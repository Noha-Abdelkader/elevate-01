import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import User from "/assets/images/user.png";
import Image from "next/image";
import ChangePassForm from "../../(auth)/_change-password/_components/change-pass-form";
import EditProfileForm from "./edit-profile-form";

export default function ProfileDrawer() {
  return (
    <Dialog>
      {/* trigger button */}
      <DialogTrigger asChild>
        <Image
          src={User}
          alt="user"
          width={30}
          height={30}
          style={{ width: "auto", height: "auto"  , cursor:"pointer"}}
        />
      </DialogTrigger>

      {/* content */}
      <DialogContent className="mx-auto">
        {/* title */}
        <DialogTitle>
          Update profile
        </DialogTitle>
          <DialogDescription className="sr-only">
            user able to update data
          </DialogDescription>

        {/* Tabs */}
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Update info</TabsTrigger>
            <TabsTrigger value="password">Change password</TabsTrigger>
          </TabsList>

          {/* info tab */}
          <TabsContent value="info">
            <Card className="min-h-full">
              <CardContent className="space-y-2">
                <EditProfileForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* password tab */}
          <TabsContent value="password">
            <Card className="min-h-full">
              <CardContent className="space-y-2">
                <ChangePassForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
