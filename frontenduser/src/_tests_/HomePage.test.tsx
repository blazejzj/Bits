import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../components/HomePage";
import { MemoryRouter } from "react-router-dom";

describe("HomePage component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    it("should render header with correct text", () => {
        const header = screen.getByTestId("homepage-header");
        expect(header).toBeInTheDocument();
    });

    it("should be 4 under headers for cards", () => {
        const underHeaders = screen.getAllByTestId("homepage-card-header");
        expect(underHeaders.length).toBe(4);
    });
});
