import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../components/ErrorPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import userEvent from "@testing-library/user-event";

describe("ErrorPage component", () => {
    it("renders error message and a link home", () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        const errorHeading = screen.getByText(
            /Page you are looking for doesn't exist!/
        );
        expect(errorHeading).toBeInTheDocument();

        const homeLink = screen.getByText(/get home/);
        expect(homeLink).toBeInTheDocument();
    });

    it("home link takes user to '/'", async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={["/wrongurl"]}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MemoryRouter>
        );

        // expect user to start at error page, home link exists
        const homeLink = screen.getByText(/get home/);
        expect(homeLink).toBeInTheDocument();

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();

        await user.click(link);

        const homePageHeader = screen.getByText(/Hey! I am/);
        expect(homePageHeader).toBeInTheDocument();
    });
});
