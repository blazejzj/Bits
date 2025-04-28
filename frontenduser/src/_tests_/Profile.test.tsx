import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import Profile from "../components/Profile/Profile";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import userEvent from "@testing-library/user-event";

describe("Profile component", () => {
    it("should render unauthorized message when user not logged in", () => {
        // Arrange
        const mockUser = {
            user: null,
            loading: false,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Profile />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const unauthorizedText = screen.getByText(
            "No user logged in. Unauthorized."
        );

        // Assert
        expect(unauthorizedText).toBeInTheDocument();
    });

    it("should render welcome message when user is logged in", () => {
        // Arrange
        const mockUser = {
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

        render(
            <MemoryRouter>
                <AuthContext value={mockUser}>
                    <Profile />
                </AuthContext>
            </MemoryRouter>
        );

        // Act
        const welcomeMsg = screen.getByText(/Welcome/i);

        // Assert
        expect(welcomeMsg).toBeInTheDocument();
    });

    it("should render user credentials when logged in", () => {
        // Arrange
        const mockUser = {
            user: {
                id: "123321",
                name: "testname",
                username: "testusername",
                email: "email@test.no",
            },
            loading: false,
            setUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext value={mockUser}>
                    <Profile />
                </AuthContext>
            </MemoryRouter>
        );

        // Act
        const emailField = screen.getByTestId("profile-emailfield");
        const nameField = screen.getByTestId("profile-namefield");
        const usernameField = screen.getByTestId("profile-usernamefield");

        // Assert
        expect(emailField).toBeInTheDocument();
        expect(nameField).toBeInTheDocument();
        expect(usernameField).toBeInTheDocument();
    });

    it("should render name change form when wanting to update name", async () => {
        // Arrange
        const user = userEvent.setup();

        const mockUser = {
            user: {
                id: "123321",
                name: "testname",
                username: "testusername",
                email: "email@test.no",
            },
            loading: false,
            setUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext value={mockUser}>
                    <Profile />
                </AuthContext>
            </MemoryRouter>
        );

        // Act
        const updateUserBtnBefore = screen.getByTestId("profile-editnamebtn");
        expect(updateUserBtnBefore).toBeInTheDocument();

        const newNameLabelBefore = screen.queryByLabelText("New name:");
        expect(newNameLabelBefore).not.toBeInTheDocument();

        await user.click(updateUserBtnBefore);

        const updateUserBtnAfter = screen.queryByTestId("profile-editnamebtn");
        expect(updateUserBtnAfter).not.toBeInTheDocument();

        const newNameLabelAfter = screen.queryByLabelText("New name:");
        expect(newNameLabelAfter).toBeInTheDocument();

        // Assert
        await waitFor(() => {
            expect(updateUserBtnAfter).not.toBeInTheDocument();
            expect(newNameLabelAfter).toBeInTheDocument();
        });
    });
});
