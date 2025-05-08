import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Comment from "../types/comment";
import Response from "../types/response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

type Props = {
    comment: Comment;
    responseText: string;
    onChange: (text: string) => void;
    onReply: () => void;
    getFormattedDate: (dateString: string) => string;
    clearResponseMessagesAndErrors: () => void;
    handleDeleteResponse: (responseId: string, commentId: string) => void;
    getPost: () => void;
    addNewResponseError: (commentId: string, err: string) => void;
    addNewResponseMessage: (commentId: string, msg: string) => void;
};

function CommentResponses({
    comment,
    responseText,
    onChange,
    onReply,
    getFormattedDate,
    clearResponseMessagesAndErrors,
    handleDeleteResponse,
    getPost,
    addNewResponseMessage,
    addNewResponseError,
}: Props) {
    const { user } = useAuth();
    const [isAddingResponse, setIsAddingResponse] = useState<boolean>(false);
    const [editedResponseId, setEditedResponseId] = useState<string | null>("");
    const [editedResponseText, setEditedResponseText] = useState<string>();
    const { postid } = useParams();

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
        clearResponseMessagesAndErrors();
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

    function renderDeleteResponse(commentId: string, responseId: string) {
        return (
            <button onClick={() => handleDeleteResponse(commentId, responseId)}>
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-cyan-700 text-xl transition-colors duration-300 hover:text-cyan-500 hover:cursor-pointer"
                />
            </button>
        );
    }

    function renderEditResponse(response: Response) {
        return (
            <button
                onClick={() => handleEditResponse(response.id, response.text)}
            >
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-cyan-700 text-xl transition-colors duration-300 hover:text-cyan-500 hover:cursor-pointer"
                />
            </button>
        );
    }

    function handleEditResponse(responseId: string, responseText: string) {
        setEditedResponseId(responseId);
        setEditedResponseText(responseText);
        clearResponseMessagesAndErrors();
    }

    async function handleSaveEditResponse(
        commentId: string,
        responseId: string
    ) {
        try {
            const newResponse = {
                text: editedResponseText,
            };
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postid}/comments/${commentId}/${responseId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(newResponse),
                }
            );
            if (!response.ok) {
                const body = await response.json();
                addNewResponseError(commentId, body.errors[0].msg);
            } else {
                const body = await response.json();
                addNewResponseMessage(commentId, body.msg);
                setEditedResponseId(null);
                setEditedResponseText("");
            }
        } catch (err) {
            if (err instanceof Error) {
                addNewResponseError(commentId, err.message);
            }
        }
        getPost();
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
                                    {response.published_at !==
                                        response.updated_at && (
                                        <span className="text-sm text-gray-500">
                                            Edited
                                        </span>
                                    )}
                                </span>
                                <span className="font-medium text-cyan-600">
                                    {response.user.name}
                                </span>
                                <span className="text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 text-left sm:text-right">
                                    <div className="flex gap-2 items-center justify-end">
                                        {user?.id === comment.userId &&
                                            renderEditResponse(response)}
                                        {user?.id === comment.userId &&
                                            renderDeleteResponse(
                                                comment.id,
                                                response.id
                                            )}
                                    </div>
                                </span>
                            </div>
                            {editedResponseId === response.id ? (
                                <div className="mb-4">
                                    <textarea
                                        className="w-full border border-gray-300 rounded-2xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-300"
                                        value={editedResponseText}
                                        onChange={(e) => (
                                            setEditedResponseText(
                                                e.target.value
                                            ),
                                            clearResponseMessagesAndErrors()
                                        )}
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            className="bg-cyan-600 text-white px-5 py-2 rounded-full shadow-sm hover:bg-cyan-700 transition duration-300 text-sm hover:cursor-pointer"
                                            onClick={() =>
                                                handleSaveEditResponse(
                                                    comment.id,
                                                    response.id
                                                )
                                            }
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="text-sm text-gray-500 hover:text-gray-700 transition hover:cursor-pointer"
                                            onClick={() => (
                                                setEditedResponseId(null),
                                                clearResponseMessagesAndErrors()
                                            )}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-800 mb-4">
                                    {response.text}
                                </p>
                            )}
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
