import { describe, it, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Posts from "../components/Posts";

let mockPosts: Array<{
    id: string;
    title: string;
    text: string;
    categoryId: number;
    published_at: Date;
}>;

let mockCategories: Array<{
    id: number;
    name: string;
}>;

vi.mock("../hooks/usePosts", () => ({ default: () => mockPosts }));
vi.mock("../hooks/useCategories", () => ({ default: () => mockCategories }));

describe("Posts component", () => {
    beforeEach(() => {
        // reset both mocks to default non‐empty state
        mockCategories = [
            { id: 1, name: "Programming" },
            { id: 2, name: "Gym & Fitness" },
        ];
        mockPosts = [
            {
                id: "1",
                title: "Title1",
                text: "Text",
                categoryId: 1,
                published_at: new Date(),
            },
            {
                id: "2",
                title: "Title2",
                text: "Text",
                categoryId: 1,
                published_at: new Date(),
            },
            {
                id: "3",
                title: "Title3",
                text: "Text",
                categoryId: 2,
                published_at: new Date(),
            },
            {
                id: "4",
                title: "Title4",
                text: "Text",
                categoryId: 2,
                published_at: new Date(),
            },
            {
                id: "5",
                title: "Title5",
                text: "Text",
                categoryId: 2,
                published_at: new Date(),
            },
        ];
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render correct header with category name", async () => {
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

    it("should render heading correctly despite slugged query", async () => {
        render(
            <MemoryRouter
                initialEntries={["/posts/category/?category=gymandfitness"]}
            >
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: "Gym & Fitness" })
            ).toBeInTheDocument();
        });
    });

    it("should render All Posts if category name doesnt exist", async () => {
        render(
            <MemoryRouter
                initialEntries={["/posts/categories/?category=notexistent"]}
            >
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: "All Posts" })
            ).toBeInTheDocument();
            expect(
                screen.queryByRole("heading", { name: "notexistent" })
            ).not.toBeInTheDocument();
        });
    });

    it("should render All Posts if no query has been provided", async () => {
        render(
            <MemoryRouter initialEntries={["/posts/categories"]}>
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: "All Posts" })
            ).toBeInTheDocument();
        });
    });

    it("should render all posts not based on categories", async () => {
        render(
            <MemoryRouter initialEntries={["/posts/categories"]}>
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getAllByRole("heading", { name: /Title/i })
            ).toHaveLength(5); // 5 posts (these are all in our case)
        });
    });

    it("shoulder render No posts in current category when posts are empty", async () => {
        // override just the posts for this test
        mockPosts = [];

        render(
            <MemoryRouter initialEntries={["/posts/categories"]}>
                <Posts />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.queryAllByRole("heading", { name: /Title/i })
            ).toHaveLength(0);
            expect(
                screen.getByRole("heading", {
                    name: /No posts in current category\./i,
                })
            ).toBeInTheDocument();
        });
    });
});
