import { DataSchema, DataType, InputType } from "../Data/schema"

export interface UserBriefModel {
    id :number,
    name :string,
    full_name :string,
    role :string
}

export const UserBriefSchema :DataSchema = {
    name: 'user',
    displayName: 'Użytkownik',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa użytkownika',
            type: DataType.String,
            inputType: InputType.Text,
            const: true,
        },
        full_name: {
            name: 'full_name',
            displayName: 'Imię i nazwisko',
            type: DataType.String,
            inputType: InputType.Text
        },
        role: {
            name: 'role',
            displayName: 'Rola',
            type: DataType.String,
            inputType: InputType.Text
        }
    }
}

export interface AccessCodeModel {
    id :number,
    code :string,
}

export interface UserFullModel {
    id :number,
    name :string,
    full_name :string,
    role :string,
    access_codes :AccessCodeModel[]
}

export const UserFullSchema :DataSchema = {
    name: 'user',
    displayName: 'Użytkownik',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa użytkownika',
            type: DataType.String,
            inputType: InputType.Text,
            const: true,
        },
        full_name: {
            name: 'full_name',
            displayName: 'Imię i nazwisko',
            type: DataType.String,
            inputType: InputType.Text
        },
        role: {
            name: 'role',
            displayName: 'Rola',
            type: DataType.String,
            inputType: InputType.Text
        },
        access_codes: {
            name: 'access_codes',
            displayName: 'Kody dostępu',
            type: DataType.Array,
        },
        permissions: {
            name: 'permissions',
            displayName: 'Uprawnienia',
            type: DataType.Array,
        }
    }
}