interface ConfirmationMessage {
    confirmMsg: string;
}

function ConfirmationMessage({ confirmMsg }: ConfirmationMessage) {
    return (
        <p className="bg-green-100 text-green-700 border border-green-200 rounded-md px-4 py-2">
            {confirmMsg}
        </p>
    );
}

export default ConfirmationMessage;
