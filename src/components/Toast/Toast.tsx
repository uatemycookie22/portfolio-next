import {useEffect, useState, useRef} from "react";
import {X} from "lucide-react";

interface ToastProps {
	open: boolean;
	onClose: () => void;
	severity: 'success' | 'error';
	children: React.ReactNode;
	autoHide?: boolean;
	autoHideDuration?: number;
}

export function Toast({ 
	open, 
	onClose, 
	severity, 
	children,
	autoHide = true,
	autoHideDuration = 5000
}: ToastProps) {
	const [isVisible, setIsVisible] = useState(false);
	const prevChildrenRef = useRef(children);
	
	// Reset animation when children change (new message)
	useEffect(() => {
		if (children !== prevChildrenRef.current && open) {
			setIsVisible(false);
			setTimeout(() => setIsVisible(true), 50);
			prevChildrenRef.current = children;
		}
	}, [children, open]);
	
	useEffect(() => {
		if (open) {
			setIsVisible(true);
		}
	}, [open]);
	
	useEffect(() => {
		if (open && autoHide) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				setTimeout(onClose, 300);
			}, autoHideDuration);
			return () => clearTimeout(timer);
		}
	}, [open, autoHide, autoHideDuration, onClose]);
	
	if (!open) return null;
	
	const colors = severity === 'success' 
		? 'bg-green-100/90 dark:bg-green-900/90 text-green-900 dark:text-green-100 border-green-300 dark:border-green-700'
		: 'bg-red-100/90 dark:bg-red-900/90 text-red-900 dark:text-red-100 border-red-300 dark:border-red-700';
	
	const progressColor = severity === 'success'
		? 'bg-green-600 dark:bg-green-400'
		: 'bg-red-600 dark:bg-red-400';
	
	return (
		<div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
			isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
		}`}>
			<div className={`relative flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${colors} overflow-hidden`}>
				<span>{children}</span>
				<button 
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setIsVisible(false);
						setTimeout(onClose, 300);
					}}
					className="hover:opacity-70 transition-opacity cursor-pointer"
				>
					<X size={18} />
				</button>
				{autoHide && isVisible && (
					<div 
						key={String(children)}
						className={`absolute bottom-0 left-0 h-1 ${progressColor} animate-shrink-width`}
						style={{ animationDuration: `${autoHideDuration}ms` }}
					/>
				)}
			</div>
		</div>
	);
}
