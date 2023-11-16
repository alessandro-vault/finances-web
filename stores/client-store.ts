import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface Client {
    clientId: number;
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    memberSince: string;
}

interface ClientState {
    client: Client,
    updateClient: (client: Client) => void
}

const useClientStore = create<ClientState>()(
    persist(
        (set) => ({
            client: {
                clientId: 0,
                userId: '' ,
                firstName: '',
                lastName: '',
                username: '',
                memberSince: ''
            },
            updateClient: (client) => set(() => ({ client }))
        }),
        {
            name: 'client-storage',
        }
    )
)

export { useClientStore }