import {mockConnections} from "../../public/mocks/connections.mock";
import type {ConnectionsResponse} from "../types/connections";

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export async function fetchConnections(): Promise<ConnectionsResponse> {
    await delay(900)

    return {
        items: mockConnections,
    }
}