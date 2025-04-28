import { describe, it, expect, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import UpdateEmail from "../components/Profile/UpdateEmail";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("UpdateEmail component", () => {
    it("should render all fields when displayed", () => {
        // Arrange
        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        // Act & Assert
        const updateLabel = screen.getByLabelText("New email adress:");
        expect(updateLabel).toBeInTheDocument();

        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );
        expect(authPasswordLabel).toBeInTheDocument();

        const submitBtn = screen.getByText("Update");
        expect(submitBtn).toBeInTheDocument();

        const cancelBtn = screen.getByText("Cancel");
        expect(cancelBtn).toBeInTheDocument();
    });

    it("fields should be editable", () => {
        // Arrange
        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        const emailLabel = screen.getByLabelText("New email adress:");
        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );

        // Assert

        expect(emailLabel).toHaveValue("");
        expect(authPasswordLabel).toHaveValue("");

        // Act
        fireEvent.change(emailLabel, {
            target: {
                value: "test@email.no",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "testpassword123",
            },
        });

        // Assert
        expect(emailLabel).toHaveValue("test@email.no");
        expect(authPasswordLabel).toHaveValue("testpassword123");
    });

    it("should fetch correct api, successfull api call", async () => {
        // Arrange
        global.fetch = vi.fn().mockResolvedValue({ ok: true });
        const user = userEvent.setup();

        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        const emailLabel = screen.getByLabelText("New email adress:");
        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );

        fireEvent.change(emailLabel, {
            target: {
                value: "test@email.no",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "testpassword123",
            },
        });

        const submitBtn = screen.getByText("Update");

        // Act
        await user.click(submitBtn);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `${import.meta.env.VITE_API_URL}/profile`,
                expect.objectContaining({
                    method: "PATCH",
                    headers: expect.objectContaining({
                        "Content-type": "application/json",
                    }),
                    body: expect.any(String),
                })
            );
        });
    });

    it("should display success message after successfull api call", async () => {
        // Arrange
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                msg: "Successfull update!",
            }),
        });

        const user = userEvent.setup();

        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        const emailLabel = screen.getByLabelText("New email adress:");
        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );

        fireEvent.change(emailLabel, {
            target: {
                value: "test@email.no",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "testpassword123",
            },
        });

        const submitBtn = screen.getByText("Update");

        // Act
        await user.click(submitBtn);

        // Assert

        await waitFor(() => {
            expect(screen.getByText("Successfull update!")).toBeInTheDocument();
            expect(screen.getByText("Successfull update!")).toHaveClass(
                "bg-green-100"
            );
        });
    });

    it("should display error message after failed api call", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                msg: [{ msg: "Wrong password!" }],
            }),
        });

        const user = userEvent.setup();

        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        const emailLabel = screen.getByLabelText("New email adress:");
        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );

        fireEvent.change(emailLabel, {
            target: {
                value: "test@email.no",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "testpassword123",
            },
        });

        const submitBtn = screen.getByText("Update");

        // Act
        await user.click(submitBtn);

        // Assert
        await waitFor(() => {
            expect(screen.getByText("Wrong password!")).toBeInTheDocument();
            expect(screen.getByText("Wrong password!")).toHaveClass(
                "bg-red-100"
            );
            expect(screen.getByText("Wrong password!")).not.toHaveClass(
                "bg-green-100"
            );
        });
    });

    it("should render server error when api is unavailable", async () => {
        global.fetch = vi
            .fn()
            .mockRejectedValue(new Error("Internal server issue!"));

        const user = userEvent.setup();

        const mocksetUpdateEmail = vi.fn();
        render(
            <MemoryRouter>
                <UpdateEmail setUpdateEmail={mocksetUpdateEmail} />
            </MemoryRouter>
        );

        const emailLabel = screen.getByLabelText("New email adress:");
        const authPasswordLabel = screen.getByLabelText(
            "Password to confirm change"
        );

        fireEvent.change(emailLabel, {
            target: {
                value: "test@email.no",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "testpassword123",
            },
        });

        const submitBtn = screen.getByText("Update");

        // Act
        await user.click(submitBtn);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByText(
                    "Internal server issues. Couldn't update value."
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    "Internal server issues. Couldn't update value."
                )
            ).toHaveClass("bg-red-100");
        });
    });
});
