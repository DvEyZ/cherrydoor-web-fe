import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataSchema, DataType } from "../schema";
import { ApiContext } from "../../App/ApiContext";
import { DEFAULT_DISPLAYS, ValueDisplay } from "./ValueDisplay";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorReport } from "../../App/Report/ErrorReport";
import { ActionDef } from "./Action";
import { Report } from "../../App/Report/Report";
import { Loading } from "../../App/Loading";

export const Detail = <DataModel extends {
    id :number,
    [key :string] :any
},> (props :{
    name :string,
    url :string,
    schema :DataSchema,
    displays? :{
        typeDisplays? :{
            [key in DataType] :ValueDisplay | undefined
        },
        fieldDisplays? :{
            [key :string] :ValueDisplay | undefined
        }
    },
    actions? :ActionDef[]
}) => {
    const { resourceId } = useParams();
    const ctx = useContext(ApiContext);
    const navigate = useNavigate();

    const [data, setData] = useState<DataModel>();
    const [loaded, setLoaded] = useState<boolean>();
    const [fatal, setFatal] = useState<Error>();    // fatal is an error which makes data rendering impossible
    const [error, setError] = useState<Error>();
    const [popup, setPopup] = useState<string>();

    const fetchData = useCallback(() => {
        ctx.fetch(`${ctx.url}/${props.url}/${resourceId}`).then((v) => {
            setData(v);
            setLoaded(true);
        }).catch((e) => {
            setFatal(e);
            setLoaded(true);
        })
    }, [ctx, props.url, resourceId])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if(!loaded) return <Loading/>;

    if(loaded && !fatal)
    return(
        <div>
            {
                popup &&
                <Report content={popup} onClose={() => {setPopup(undefined)}}/>
            }
            {
                error &&
                <ErrorReport error={error} onClose={() => {setError(undefined)}} />
            }
            <div className={`detail detail-${props.name}`}>
                <div className="data-header">
                    <h1>{resourceId}</h1>
                    <button className="nav-back" onClick={() => {navigate(-1)}}>Powrót</button>
                </div>
                <div className="detail-body">
                    <div className="data">
                        {
                            Object.values(props.schema.data).map((v,i) => {
                                if(v.hidden) return '';

                                let fd = props.displays?.fieldDisplays;
                                let Fd = fd && fd[v.name];
                                let Disp :ValueDisplay | undefined = undefined; 

                                if(Fd) {
                                    Disp = Fd;
                                } else {
                                    let td = props.displays?.typeDisplays;
                                    let Td = td && td[v.type];
                                    if(Td) {
                                        Disp = Td
                                    } else {
                                        let Defd = DEFAULT_DISPLAYS[v.type];
                                        if(Defd) {
                                            Disp = Defd;
                                        }
                                    }
                                };

                                if(Disp) {
                                    return <Disp 
                                        resourceId={resourceId!} key={i} field={v.displayName} value={data![v.name]!}
                                        refresh={() => { fetchData() }} back={() => { navigate(-1) }}
                                        onError={(e) => {setError(e)}}    
                                    />
                                }

                                return '';
                            })
                        }
                    </div>
                    <div className="detail-break"></div>
                    <div>
                        <div className="actions">
                            {
                                data && props.actions && props.actions.map((V, i) => 
                                    <V.action key={i} url={props.url} data={data} resourceId={resourceId!} onError={(e) => {
                                        setError(e);
                                    }} onComplete={() => {
                                        if(V.then) {
                                            if(V.then === 'refresh') {
                                                fetchData();
                                            } 
                                            else if(V.then === 'exit') {
                                                navigate(-1);
                                            }
                                        }
                                    }}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}