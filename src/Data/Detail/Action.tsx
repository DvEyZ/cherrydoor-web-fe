import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ApiContext } from "../../App/ApiContext"
import { Portal } from "react-portal"

interface ConfirmDefinition {
    title :string,
    displayText :string,
    onConfirm :() => any,
    onDeny :() => any
}

const Confirm = (props :{
    def :ConfirmDefinition
}) => {
    return(
        <div className="op-container">
            <div className="over-popup">
                <h2>{props.def.title}</h2>
                <div>{props.def.displayText}</div>
                <div className="op-button-container">
                    <button className="grad-button" onClick={() => { props.def.onDeny() }}>
                        Anuluj
                    </button>
                    <button className="grad-button" onClick={() => { props.def.onConfirm() }}>
                        Potwierdź
                    </button>
                </div>
            </div>
        </div>
    )
}

export type Action = <DataModel extends {
    id :number
},>(props :{
    url :string,
    resourceId :string
    data :DataModel,
    onComplete :() => any,
    onError :(error :Error) => any
}) => JSX.Element

const EditAction :Action = <DataModel,>(props :{
    url :string,
    resourceId :string,
    data :DataModel,
}) => {
    return(
        <Link className="action-button box list-box" to='edit'>
            <img src='/icons/edit.png' alt=''/>
            <div>Edytuj</div>
        </Link>
    )
}

const DeleteAction :Action = <DataModel,>(props :{
    url :string,
    resourceId :string,
    data :DataModel,
    onComplete :() => any
    onError :(error :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const [popup, setPopup] = useState<ConfirmDefinition>();

    const doDelete = () => {
        ctx.fetch(`${ctx.url}/${props.url}/${props.resourceId}`, 'DELETE').then((_) => {
            props.onComplete()
        }).catch((e) => {
            props.onError(e);
        });
    }

    const onDelete = () => {
        setPopup({
            title: `Usuwanie ${props.resourceId}`,
            displayText: `Zamierzasz usunąć "${props.resourceId}". Tej akcji nie można cofnąć. Kontynuować?`,
            onConfirm: () => {
                setPopup(undefined);
                doDelete();
            },
            onDeny: () => {
                setPopup(undefined)
            }
        })
    }

    return(
        <>
            {
                popup && 
                <Portal node={ document.querySelector('#popup-container') }>
                    <Confirm def={popup}/>
                </Portal>
            }
            <button className="action-button box list-box" onClick={() => { onDelete() }}>
                <img src='/icons/delete.png' alt=''/>
                <div>Usuń</div>
            </button>
        </>
    )
}

const RelAddAction = <DataModel, RelModel extends {
    id :number,
    name :string
}>(props :{
    relName :string,
    relDisplay :string,
    relUrl :string,
    relKey :string,
    url :string,
    resourceId :string,
    data :DataModel,
    onComplete :() => any
    onError :(error :Error) => any,
}) => {
    const ctx = useContext(ApiContext);

    const [open, setOpen] = useState<boolean>(false);
    const [rels, setRels] = useState<RelModel[]>();

    const relSelect = useRef<HTMLSelectElement>(null);

    const onOpen = () => {
        if(!open && !rels) {
            ctx.fetch(`${ctx.url}/${props.relUrl}`).then((v) => {
                setRels(v);
                setOpen(true);
            }).catch((e) => {
                props.onError(e);
            })
        } else {
            setOpen(!open);
        }
    }

    const onRelAdd = () => {
        let body :{
            [key :string] :any
        } = {};
        let val = Number.parseInt(relSelect.current?.value!)

        if(!val) return;

        body[`${props.relName}_id`] = val;

        ctx.fetch(`${ctx.url}/${props.url}/${props.resourceId}/${props.relUrl}`, 'POST', JSON.stringify(body)).then(() => {
            props.onComplete()
        }).catch((e) => {
            props.onError(e)
        })
    }
    
    return(
        <div className="action-container rel-container box list-box">
            <div className="action-container-inner">
                <img src={`/icons/${props.relName}.png`} alt=''/>
                <div>{props.relDisplay}</div>
                <div style={{margin:'auto'}}/>
                <button className="grad-button" onClick={() => {onOpen();}}>{open ? 'Zamknij' : 'Rozwiń'}</button>
            </div>
            {
                open && rels &&
                <div className="rel-form">
                    <select className="rel-select" ref={relSelect}>
                        {
                            rels.filter((v) => {
                                let a :RelModel[] = (props.data[props.relKey as keyof typeof props.data] as RelModel[]);
                                return !a.some((elem) => elem.id === v.id);
                            }).map((v,i) => 
                                <option key={i} value={v.id}>{v.name}</option>
                            )
                        }
                    </select>
                    <button className="grad-button" onClick={() => {onRelAdd()}}>Dodaj</button>
                </div>
            }
        </div>
    )
}

export interface ActionDef {
    action :Action,
    onCompletePopup :string,
    then? :'exit' | 'refresh'
}

export const Edit :ActionDef = {
    action: EditAction,
    onCompletePopup: 'Zapisano.'
}

export const Delete :ActionDef = {
    action: DeleteAction,
    onCompletePopup: 'Usunięto.',
    then: 'exit'
}

export const RelAdd = (
    relUrl :string,
    relName :string,
    relDisplay :string,
    relKey :string
) :ActionDef => {
    return {
        action: <DataModel,>(props :{
            url :string,
            resourceId :string,
            data :DataModel,
            onComplete :() => any
            onError :(error :Error) => any
        }) => {
            return <RelAddAction {...props} relName={relName} relKey={relKey} relUrl={relUrl} relDisplay={relDisplay}/>
        },
        onCompletePopup: 'Dodano.',
        then: 'refresh'
    }
}