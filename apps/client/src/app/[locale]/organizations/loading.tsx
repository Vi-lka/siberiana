import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";

export default function LoadingOrganizations() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24">
        <RowBigBlockSkeleton />
      </div>
    </>
  );
}
