import AddBookForm from "./addbook-form";

const AddBook = () => {
  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Publish New Book</h1>
      </div>
      <div className="flex flex-1 flex-col gap-4 xl:justify-center rounded-lg border bg-background p-5 shadow-sm xl:flex-row lg:p-7">
        <div className="w-full lg:w-1/5">
          <h3 className="text-lg font-medium">Book information</h3>
        </div>
        <AddBookForm />
      </div>
    </section>
  );
};

export default AddBook;
