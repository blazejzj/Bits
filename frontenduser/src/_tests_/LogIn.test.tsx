import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LogIn from "../components/LogIn";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../components/HomePage";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

describe("LogIn component", () => {
    it("should render all labels and inputs (username, password)", () => {
        render(
            <MemoryRouter>
                <LogIn />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText("Username");
        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveAttribute("type", "text");

        const passwordInput = screen.getByLabelText("Password");
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("should render an error when error list is not empty", async () => {
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
            login: vi
                .fn()
                .mockRejectedValueOnce(new Error("Invalid credentials!")),
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <LogIn />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // check if no errors before
        const errorDiv = screen.queryByTestId("login-error-div");
        expect(errorDiv).not.toBeInTheDocument();

        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const submitBtn = screen.getByRole("button");

        fireEvent.change(usernameInput, { target: { value: "wrongusername" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByTestId("login-error-div")).toBeInTheDocument();
            expect(
                screen.getByText("Invalid credentials!")
            ).toBeInTheDocument();
        });
    });

    it("should not call login when fields are empty", async () => {
        const loginMock = vi.fn();

        const authValue = {
            get user() {
                return null;
            },
            loading: false,
            setUser: vi.fn(),
            login: loginMock,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <LogIn />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const submitBtn = screen.getByRole("button");
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(loginMock).not.toHaveBeenCalled();
        });
    });

    it("should navigate to '/' when successfull login", async () => {
        // Arrange
        const loginMock = vi.fn().mockResolvedValue(Promise.resolve());

        const authValue = {
            get user() {
                return null;
            },
            loading: false,
            setUser: vi.fn(),
            login: loginMock,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={authValue}>
                    <Routes>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const submitBtn = screen.getByRole("button");

        // Act
        fireEvent.change(usernameInput, {
            target: { value: "correctusername" },
        });
        fireEvent.change(passwordInput, { target: { value: "Password123" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalled();
            expect(navigateMock).toHaveBeenCalledWith("/");
        });
    });
});
