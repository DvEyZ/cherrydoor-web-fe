import { DataSchema, DataType, InputType } from "../Data/schema"
import { PermissionBriefModel } from "../Permissions/models"

export interface AccessProfileBriefModel {
    id :number,
    name :string,
    description :string
}

export const AccessProfileBriefSchema :DataSchema = {
    name: 'access-profile',
    displayName: 'Profil dostępu',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa',
            type: DataType.String,
            inputType: InputType.Text,
            const: true
        },
        description: {
            name: 'description',
            displayName: 'Opis',
            type: DataType.String,
            inputType: InputType.Text
        },
        display_text: {
            name: 'display_text',
            displayName: 'Wyświetlany tekst',
            type: DataType.String,
            inputType: InputType.Text,
            matches: /^[^;]*$/
        },
        color: {
            name: 'color',
            displayName: 'Kolor',
            type: DataType.String,
            inputType: InputType.Color
        },
        access_mode: {
            name: 'access_mode',
            displayName: 'Tryb dostępu',
            type: DataType.Enum,
            inputType: InputType.Enum,
            enumOptions: [
                {
                    display: 'Drzwi fizycznie otwarte',
                    value: 'OpenLock'
                },
                {
                    display: 'Dostęp na dowolną kartę',
                    value: 'AllowAnyone'
                },
                {
                    display: 'Sprawdzanie dostępu',
                    value: 'CheckAccess'
                }
            ],
            defaultValue: 'CheckAccess'
        },
    }
}

export interface AccessProfileFullModel {
    id :number,
    name :string,
    description :string,
    permissions :PermissionBriefModel[]
}

export const AccessProfileFullSchema :DataSchema = {
    name: 'access-profile',
    displayName: 'Profil dostępu',
    data: {
        name: {
            name: 'name',
            displayName: 'Nazwa',
            type: DataType.String,
            inputType: InputType.Text,
            const: true
        },
        description: {
            name: 'description',
            displayName: 'Opis',
            type: DataType.String,
            inputType: InputType.Text
        },
        display_text: {
            name: 'display_text',
            displayName: 'Wyświetlany tekst',
            type: DataType.String,
            inputType: InputType.Text,
            matches: /^[^;]*$/
        },
        color: {
            name: 'color',
            displayName: 'Kolor',
            type: DataType.String,
            inputType: InputType.Color
        },
        access_mode: {
            name: 'access_mode',
            displayName: 'Tryb dostępu',
            type: DataType.Enum,
            inputType: InputType.Enum,
            enumOptions: [
                {
                    display: 'Drzwi fizycznie otwarte',
                    value: 'OpenLock'
                },
                {
                    display: 'Dostęp na dowolną kartę',
                    value: 'AllowAnyone'
                },
                {
                    display: 'Sprawdzanie dostępu',
                    value: 'CheckAccess'
                }
            ],
            defaultValue: 'CheckAccess'
        },
        permissions: {
            name: 'permissions',
            displayName: 'Uprawnienia',
            type: DataType.Array
        }
    }
}