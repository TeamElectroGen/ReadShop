const AuthorSectionTitle = ({ title }) => {
  return (
    <div className="mb-5 border-b border-primary">
      <h2 className="w-fit rounded-t-sm bg-primary px-4 py-1 font-bold uppercase md:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default AuthorSectionTitle;
