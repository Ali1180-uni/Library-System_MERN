import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="bg-green-900/90 backdrop-blur-sm border-t border-green-600/40 text-orange-50/80 py-6 px-8 mt-auto">
      <div className="flex flex-col items-center gap-2 text-sm">
        <p>© 2026 Library Management System. All rights reserved.</p>
        <p>Developed by Ali with ❤️</p>

        <div className="flex gap-6 mt-1">
          <a
            href="https://www.linkedin.com/in/hiali1180/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-orange-50 transition-colors"
          >
            <LinkedInIcon /> LinkedIn
          </a>

          <a
            href="https://github.com/Ali1180-uni"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-orange-50 transition-colors"
          >
            <GitHubIcon /> GitHub
          </a>
        </div>

        <a
          href="https://gravatar.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 mt-2 text-xs text-orange-50/50 hover:text-orange-50/80 transition-colors"
        >
          <img
            src="https://gravatar.com/favicon.ico"
            alt="Gravatar"
            className="w-3.5 h-3.5"
          />
          Powered by Gravatar
        </a>
      </div>
    </div>
  );
}

export default Footer;