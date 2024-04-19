const PageHeading = ({ children }: { children: string }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold  text-light_orange">{children}</h1>
    </div>
  );
};

export default PageHeading;
