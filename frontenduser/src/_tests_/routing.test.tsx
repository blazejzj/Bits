import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import routes from "../components/routes";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

describe("Routes component", () => {
    it("should render HomePage component at root path", () => {
        // Arrange
        const router = createMemoryRouter(routes, { initialEntries: ["/"] });

        render(<RouterProvider router={router} />);

        // Act & Assert
        expect(screen.getByText(/Hey! I am/i)).toBeInTheDocument();
    });

    it("should not allow user to enter /profile when not authenticated", () => {
        // Arrange
        const userMock = {
            user: null,
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/profile"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
        // expect user to be on login page
        expect(
            screen.getByRole("heading", { name: /Log in/i })
        ).toBeInTheDocument();
    });

    it("should allow user to enter /profile when authenticated", () => {
        // Arrange
        const userMock = {
            user: {
                id: "123",
                name: "name",
                email: "email",
                username: "username",
            },
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/profile"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        // expect user to be on profle page
        expect(screen.queryByText(/Welcome/i)).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: /Log in/i })
        ).not.toBeInTheDocument();
    });

    it("should not allow user to enter /login when authenticated", () => {
        // Arrange
        const userMock = {
            user: {
                id: "123",
                name: "name",
                email: "email",
                username: "username",
            },
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        // expect user to be on home page page
        expect(screen.queryByText(/Hey! I am/i)).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: /Log in/i })
        ).not.toBeInTheDocument();
    });

    it("should allow user to enter /login when not authenticated", () => {
        // Arrange
        const userMock = {
            user: null,
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        // expect user to be on home page page
        expect(screen.queryByText(/Hey! I am/i)).not.toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: /Log in/i })
        ).toBeInTheDocument();
    });

    it("should not allow user to enter /register when authenticated", () => {
        // Arrange
        const userMock = {
            user: {
                id: "123",
                name: "name",
                email: "email",
                username: "username",
            },
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/register"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        // expect user to be on home page page
        expect(screen.queryByText(/Hey! I am/i)).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: /Register new user/i })
        ).not.toBeInTheDocument();
    });

    it("should allow user to enter /register when not authenticated", () => {
        // Arrange
        const userMock = {
            user: null,
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        const router = createMemoryRouter(routes, {
            initialEntries: ["/register"],
        });

        render(
            <AuthContext value={userMock}>
                <RouterProvider router={router} />
            </AuthContext>
        );

        screen.debug();
        // Act & Arrange
        // expect user to be on home page page
        expect(screen.queryByText(/Hey! I am/i)).not.toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: /Register new user/i })
        ).toBeInTheDocument();
    });

    it("should render error page when on an unknown route", () => {
        // Arrange

        const router = createMemoryRouter(routes, {
            initialEntries: ["/typescriptisawesome"],
        });

        render(<RouterProvider router={router} />);

        // Act & Assert

        expect(
            screen.getByText(/Oops! Looks like you're lost!/)
        ).toBeInTheDocument();
    });
});
