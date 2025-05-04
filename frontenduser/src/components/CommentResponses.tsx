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

    function renderAddNewReply() {
        return (
            <div className="mt-4 pl-4 border-l border-gray-200">
                <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    rows={2}
                    placeholder="Write a response..."
                    value={responseText}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    className="bg-cyan-600 text-white px-4 py-1 rounded hover:bg-cyan-500"
                    onClick={onReply}
                >
                    Reply
                </button>
            </div>
        );
    }

    return (
        <>
            {comment.responses.length > 0 && (
                <div className="mt-4 space-y-4 pl-4 border-l border-gray-200">
                    {comment.responses.map((response) => (
                        <div
                            key={response.id}
                            className="bg-gray-50 rounded-2xl shadow-inner p-4"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-cyan-600">
                                    {response.user.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {getFormattedDate(response.published_at)}
                                </span>
                            </div>
                            <p className="text-gray-700">{response.text}</p>
                        </div>
                    ))}
                </div>
            )}

            {user ? renderAddNewReply() : ""}
        </>
    );
}

export default CommentResponses;
