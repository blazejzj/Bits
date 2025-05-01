import { describe, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Posts from "../components/Posts";

describe("Posts component", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should display header with correct category name based on url params", async () => {
        // Arrange
        global.fetch = vi
            .fn()
            .mockImplementationOnce(
                async () =>
                    ({
                        ok: true,
                        json: async () => [
                            { id: 1, name: "Programming" },
                            { id: 2, name: "Gym & Fitness" },
                        ],
                    } as Response)
            )
            .mockImplementationOnce(
                async () =>
                    ({
                        ok: true,
                        json: async () => [
                            {
                                id: 1,
                                title: "Placeholder Post",
                                text: "Sample post text for testing.",
                                published_at: new Date(),
                            },
                        ],
                    } as Response)
            );
        render(
            <MemoryRouter
                initialEntries={["/posts/category/?category=programming"]}
            >
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: "Programming" })
            ).toBeInTheDocument();
        });
    });
});
