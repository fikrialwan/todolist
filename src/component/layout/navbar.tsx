export default function Navbar() {
  return (
    <header
      className="bg-custom-blue px-5 flex justify-center"
      data-cy="header-background"
    >
      <h1
        className="py-7 text-white max-w-5xl w-full font-bold text-xl"
        data-cy="header-title"
      >
        To Do List App
      </h1>
    </header>
  );
}
