const AuthorSectionTitle = ({ title }) => {
  return (
    <div className="mb-5 border border-primary p-4">
      <h2 className="w-fit rounded-t-sm px-4 py-1 font-bold uppercase text-[#DC2626] md:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default AuthorSectionTitle;
