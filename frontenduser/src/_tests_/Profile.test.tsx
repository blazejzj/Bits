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

    it("should render email change form when wanting to update email", async () => {
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

        const emailEditBtnBefore = screen.getByTestId("profile-editemailbtn");
        expect(emailEditBtnBefore).toBeInTheDocument();

        const emailUpdateLabel = screen.queryByLabelText(/New email adress:/i);
        expect(emailUpdateLabel).not.toBeInTheDocument();

        // Act
        await user.click(emailEditBtnBefore);

        // Assert

        const emailEditBtnAfter = await screen.queryByTestId(
            "profile-editemailbtn"
        );
        expect(emailEditBtnAfter).not.toBeInTheDocument();

        const emailUpdateLabelAfter = await screen.queryByLabelText(
            /New email adress:/i
        );
        expect(emailUpdateLabelAfter).toBeInTheDocument();
    });

    it("should render password change form when wanting to change password", async () => {
        // Arrange
        const user = userEvent.setup();

        const mockUser = {
            user: {
                id: "123",
                name: "name",
                username: "username",
                email: "email@test.no",
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

        const editPasswordBtnBefore = screen.getByTestId(
            "profile-editpasswordbtn"
        );
        expect(editPasswordBtnBefore).toBeInTheDocument();

        const editPasswordFormLabelBefore =
            screen.queryByLabelText(/New password/i);
        expect(editPasswordFormLabelBefore).not.toBeInTheDocument();

        // Act
        await user.click(editPasswordBtnBefore);

        // Assert
        const editPasswordBtnAfter = await screen.queryByTestId(
            "profile-editpasswordbtn"
        );
        expect(editPasswordBtnAfter).not.toBeInTheDocument();

        const editPasswordFormLabelAfter = await screen.queryByLabelText(
            "New password"
        );
        expect(editPasswordFormLabelAfter).toBeInTheDocument();
    });

    it("Should render loading when user is not loaded", () => {
        // Arrange
        const mockUser = {
            user: null,
            loading: true,
            setUser: vi.fn(),
            logout: vi.fn(),
            login: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext value={mockUser}>
                    <Profile />
                </AuthContext>
            </MemoryRouter>
        );

        // Act & Assert
        const loadingText = screen.getByText("loading...");
        expect(loadingText).toBeInTheDocument();
    });
});
