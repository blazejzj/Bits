import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Comment from "../types/comment";

type Props = {
    comment: Comment;
    responseText: string;
    onChange: (text: string) => void;
    onReply: () => void;
    getFormattedDate: (dateString: string) => string;
};

function CommentResponses({
    comment,
    responseText,
    onChange,
    onReply,
    getFormattedDate,
}: Props) {
    const { user } = useAuth();
    const [isAddingResponse, setIsAddingResponse] = useState<boolean>(false);

    function renderAddNewReplyForm() {
        return (
            <div className="mt-4 pl-4 ">
                <textarea
                    className="w-full border border-gray-300 rounded-2xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-300 mb-3"
                    rows={2}
                    placeholder="Write a response..."
                    value={responseText}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="flex gap-3">
                    <button
                        className="bg-cyan-600 text-white px-5 py-2 rounded-full shadow-sm hover:bg-cyan-700 transition duration-300 hover:cursor-pointer"
                        onClick={() => {
                            onReply();
                            setIsAddingResponse(false);
                        }}
                    >
                        Reply
                    </button>
                    <button
                        className="text-sm text-gray-500 hover:text-gray-700 transition hover:cursor-pointer"
                        onClick={handleAddNewReplyButtonToggle}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    function handleAddNewReplyButtonToggle() {
        setIsAddingResponse(!isAddingResponse);
    }

    function renderAddNewReplyToggleButton() {
        return (
            <div>
                {user && (
                    <button
                        className="bg-cyan-600 text-s text-white px-3 py-0.5 rounded-full shadow-sm hover:bg-cyan-700 transition duration-300 hover:cursor-pointer mt-6"
                        onClick={handleAddNewReplyButtonToggle}
                    >
                        Reply
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            {comment.responses.length > 0 && (
                <div className="mt-4 space-y-4 pl-4  mb-5">
                    {comment.responses.map((response) => (
                        <div
                            key={response.id}
                            className="bg-gray-50 rounded-2xl shadow-inner p-4"
                        >
                            <div className="flex justify-between mb-1 flex-col">
                                <span className="text-xs text-gray-500 ml-auto">
                                    {getFormattedDate(response.published_at)}
                                </span>
                                <span className="font-medium text-cyan-600">
                                    {response.user.name}
                                </span>
                            </div>
                            <p className="text-gray-700">{response.text}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-t border-gray-200">
                {user && isAddingResponse
                    ? renderAddNewReplyForm()
                    : renderAddNewReplyToggleButton()}
            </div>
        </>
    );
}

export default CommentResponses;
