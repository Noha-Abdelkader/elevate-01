declare type SearchParamas = string | string[] | undefined;

declare type RouteProps = {
  params: { locale: loacle };
  searchParams: SearchParamas;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Omit<RouteProps, "searchParams">;

// declare type LayoutProps = {
//   children: React.ReactNode;
//   params: { locale: loacle };
// };
// declare type PaginatedData<T> = {
//   message?: string;
//   metadata: {
//     currentPage: number;
//     numberOfPages: number;
//     limit: number;
//   },
//   [key:string ]:T
// } ;
declare type PaginatedData<T> = {
  message?: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
    prevPage: number;
  };
} & T;
