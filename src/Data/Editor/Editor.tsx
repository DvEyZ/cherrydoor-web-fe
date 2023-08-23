import React, { useContext, useEffect, useState } from "react";
import { DataSchema, DataType, InputType } from "../schema";
import { useNavigate, useParams } from "react-router-dom";
import './Editor.css'
import { ApiContext } from "../../App/ApiContext";
import { ErrorReport } from "../../App/Report/ErrorReport";
import { Report } from "../../App/Report/Report";
import { Loading } from "../../App/Loading";
import { LoadingError } from "../../App/LoadingError";

const INTO_JSON :{
    [key in DataType]: (v :FormDataEntryValue | null) => any
} = {
    [DataType.String]: (v) => v?.toString(),
    [DataType.Boolean]: (v) => v ? true : false,
    [DataType.Number]: (v) => v && Number.parseInt(v.toString()),
    [DataType.Enum]: (v) => v?.toString(),
    [DataType.Array]: () => {},
    [DataType.Object]: () => {}
}

const Input = (props :{
    type :InputType,
    name :string,
    id :string,
    value :string | number | boolean | undefined,
    disabled :boolean,
    required :boolean,
    matches? :RegExp
    
    enumOptions? :{
        display :string,
        value :string
    }[]
}) => {
    if(props.type === InputType.Checkbox) {
        return <input type={props.type} name={props.name} id={props.id} 
            defaultChecked={props.value as boolean} disabled={props.disabled} required={props.required}
        />
    } else if (props.type === InputType.Enum) {
        return <select name={props.name} id={props.id} defaultValue={props.value as any} required={props.required}>
            {
                props.enumOptions && props.enumOptions.map((v,i) => 
                    <option key={i} value={v.value}>{v.display}</option>
                )
            }
        </select>
    } else {
        return <input type={props.type} name={props.name} id={props.id} 
            defaultValue={props.value as any} disabled={props.disabled} required={props.required} pattern={props.matches?.toString()}
        />
    }
};

export const Editor = <DataModel extends {
    [key :string] :any
},> (props :{
    name :string,
    url :string,
    schema :DataSchema,
}) => {
    const ctx = useContext(ApiContext);
    const navigate = useNavigate();
    const { resourceId } = useParams();

    const [data, setData] = useState<DataModel>();
    const [loaded, setLoaded] = useState<boolean>();
    const [error, setError] = useState<Error>();
    const [editError, setEditError] = useState<Error>();
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if(!!resourceId) {
            ctx.fetch(`${ctx.url}/${props.url}/${resourceId}`).then((v) => {
                setData(v);
                setLoaded(true);
            }).catch((e) => {
                setError(e);
                console.log(e);
                setLoaded(true)
            });
        } else {
            setLoaded(true);
        }
    }, [ctx, resourceId, props.url])

    const onSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let fdata = new FormData(e.currentTarget);

        let body = Object.fromEntries(
            Object.values(props.schema.data).filter((v) => v.inputType && (!data || !v.const)).map<[string, any]>((v) => 
                [v.name, (INTO_JSON[v.type](fdata.get(v.name)))]
            ).filter((v) => !data || ((v[1] !== "") && (v[1] !== data[v[0]])))
        );
        
        console.log(body);

        if(Object.keys(body).length === 0) {
            setEditError(new Error('Nie wprowadzono żadnych zmian.'));
            return;
        }

        ctx.fetch(
            `${ctx.url}/${props.url}${ data ? `/${resourceId}` : '' } `, 
            data ? 'PATCH' : 'POST',
            JSON.stringify(body)
        ).then(() => {
            setEditError(undefined);
            setMessage('Zapisano.');
        }).catch((e) => {
            setEditError(e);
        });
    };

    if(!loaded) return <Loading/>

    if(error) return <LoadingError error={error}/>

    if(loaded && !error)
    return(
        <div className={`editor editor-${props.name}`}>
            {
                editError &&
                <ErrorReport error={editError} onClose={() => {setEditError(undefined)}}/>
            }
            {
                message &&
                <Report content={message} onClose={() => {setMessage(undefined)}}/>

            }
            <div className="data-header">
                <h1>
                    {
                    !resourceId ?
                        `${props.schema.displayName} - tworzenie`
                    : `${resourceId} - edycja`
                    }
                </h1>
                <button className="nav-back" onClick={() => {navigate(-1)}}>Powrót</button>
            </div>
            <div className="editor-body form-container">
                <form onSubmit={(e) => {onSubmit(e)}} className="form editor-form">
                    {
                        Object.values(props.schema.data).filter((v) => v.inputType).map((v,i) => {
                            
                            return v.inputType && (
                                <React.Fragment key={i}>
                                    <div>
                                        <label htmlFor={`editor-field-${v.name}`}>{v.displayName}</label>
                                    </div>
                                    <div>
                                        <Input type={v.inputType} name={v.name} id={`editor-field-${v.name}`}
                                        value={data ? data[v.name] : v.defaultValue} disabled={!!data && !!v.const}
                                        required={!!v.required} enumOptions={v.enumOptions} matches={v.matches}/>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                    <div/>
                    <input type="submit" value={data ? 'Zapisz' : 'Utwórz'}/>
                </form>
            </div>
        </div>
    )
}