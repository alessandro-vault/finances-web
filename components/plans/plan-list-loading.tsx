import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PlanLoadingList: React.FC = () => (
  <div className="p-10 gap-y-14 xl:w-10/12 grid grid-cols-1 md:grid-cols-2 md:gap-5 md:gap-y-10">
    {[...Array(4)].map((_, i) => (
      <section className="flex flex-col p-10" key={i}>
        <div className="mb-5">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid grid-cols-3 mb-5">
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>

        <div className="grid grid-cols-3 mb-5">
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </section>
    ))}
  </div>
);

export default PlanLoadingList;
