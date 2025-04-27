import { describe, it, expect, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import RegisterUser from "../components/RegisterUser";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LogIn from "../components/LogIn";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("RegisterUser component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render all form fields and button", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        const nameField = screen.getByLabelText("Name:");
        expect(nameField).toBeInTheDocument();

        const emailField = screen.getByLabelText("Email:");
        expect(emailField).toBeInTheDocument();

        const usernameField = screen.getByLabelText("Username:");
        expect(usernameField).toBeInTheDocument();

        const passwordField = screen.getByLabelText("Password:");
        expect(passwordField).toBeInTheDocument();

        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        expect(confirmPasswordField).toBeInTheDocument();

        const submitBtn = screen.getByRole("button");
        expect(submitBtn).toBeInTheDocument();
    });

    it("should be able to edit form fields", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        const nameField = screen.getByLabelText("Name:");
        fireEvent.change(nameField, {
            target: { value: "TestName" },
        });
        expect(nameField).toHaveValue("TestName");

        const emailField = screen.getByLabelText("Email:");
        fireEvent.change(emailField, {
            target: {
                value: "TestEmail",
            },
        });
        expect(emailField).toHaveValue("TestEmail");

        const usernameField = screen.getByLabelText("Username:");
        fireEvent.change(usernameField, { target: { value: "TestUsername" } });
        expect(usernameField).toHaveValue("TestUsername");

        const passwordField = screen.getByLabelText("Password:");
        fireEvent.change(passwordField, {
            target: { value: "TestPassword123" },
        });
        expect(passwordField).toHaveValue("TestPassword123");

        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        fireEvent.change(confirmPasswordField, {
            target: { value: "TestPassword123" },
        });
    });

    it("name requirement should render red when name input length is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const nameField = screen.getByLabelText("Name:");
        const nameReqLength = screen.getByText("Name length: 2-100 chars");

        // Act
        fireEvent.change(nameField, { target: { value: "a" } });

        // Assert
        expect(nameReqLength).toHaveClass("text-red-600");
    });

    it("name requirement shuold render green when name input length is correct", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );
        // Arrange
        const nameField = screen.getByLabelText("Name:");
        const nameReqLength = screen.getByText("Name length: 2-100 chars");

        // Act
        fireEvent.change(nameField, { target: { value: "ab" } });

        // Assert
        expect(nameReqLength).toHaveClass("text-green-600");
    });

    it("name requirement should render red when name alpha input is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const nameField = screen.getByLabelText("Name:");
        const nameReqAlpha = screen.getByText(
            "Name: only letters, spaces or -"
        );

        // Act
        fireEvent.change(nameField, { target: { value: "Testing Name@$£" } });

        // Assert
        expect(nameReqAlpha).toHaveClass("text-red-600");
    });

    it("name requirement should render green when name alpha input is correct", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const nameField = screen.getByLabelText("Name:");
        const nameReqAlpha = screen.getByText(
            "Name: only letters, spaces or -"
        );

        // Act
        fireEvent.change(nameField, { target: { value: "Testing Name" } });

        // Assert
        expect(nameReqAlpha).toHaveClass("text-green-600");
    });

    it("email requirement should render red when email pattern is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const emailField = screen.getByLabelText("Email:");
        const emailReq = screen.getByText("Email format is valid");

        // Act
        fireEvent.change(emailField, { target: { value: "testemail.no" } });

        // Assert
        expect(emailReq).toHaveClass("text-red-600");
    });

    it("email requirement should render red when email pattern is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const emailField = screen.getByLabelText("Email:");
        const emailReq = screen.getByText("Email format is valid");

        // Act
        fireEvent.change(emailField, { target: { value: "test@email.no" } });

        // Assert
        expect(emailReq).toHaveClass("text-green-600");
    });

    it("username length requirement should render red when length is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const usernameField = screen.getByLabelText("Username:");
        const usernameReqLength = screen.getByText("Username: 2-100 chars");

        // Act
        fireEvent.change(usernameField, { target: { value: "a" } });

        // Assert
        expect(usernameReqLength).toHaveClass("text-red-600");
    });

    it("username length requirement should render green when length is allowed", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const usernameField = screen.getByLabelText("Username:");
        const usernameReqLength = screen.getByText("Username: 2-100 chars");

        // Act
        fireEvent.change(usernameField, { target: { value: "testUsername" } });

        // Assert
        expect(usernameReqLength).toHaveClass("text-green-600");
    });

    it("username alpha requirement should render red when alpha is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const usernameField = screen.getByLabelText("Username:");
        const usernameReqAlpha = screen.getByText(
            "Username: letters, digits, - or _ only"
        );

        // Act
        fireEvent.change(usernameField, {
            target: { value: "te54stUsername!£@$" },
        });

        // Assert
        expect(usernameReqAlpha).toHaveClass("text-red-600");
    });

    it("username alpha requirement should render green when alpha is correct", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const usernameField = screen.getByLabelText("Username:");
        const usernameReqAlpha = screen.getByText(
            "Username: letters, digits, - or _ only"
        );

        // Act
        fireEvent.change(usernameField, {
            target: { value: "test_username" },
        });

        // Assert
        expect(usernameReqAlpha).toHaveClass("text-green-600");
    });

    it("password length requirement should render red when length is wrong", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const passwordField = screen.getByLabelText("Password:");
        const passwordReqLength = screen.getByText(
            "Password length: 8-100 chars"
        );

        // Act
        fireEvent.change(passwordField, { target: { value: "1234567" } });

        // Assert
        expect(passwordReqLength).toHaveClass("text-red-600");
    });

    it("password length requirement should render green when length is allowed", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const passwordField = screen.getByLabelText("Password:");
        const passwordReqLength = screen.getByText(
            "Password length: 8-100 chars"
        );

        // Act
        fireEvent.change(passwordField, { target: { value: "12345678" } });

        // Assert
        expect(passwordReqLength).toHaveClass("text-green-600");
    });

    it("password match should render red when password do not match", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const passwordField = screen.getByLabelText("Password:");
        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        const passwordMatchReq = screen.getByText("Passwords must match");

        // Act
        fireEvent.change(passwordField, { target: { value: "12345678" } });
        fireEvent.change(confirmPasswordField, {
            target: { value: "123456789" },
        });

        // Assert
        expect(passwordMatchReq).toHaveClass("text-red-600");
    });

    it("password match should render green when password do match", () => {
        render(
            <MemoryRouter>
                <RegisterUser />
            </MemoryRouter>
        );

        // Arrange
        const passwordField = screen.getByLabelText("Password:");
        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        const passwordMatchReq = screen.getByText("Passwords must match");

        // Act
        fireEvent.change(passwordField, { target: { value: "12345678" } });
        fireEvent.change(confirmPasswordField, {
            target: { value: "12345678" },
        });

        // Assert
        expect(passwordMatchReq).toHaveClass("text-green-600");
    });

    it("should fetch to correct api and navigate user to login page servers responds ok", async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: true });
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </MemoryRouter>
        );
        // Arrange

        const user = userEvent.setup();

        const nameField = screen.getByLabelText("Name:");
        fireEvent.change(nameField, {
            target: { value: "TestName" },
        });

        const emailField = screen.getByLabelText("Email:");
        fireEvent.change(emailField, {
            target: {
                value: "Test@Email.no",
            },
        });

        const usernameField = screen.getByLabelText("Username:");
        fireEvent.change(usernameField, { target: { value: "TestUsername" } });

        const passwordField = screen.getByLabelText("Password:");
        fireEvent.change(passwordField, {
            target: { value: "TestPassword123" },
        });

        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        fireEvent.change(confirmPasswordField, {
            target: { value: "TestPassword123" },
        });

        const submitBtn = screen.getByRole("button");

        // Act
        user.click(submitBtn);

        // Assert
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                expect.objectContaining({
                    method: "POST",
                    headers: expect.objectContaining({
                        "Content-type": "application/json",
                    }),
                    body: expect.any(String),
                })
            );
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("should fetch to correct api and navigate user to login page server responds not okay", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ errors: [{ msg: "Username already taken" }] }),
        });

        render(
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </MemoryRouter>
        );

        // Arrange
        const user = userEvent.setup();

        const nameField = screen.getByLabelText("Name:");
        fireEvent.change(nameField, {
            target: { value: "TestName" },
        });

        const emailField = screen.getByLabelText("Email:");
        fireEvent.change(emailField, {
            target: {
                value: "Test@Email.no",
            },
        });

        const usernameField = screen.getByLabelText("Username:");
        fireEvent.change(usernameField, { target: { value: "TestUsername" } });

        const passwordField = screen.getByLabelText("Password:");
        fireEvent.change(passwordField, {
            target: { value: "TestPassword123" },
        });

        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        fireEvent.change(confirmPasswordField, {
            target: { value: "TestPassword123" },
        });

        const submitBtn = screen.getByRole("button");

        // Act
        user.click(submitBtn);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByTestId("register-error-div")
            ).toBeInTheDocument();
            expect(mockNavigate).not.toHaveBeenCalledWith("/login");
        });
    });

    it("should fetch to correct api and navigate user to login page, server crashed", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Server down!"));

        render(
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </MemoryRouter>
        );

        // Arrange
        const user = userEvent.setup();

        const nameField = screen.getByLabelText("Name:");
        fireEvent.change(nameField, {
            target: { value: "TestName" },
        });

        const emailField = screen.getByLabelText("Email:");
        fireEvent.change(emailField, {
            target: {
                value: "Test@Email.no",
            },
        });

        const usernameField = screen.getByLabelText("Username:");
        fireEvent.change(usernameField, { target: { value: "TestUsername" } });

        const passwordField = screen.getByLabelText("Password:");
        fireEvent.change(passwordField, {
            target: { value: "TestPassword123" },
        });

        const confirmPasswordField = screen.getByLabelText("Confirm Password:");
        fireEvent.change(confirmPasswordField, {
            target: { value: "TestPassword123" },
        });

        const submitBtn = screen.getByRole("button");

        // Act
        user.click(submitBtn);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByTestId("register-error-div")
            ).toBeInTheDocument();
            expect(mockNavigate).not.toHaveBeenCalledWith("/login");

            const err = screen.queryByText(
                "Internal server issues. Couldn't register"
            );
            expect(err).toBeInTheDocument();
        });
    });
});
