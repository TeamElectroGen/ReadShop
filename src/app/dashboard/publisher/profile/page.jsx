import React from "react";
import PublisherProfileForm from "./publisherprofile-form";

const PublisherProfile = () => {
  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Publish New Book</h1>
      </div>
      <div className="flex flex-1 flex-col gap-4 rounded-lg border bg-background p-5 shadow-sm lg:p-7 xl:flex-row">
        <div className="w-full lg:w-1/5">
          <h3 className="text-lg font-medium">Publication information</h3>
        </div>
        <PublisherProfileForm />
      </div>
    </section>
  );
};

export default PublisherProfile;
