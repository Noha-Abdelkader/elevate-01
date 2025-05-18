"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import QuizDialog from "./quiz-dialog";
import ProfileDrawer from "./profile-drawer";
import { useSearch } from "@/components/providers/context/search-context";
import { useSession } from "next-auth/react";

const SearchBar = () => {
  // Translation
  const t = useTranslations();

  // hooks
  const { data } = useSession();

  // query
  const { query, setQuery } = useSearch();

  return (
    <div className="grid grid-cols-10 gap-4 w-full mb-7  items-center">
      <div className={data?.user.role == "user"  ? 'col-span-9' : 'col-span-8'}>
        <Input
          type="text"
          placeholder={t("search-quiz")}
          className="  bg-white shadow_dark border-none input-search "
          size={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* <Button variant="main" size={'lg'} className='col-span-2 '>{t("start-quiz")}</Button> */}
      {data?.user.role == "user" ? (
        <div className={`col-span-1 border rounded-full size-9 p-1`}>
          <ProfileDrawer />
        </div>
      ) : (
        <div className="col-span-2">

        <QuizDialog />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
