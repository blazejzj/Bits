import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function NewPost() {
    const editorRef = useRef(null);
    const [postCategory, setPostCategory] = useState<number | null>(null);

    function addNewPost() {
        console.log("adding");
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    return (
        <>
            <Editor
                apiKey={`${import.meta.env.VITE_TINYMCE_API}`}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Whats on your mind today?</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
            <button onClick={addNewPost} className="cursor-pointer">
                Create New Post
            </button>
        </>
    );
}

export default NewPost;
