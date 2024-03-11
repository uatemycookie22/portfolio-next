import {DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes} from "react";

type TextFieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & Pick<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "htmlFor"> & {
    error?: boolean
    label?: string
}

export function TextField(props: TextFieldProps) {
    const {htmlFor, error, className, label, ...inputProps} = props

    return (
        <div className="w-full mt-4">
            <label htmlFor={htmlFor} className="block text-black dark:text-white font-medium mb-2">
                {label}
            </label>
            <input
                {...inputProps}
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight 
				shadow-lg shadow-neutral dark:shadow-black  
				border rounded border-black/40 hover:border-black outline-0 dark:border-white/40 dark:hover:border-white
				transition-all duration-100
				bg-zinc-200 text-black
				${error ? 'border-red-500' : 'border-gray-300'}
				`}
            />
            {error && (
                <p className="text-red-500 text-xs italic mt-2">
                    This field is required.
                </p>
            )}
        </div>
    );
}