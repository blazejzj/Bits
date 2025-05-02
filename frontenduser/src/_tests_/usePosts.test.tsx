import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import usePosts from "../hooks/usePosts";

describe("usePosts hook", () => {
    it("hook fetches the correct API", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [],
        });

        const addNewError = vi.fn();
        const searchParams = new URLSearchParams({ category: "programming" });

        const { result } = renderHook(() =>
            usePosts({ addNewError, searchParams })
        );

        await waitFor(() => {
            expect(result.current).toEqual([]);
        });
    });

    it("should return data", async () => {
        const mockedData = [
            {
                id: 123,
                title: "title",
                text: "text",
                published_at: new Date(),
            },
        ];

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockedData,
        });

        const addNewError = vi.fn();
        const searchParams = new URLSearchParams({ category: "programming" });

        const { result } = renderHook(() =>
            usePosts({ addNewError, searchParams })
        );

        await waitFor(() => {
            expect(result.current).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 123,
                        title: "title",
                        text: "text",
                    }),
                ])
            );
        });
    });

    it("should add an error when API fails", async () => {
        global.fetch = vi
            .fn()
            .mockRejectedValue(
                new Error("Internal server issues. Something went wrong.")
            );

        const addNewError = vi.fn();
        const searchParams = new URLSearchParams({ category: "programming" });

        const { result } = renderHook(() =>
            usePosts({ addNewError, searchParams })
        );

        await waitFor(() => {
            expect(result.current).toEqual([]);
            expect(addNewError).toHaveBeenCalledWith(
                "Internal server issues. Something went wrong."
            );
        });
    });

    it("should add an error when API results to okay, but response is not okay", async () => {
        const mockedData = { message: "Something went wrong." };
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => mockedData,
        });

        const addNewError = vi.fn();
        const searchParams = new URLSearchParams({ category: "programming" });

        const { result } = renderHook(() =>
            usePosts({ addNewError, searchParams })
        );

        await waitFor(() => {
            expect(result.current).toEqual([]);
            expect(addNewError).toHaveBeenCalledWith("Something went wrong.");
        });
    });
});
