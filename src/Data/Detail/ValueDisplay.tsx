import React from "react"
import { DataField, DataType } from "../schema"

export type ValueDisplay = (props :{
    field :string,
    value :any,
    resourceId :string,
    schema :DataField
    refresh :() => any,
    back :() => any,
    onError :(e :Error) => any
}) => JSX.Element

export const StringDisplay :ValueDisplay = (props :{
    field :string,
    value :string
}) => {
    return(
        <div className="value-display string-display">
            <div className="field">{props.field}</div>
            <div className="value">{props.value}</div>
        </div>
    )
}

export const EnumDisplay :ValueDisplay = (props :{
    field :string,
    value :string,
    schema :DataField
}) => {
    return(
        <div className="value-display string-display">
            <div className="field">{props.field}</div>
            <div className="value">{props.schema.enumOptions?.find((v) => v.value === props.value)?.display}</div>
        </div>
    )
} 

export const NumberDisplay :ValueDisplay = (props :{
    field :string,
    value :number
}) => {
    return(
        <div className="value-display number-display">
            <div className="field">{props.field}</div>
            <div className="value">{props.value}</div>
        </div>
    )
}

export const BooleanDisplay :ValueDisplay = (props : {
    field :string,
    value :boolean
}) => {
    return(
        <div className={`value-display boolean-display ${props.value ? 'true' : 'false'}`}>
            <div className="field">{props.field}</div>
            <div className={`value boolean-${props.value ? 'true' : 'false'}`}>{props.value ? 'TAK' : 'NIE'}</div>
        </div>
    )
}

export const DEFAULT_DISPLAYS :{
    [key in DataType]? :ValueDisplay
} = {
    string: StringDisplay,
    number: NumberDisplay,
    boolean: BooleanDisplay,
    enum :EnumDisplay
}
