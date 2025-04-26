import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header/Header";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../context/AuthContext";

describe("Header component", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    const renderWithAuth = (authValue: AuthContextType) => {
        return render(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <Header />
                </AuthContext.Provider>
            </MemoryRouter>
        );
    };

    it("should properly fetch all the categories from db", async () => {
        const categories = [
            { id: 1, name: "Category1" },
            { id: 2, name: "Category2" },
            { id: 3, name: "Category3" },
        ];

        const authMock = {
            user: null,
            loading: false,
            setUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
        };

        vi.mocked(global.fetch).mockResolvedValue({
            ok: true,
            json: async () => categories,
        } as unknown as Response);

        renderWithAuth(authMock);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("/posts/category")
            );
        });
    });

    it("should render log out, profile when logged in", () => {
        const mockUser = {
            id: "123",
            name: "name",
            email: "email@email.no",
            username: "username",
        };

        const authValue = {
            get user() {
                return mockUser;
            },
            loading: false,
            setUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
        };

        renderWithAuth(authValue);

        const logoutBtn = screen.getByTestId("logout-button");
        expect(logoutBtn).toBeInTheDocument();

        const profileBtn = screen.getByTestId("profile-button");
        expect(profileBtn).toBeInTheDocument();
    });

    it("should render log in when not logged in", () => {
        const mockUser = null;

        const authValue = {
            get user() {
                return mockUser;
            },
            loading: false,
            setUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
        };

        renderWithAuth(authValue);

        const logInBtn = screen.getByTestId("login-button");
        expect(logInBtn).toBeInTheDocument();
    });
});
