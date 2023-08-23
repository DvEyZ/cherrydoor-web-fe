export enum DataType {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Enum = 'enum',
    Array = 'array',
    Object = 'object',
};

export enum InputType {
    Text = 'text',
    Number = 'number',
    Checkbox = 'checkbox',
    Password = 'password',
    Enum = 'select',
    Color = 'color'
};

export interface DataField {
    name :string,
    displayName :string,
    type :DataType,
    inputType? :InputType,
    hidden? :boolean,
    const? :boolean,
    required? :boolean,
    defaultValue? :any,
    matches? :RegExp,

    enumOptions? :{
        display :string,
        value :string
    }[]
}

export interface DataSchema {
    name :string,
    displayName :string,
    data :{
        [key :string] :DataField
    }
}