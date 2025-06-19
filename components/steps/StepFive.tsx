'use client'
import { useState } from 'react';
import { StepProps } from '@/lib/types';

export default function StepFive({ data, onNext }: StepProps) {
    const [agreed, setAgreed] = useState(data.agree);

    const handleCheckboxChange = () => {
        setAgreed(!agreed);
    };

    return (
        <div className="mx-auto w-full max-w-[35rem] rounded-2xl border border-[#F2F2F2] bg-white p-6">
            <div className="">
                <h2 className="mb-6 text-2xl font-bold">
                    Terms & Conditions
                </h2>

                <div className="h-64 overflow-y-scroll border border-gray-200 rounded-lg p-4 mb-6 text-sm bg-[#f2f2f2] text-[#4D4D4D] space-y-4">
                    <p>
                        Augue aliquet dui fusce proin felis vitae. Non lectus ut mattis dis mattis dui viverra rhoncus vel. Ultrices enim eros porttitor nibh viverra odio tellus ac aenean. Enim habitant sed adipiscing volutpat feugiat morbi sapien nibh. Mauris facilisi lorem arcu pretium. Mattis volutpat viverra a orci porttitor ac ipsum sem. Sodales scelerisque quis duis tincidunt senectus. Sit euismod amet velit adipiscing odio scelerisque.
                    </p>
                    <p>
                        Nunc viverra congue mi nibh turpis. Est lacus ullamcorper est odio ut congue sed. Nibh eu arcu tempor scelerisque proin faucibus nisi. Eget suspendisse ipsum vestibulum augue pulvinar hac lorem augue. Purus congue ullamcorper neque in porta.
                    </p>
                    <p>
                        Sit habitant semper venenatis nullam lectus. Vitae faucibus et eget hendrerit vitae pellentesque viverra purus. Tortor pellentesque laoreet velit sollicitudin sed. Mattis tortor sollicitudin nec accumsan ultricies semper commodo sit. Quam neque ultricies vitae neque mauris rutrum. Ultrices iaculis nam eget in duis ipsum. Faucibus ut pharetra sapien donec condimentum sagittis. Tortor volutpat accumsan vel ut erat.
                    </p>
                    <p>
                        Rhoncus risus facilisis nibh purus facilisi. Id mi et purus nulla. Morbi eget ut facilisi enim blandit nunc faucibus sit. Viverra laoreet sed pretium velit velit ultrices convallis. Dui amet eu nec in cras non felis in morbi.
                    </p>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="agree"
                        className="mr-2"
                        checked={agreed}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agree" className="text-sm text-gray-700">
                        Click here to agree that you understood the terms & conditions.
                    </label>
                </div>

                <button
                    type="button"
                    disabled={!agreed}
                    className={`w-full py-3 rounded text-white font-medium transition-colors ${agreed ? 'bg-[#1639CE] cursor-pointer' : 'bg-[#D9D9D9] cursor-not-allowed'}`}
                    onClick={() => onNext({agree: agreed})}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
