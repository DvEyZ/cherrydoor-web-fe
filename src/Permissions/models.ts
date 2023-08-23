import { AccessProfileBriefModel } from "../AccessProfiles/models"
import { DataSchema, DataType, InputType } from "../Data/schema"
import { UserBriefModel } from "../Users/models"

export interface PermissionBriefModel {
    id :number,
    name :string,
    description :string
}

export const PermissionBriefSchema :DataSchema = {
    name: 'permission',
    displayName: 'Uprawnienie',
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
        }
    }
}

export interface PermissionFullModel {
    id :number,
    name :string,
    description :string,
    users :UserBriefModel[],
    access_profiles :AccessProfileBriefModel[]
}

export const PermissionFullSchema :DataSchema = {
    name: 'permission',
    displayName: 'Uprawnienie',
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
        users: {
            name: 'users',
            displayName: 'Użytkownicy',
            type: DataType.Array
        },
        access_profiles: {
            name: 'access_profiles',
            displayName: 'Profile dostępu',
            type: DataType.Array
        }
    }
}