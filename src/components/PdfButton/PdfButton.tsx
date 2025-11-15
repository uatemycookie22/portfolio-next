import {AnchorHTMLAttributes, DetailedHTMLProps} from "react";
import {Download, ExternalLink} from "lucide-react";

export default function PdfButton(props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    const {className:_, children, ...anchorProps} = props
	return (<div className="flex gap-1">
        <a {...anchorProps} target="_blank" rel="noreferrer"
              className={`w-fit flex gap-2 items-center text-sl btn text-white font-semibold py-2 px-4 rounded-lg
               bg-violet-600 hover:bg-violet-700
               transition-duration-300`}>
            <ExternalLink size={18} />
            <span>
                {children}
            </span>
        </a>

        <a className="btn text-sl p-2 rounded-lg text-black dark:text-white" {...anchorProps} aria-label="Download resume" download>
            <Download />
        </a>

    </div>);
}