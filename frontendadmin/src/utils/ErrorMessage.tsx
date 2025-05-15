interface ErrorMessageProps {
    errorMsg: string;
}

function ErrorMessage({ errorMsg }: ErrorMessageProps) {
    return (
        <p className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2">
            {errorMsg}
        </p>
    );
}

export default ErrorMessage;
