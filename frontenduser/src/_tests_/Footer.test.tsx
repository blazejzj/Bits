import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import ErrorPage from "../components/ErrorPage";
import userEvent from "@testing-library/user-event";

describe("Footer component", () => {
    it("logo renders and takes you to homepage if pressed", async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={["/wrongLink"]}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </MemoryRouter>
        );
        const madeBy = screen.getByText(/Made by blazejzj/);
        expect(madeBy).toBeInTheDocument();

        // confirm we are on errorPage
        const errorHeading = screen.getByText(
            /Page you are looking for doesn't exist!/
        );
        expect(errorHeading).toBeInTheDocument();

        const logoLink = screen.getByRole("homeBottomLink");
        expect(logoLink).toBeInTheDocument();
        await user.click(logoLink);

        // on home page
        const homePageHeader = screen.getByText(/Hey! I am/);
        expect(homePageHeader).toBeInTheDocument();
    });
});
