import { ExternalLink } from "lucide-react";

interface LinkButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}

const LinkButton = ({ href, icon, label, variant = "primary", external = true }: LinkButtonProps) => {
  const baseClasses = "link-button";

  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} flex items-center justify-center gap-3`}
    >
      <div className="flex justify-center">
        {icon}
      </div>

      <span className="text-center">
        {label}
      </span>

      <div className="flex justify-center">
        {external ? (
          <ExternalLink className="w-4 h-4 opacity-50" />
        ) : (
          <div className="w-4 h-4" />
        )}
      </div>
    </a>
  );
};

export default LinkButton;
