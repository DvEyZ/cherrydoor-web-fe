import { DataSchema, DataType, InputType } from "../Data/schema"

export interface WebUIUserFullModel {
    id :number,
    name :string,
    is_admin :boolean
}

export interface WebUIUserCreateModel {
    name :string,
    password :string,
    is_admin :boolean
}

export const WebUIUserFullSchema :DataSchema = {
    name: 'web-ui-user',
    displayName: 'Użytkownik panelu',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa użytkownika',
            type: DataType.String,
            const: true
        },
        is_admin: {
            name: 'is_admin',
            displayName: 'Uprawnienia administracyjne',
            type: DataType.Boolean
        },
        ac_does_not_expire: {
            name: 'ac_does_not_expire',
            displayName: 'Token nie wygasa',
            type: DataType.Boolean
        }
    }
}

export const WebUIUserCreateSchema :DataSchema = {
    name: 'web-ui-user',
    displayName: 'Użytkownik panelu',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa użytkownika',
            type: DataType.String,
            inputType: InputType.Text,
            const: true
        },
        password: {
            name: 'password',
            displayName: 'Hasło',
            type: DataType.String,
            inputType: InputType.Password,
            required: false
        },
        is_admin: {
            name: 'is_admin',
            displayName: 'Uprawnienia administracyjne',
            type: DataType.Boolean,
            inputType: InputType.Checkbox
        },
        ac_does_not_expire: {
            name: 'ac_does_not_expire',
            displayName: 'Token nie wygasa',
            type: DataType.Boolean,
            inputType: InputType.Checkbox
        }
    }
}