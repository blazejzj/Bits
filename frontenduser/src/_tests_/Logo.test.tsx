import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import Logo from "../components/Logo";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import HomePage from "../components/HomePage";
import userEvent from "@testing-library/user-event";

describe("Logo component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/errorPage"]}>
                <Logo />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MemoryRouter>
        );
    });

    it("should render correct text", () => {
        const text = screen.getByText(/Bits/);
        expect(text).toBeInTheDocument();

        const subText = screen.getByText(/by blazejzj/);
        expect(subText).toBeInTheDocument();
    });

    it("should take you to homepage when pressed", async () => {
        const user = userEvent.setup();
        const homeLink = screen.getByRole("link");

        // confirm we're on ErrorPage
        const errorHeading = screen.getByText(
            /Page you are looking for doesn't exist!/
        );
        expect(errorHeading).toBeInTheDocument();

        // press link
        await user.click(homeLink);

        // confirm we are on HomePage
        const homePageHeader = screen.getByText(/Hey! I am/);
        expect(homePageHeader).toBeInTheDocument();
    });
});
