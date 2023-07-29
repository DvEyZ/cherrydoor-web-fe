export enum DataType {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Array = 'array',
    Object = 'object',
};

export enum InputType {
    Text = 'text',
    Number = 'number',
    Checkbox = 'checkbox',
    Password = 'password',
    Color = 'color'
};

export interface DataField {
    name :string,
    displayName :string,
    type :DataType,
    inputType? :InputType,
    hidden? :boolean,
    const? :boolean,
    required? :boolean
}

export interface DataSchema {
    name :string,
    displayName :string,
    data :{
        [key :string] :DataField
    }
}