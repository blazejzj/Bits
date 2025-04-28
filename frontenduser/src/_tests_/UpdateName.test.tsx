import { describe, expect, it, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import UpdateName from "../components/Profile/UpdateName";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("UpdateName component", () => {
    it("should render all fields when displayed", () => {
        // Arrange
        const mockSetUpdateName = vi.fn();
        render(
            <MemoryRouter>
                <UpdateName setUpdateName={mockSetUpdateName} />
            </MemoryRouter>
        );

        // Act & Assert
        const updateLabel = screen.getByLabelText(/New Name:/i);
        expect(updateLabel).toBeInTheDocument();

        const authPasswordLabel = screen.getByLabelText(
            /Password to confirm change/i
        );
        expect(authPasswordLabel).toBeInTheDocument();

        const updateBtn = screen.getByText("Update");
        expect(updateBtn).toBeInTheDocument();

        const cancelBtn = screen.getByText("Cancel");
        expect(cancelBtn).toBeInTheDocument();
    });

    it("should not call api when fields empty", async () => {
        const mockSetUpdateName = vi.fn();
        const user = userEvent.setup();
        const mockFetch = vi.fn();
        global.fetch = mockFetch;

        render(
            <MemoryRouter>
                <UpdateName setUpdateName={mockSetUpdateName} />
            </MemoryRouter>
        );

        const updateBtn = screen.getByText("Update");

        // Act
        await user.click(updateBtn);

        // Assert
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it("should fetch correct api when all fields are alright, should give success message", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                msg: "Successfully updated!",
            }),
        });

        // Arrange
        const user = userEvent.setup();
        const mockSetUpdateName = vi.fn();
        render(
            <MemoryRouter>
                <UpdateName setUpdateName={mockSetUpdateName} />
            </MemoryRouter>
        );
        const updateLabel = screen.getByLabelText(/New Name:/i);
        const authPasswordLabel = screen.getByLabelText(
            /Password to confirm change/i
        );
        const updateBtn = screen.getByText("Update");

        // Act

        fireEvent.change(updateLabel, {
            target: {
                value: "NewName",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "correctPassword",
            },
        });

        await user.click(updateBtn);

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
            expect(
                screen.getByText("Successfully updated!")
            ).toBeInTheDocument();
        });
    });

    it("should render error message when wrong password", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                msg: [{ msg: "Wrong password!" }],
            }),
        });

        // Arrange
        const user = userEvent.setup();
        const mockSetUpdateName = vi.fn();

        render(
            <MemoryRouter>
                <UpdateName setUpdateName={mockSetUpdateName} />
            </MemoryRouter>
        );

        const updateLabel = screen.getByLabelText(/New Name:/i);
        const authPasswordLabel = screen.getByLabelText(
            /Password to confirm change/
        );

        fireEvent.change(updateLabel, {
            target: {
                value: "NewName",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "invalidPassword",
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

    it("should display server internal issues when api is down", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Oops down!"));

        // Arrange
        const user = userEvent.setup();
        const mockSetUpdateName = vi.fn();

        render(
            <MemoryRouter>
                <UpdateName setUpdateName={mockSetUpdateName} />
            </MemoryRouter>
        );

        const updateLabel = screen.getByLabelText(/New Name:/i);
        const authPasswordLabel = screen.getByLabelText(
            /Password to confirm change/
        );

        fireEvent.change(updateLabel, {
            target: {
                value: "NewName",
            },
        });

        fireEvent.change(authPasswordLabel, {
            target: {
                value: "invalidPassword",
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
            expect(
                screen.getByText(
                    "Internal server issues. Couldn't update value."
                )
            ).not.toHaveClass("bg-green-100");
        });
    });
});
