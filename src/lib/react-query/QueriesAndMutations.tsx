import { useMutation } from "@tanstack/react-query"
import { INewUser } from "../../types"
import { createUserAccount, signInAccount } from "../api/api"

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => signInAccount(user)
    })
}

