type ProgressBarProps = {
    stepOrder: number[];
    currentStepIndex: number;
    goToStep: (index: number) => void;
};

export default function ProgressBar({ stepOrder, currentStepIndex, goToStep }: ProgressBarProps) {
    return (
        <div className="flex space-x-2 mb-8 w-full max-w-[31rem] mx-auto">
            {stepOrder.map((step, index) => (
                <div
                    key={step}
                    // Only allow clicking on previous steps
                    className={`flex-1 h-2 rounded-2xl ${index <= currentStepIndex ? "bg-[#0066FF] cursor-pointer" : "bg-[#0066FF]/50"}`}
                    onClick={() => {
                        if (index < currentStepIndex) goToStep(index);
                    }}
                />
            ))}
        </div>
    );
}