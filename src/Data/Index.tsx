import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App/ApiContext";
import {  Link, useNavigate, useSearchParams } from "react-router-dom";
import './Data.css'
import { Loading } from "../App/Loading";
import { LoadingError } from "../App/LoadingError";

const Paginator = (props :{
    page :number,
    data_length :number
}) => {
    return(
        <div className="pagination-container">
            <Link 
                to={`?page=${props.page - 1}`} 
                className={`grad-button ${props.page === 0 && 'disabled'}`}
            >
                &lt;
            </Link>
            <Link 
                to={`?page=${props.page + 1}`} 
                className={`grad-button ${props.data_length < 10 && 'disabled'}`}
            >
                &gt;
            </Link>
        </div>
    )
}

export const Index = <DataModel,> (props :{
    paginate? :boolean,
    name :string,
    title :string,
    url :string,
    BriefDisplay :(props :{
        data :DataModel
    }) => JSX.Element
}) => {
    const ctx = useContext(ApiContext);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    
    const [data, setData] = useState<DataModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>();
    const [error, setError] = useState<Error>();

    let page = Number.parseInt(searchParams.get('page') || '0');
    
    useEffect(() => {
        let url = `${ctx.url}/${props.url}`;

        if(props.paginate) {
            url = `${url}?page=${page}`
        }

        ctx.fetch(url).then((v) => {
            setData(v);
            setLoaded(true);
        }).catch((e) => {
            setError(e);
            setLoaded(true)
        })
    }, [ctx, props.url, props.paginate, page]);

    if(!loaded) return <Loading/>

    if(error) return <LoadingError error={error}/>

    if(loaded && !error)
    return(
        <div className={`index index-${props.name}`}>
            <div className="data-header">
                <div className="title-container">
                    <h1>{props.title}</h1>
                    <Link to='@create' className="grad-button">Utwórz</Link>
                </div>
                <button className="nav-back" onClick={() => {navigate(-1)}}>Powrót</button>
            </div>
            {
                props.paginate &&
                <Paginator page={page} data_length={data.length}/>
            }
            <div className="data-container">
                {
                    data.map((v, i) => 
                        <props.BriefDisplay key={i} data={v}/>
                    )
                }
            </div>
            {
                props.paginate &&
                <Paginator page={page} data_length={data.length}/>
            }
        </div>
    )
}