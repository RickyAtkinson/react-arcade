import IconLogoGithub from "./IconLogogithub";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 py-2">
      <div className="container mx-auto flex max-w-screen-md justify-between px-8">
        <span>Made with ❤️ by [at]kinson.digital</span>
        <a
          href="https://github.com/RickyAtkinson/react-arcade"
          target="_blank"
          rel="noreferrer"
          className=" transition-colors hover:text-[#2dba4e]"
        >
          <IconLogoGithub width="1.5rem" height="1.5rem" />
        </a>
      </div>
    </footer>
  );
}
