import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useCategories from "../hooks/useCategories";

describe("useCategories hook", () => {
    it("should render empty on initial fetch", () => {
        global.fetch = vi
            .fn()
            .mockResolvedValue({ ok: true, json: async () => [] });
        const addNewError = vi.fn();

        const { result } = renderHook(() => useCategories({ addNewError }));

        expect(result.current).toEqual([]);
    });

    it("should return data", async () => {
        const mockedData = [{ id: 1, name: "programming" }];
        global.fetch = vi
            .fn()
            .mockResolvedValue({ ok: true, json: async () => mockedData });

        const addNewError = vi.fn();
        const { result } = renderHook(() => useCategories({ addNewError }));

        await waitFor(() => {
            expect(result.current).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 1,
                        name: "programming",
                    }),
                ])
            );
        });
    });

    it("should add a new error upon api server error", async () => {
        global.fetch = vi
            .fn()
            .mockRejectedValue(
                new Error("Internal server issues. Something went wrong.")
            );

        const addNewError = vi.fn();
        const { result } = renderHook(() => useCategories({ addNewError }));

        await waitFor(() => {
            expect(addNewError).toHaveBeenCalledWith(
                "Internal server issues. Something went wrong."
            );
            expect(result.current).toEqual([]);
        });
    });

    it("should add a new error upon API call okay, but response false", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => [],
        });

        const addNewError = vi.fn();
        const { result } = renderHook(() => useCategories({ addNewError }));

        await waitFor(() => {
            expect(result.current).toEqual([]);
            expect(addNewError).toHaveBeenCalledWith(
                "Internal server issues. Something went wrong."
            );
        });
    });
});
