import {AnchorHTMLAttributes, DetailedHTMLProps} from "react";
import {MDownload, MNewTabIcon} from "@icons";

export default function PdfButton(props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    const {className:_, children, ...anchorProps} = props
	return (<div className="flex gap-1">
        <a {...anchorProps} target="_blank" rel="noreferrer"
              className={`w-fit flex gap-2 items-center
              text-sl btn bg-interactive-primary hover:bg-interactive-secondary text-primary font-semibold py-2 px-4 rounded-lg
              btn-transition hover:bg-interactive-secondary`}>
            <MNewTabIcon fontSize='small' />
            <span>
                {children}
            </span>
        </a>

        <a className="btn text-sl p-2 rounded-lg" {...anchorProps} aria-label="Download resume" download>
            <MDownload />
        </a>

    </div>);
}