import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

import type { Category } from "../../types/category";

function NewPost() {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [readyToPublish, setReadyToPublish] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        categoryId: "",
        published: "true",
    });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchAllCategories() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/category`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const body = await response.json();
                    setCategories(body);
                    if (body.length > 0 && !formData.categoryId) {
                        setFormData((prev) => ({
                            ...prev,
                            categoryId: body[0].id,
                        }));
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllCategories();
    });

    function toggleReadyToPublish() {
        setReadyToPublish(!readyToPublish);
    }

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function resetFormData() {
        setFormData({
            title: "",
            text: "",
            categoryId: "",
            published: "false",
        });
    }

    function renderReadyToPublishContainer() {
        return (
            <div className="p-15 rounded-md absolute z-100 bg-white top-10 shadow-md border-gray-200 border-1">
                <h2 className="font-bold text-2xl text-gray-700 text-center mb-6 tracking-tight">
                    Ready to create?
                </h2>
                <form
                    onSubmit={addNewPost}
                    className="ml-3 flex flex-col gap-7"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="font-bold text-l">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            id="title"
                            className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                            onChange={handleChange}
                            value={formData.title}
                            placeholder="Enter your title ..."
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="categoryId"
                            className="font-bold text-l"
                        >
                            Category
                        </label>
                        <select
                            name="categoryId"
                            id="categoryId"
                            className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                            onChange={handleChange}
                            value={formData.categoryId}
                        >
                            {categories.map((cat) => (
                                <option
                                    value={cat.id}
                                    className="focus:outline-none"
                                    key={cat.id}
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="published" className="font-bold text-l">
                            Publish?
                        </label>
                        <select
                            name="published"
                            id="published"
                            onChange={handleChange}
                            className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="flex gap-3 mt-5 justify-center">
                        <button
                            className="cursor-pointer w-32 py-2 rounded-lg border border-gray-300 bg-gray-700 text-white font-bold text-lg hover:bg-gray-600"
                            type="submit"
                        >
                            Create
                        </button>
                        <button
                            className="cursor-pointer w-32 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold text-lg hover:bg-gray-100"
                            onClick={toggleReadyToPublish}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    function renderTextEditor() {
        return (
            <div className="flex flex-col items-center w-full h-full">
                <Editor
                    apiKey={`${import.meta.env.VITE_TINYMCE_API}`}
                    onInit={(_evt, editor) => {
                        editorRef.current = editor as TinyMCEEditor;
                    }}
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
                <button
                    className="cursor-pointer font-bold text-4xl text-white border-1 border-gray-300 py-3 px-5 bg-gray-700 rounded-md mt-5 hover:bg-gray-600"
                    onClick={toggleReadyToPublish}
                >
                    Publish
                </button>
            </div>
        );
    }

    async function addNewPost(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const editorContent = editorRef.current
            ? editorRef.current.getContent()
            : "";
        const publishBool = formData.published === "true";
        const postData = {
            ...formData,
            text: editorContent,
            published: publishBool,
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/create`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(postData),
                    headers: { "Content-type": "application/json" },
                }
            );
            if (response.ok) {
                toggleReadyToPublish();
                resetFormData();
                if (editorRef.current) {
                    editorRef.current.setContent("");
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
        }
    }

    return (
        <div className="p-10 mt-3 w-full h-full flex flex-col items-center relative">
            <div className={readyToPublish ? "blur-sm" : ""}>
                {renderTextEditor()}
            </div>
            {readyToPublish && renderReadyToPublishContainer()}
        </div>
    );
}

export default NewPost;
