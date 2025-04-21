function Footer() {
    function renderFooter() {
        return (
            <div className="bg-white flex flex-row justify-around mt-3 p-5">
                <div>
                    <h1>Bits</h1>
                </div>
                <div>
                    <p>Made by opex</p>
                    <p>Github here</p>
                </div>
            </div>
        );
    }
    return renderFooter();
}

export default Footer;
