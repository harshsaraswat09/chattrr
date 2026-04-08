const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t dark:border-neutral-800 text-center">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Built with ❤️ for Privacy. No logs, no tracking, no BS.
      </p>
      <div className="mt-2 flex justify-center gap-4 text-xs font-medium text-neutral-400">
        <a href="#" className="hover:text-indigo-500">GitHub</a>
        <span>•</span>
        <a href="https://github.com/harshsaraswat09" className="hover:text-indigo-500">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;