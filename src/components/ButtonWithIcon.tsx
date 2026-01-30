import { Download } from "lucide-react";
import type { ReactNode } from "react";


interface ButtonWithIconProps {
	children: ReactNode;
	icon?: ReactNode;
	className?: string;
}

export const ButtonWithIcon = ({ children, icon, className }: ButtonWithIconProps) => {
	return(
		<button className={`flex items-center justify-center whitespace-nowrap py-1 px-3 bg-cyan-400 rounded-md gap-2 ${className ?? ''}`}>
			{icon && <span className="shrink-0">{icon}</span>}
			<span>{children}</span>
		</button>
	)
}



interface DownloadButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  href: string;
  title?: string;
  download?: string | boolean;
  openInNewTab?: boolean;
}

export const DownloadButton = ({ 
  children, 
  icon = <Download />,
  className, 
  href, 
  title,
  download = true,
  openInNewTab = false
}: DownloadButtonProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Solo intercepta si necesito hacer ambas cosas
    if (openInNewTab && download) {
      e.preventDefault();
      
      // 1. Descargar
      const downloadLink = document.createElement('a');
      downloadLink.href = href;
      downloadLink.download = typeof download === 'string' ? download : '';
      downloadLink.click();
      
      // 2. Abrir en nueva pestaña
      const openLink = document.createElement('a');
      openLink.href = href;
      openLink.target = '_blank';
      openLink.rel = 'noopener noreferrer';
      openLink.click();
    }
  };

  return(
    <a 
      href={href} 
      title={title}
      download={download && !openInNewTab ? download : undefined}
      target={openInNewTab && !download ? '_blank' : undefined}
      onClick={handleClick}
      className={`flex items-center justify-center whitespace-nowrap py-1 px-3 bg-cyan-400 rounded-md gap-2 ${className ?? ''}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  )
}