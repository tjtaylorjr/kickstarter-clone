import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DiscoverPage = () => {

    const [queryResult, setqueryResult] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/projects/search/${query}`);
            const json = await res.json();
            setqueryResult(json.projects);
        })()
    }, [])

    
    // a and b are javascript Date objects
    function dateDiffInDays(date_goal) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const a = new Date();
        const b = new Date(date_goal);
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    return queryResult.length ? (
        <ul className='query-results'>
            <li className='query-results__li'>
                <div>img goes here</div>
                <div className='query-results__li-main'>
                    <div className='query-results__title'>{queryResult[0].title}</div>
                    <div>{queryResult[0].description}</div>
                    <div>{queryResult[0].user.username}</div>
                </div>
                <div className='query-results__li-details'>
                    <div>{queryResult[0].balance}</div>
                    <div>{Math.floor(queryResult[0].balance / queryResult[0].funding_goal * 100)}% funded</div>
                    <div className='query-results__title'>{dateDiffInDays(queryResult[0].date_goal) /* use date obj stuff*/} days to go</div>
                </div>
            </li>
        </ul>
    ) : <div>Loading...</div>
}

export default DiscoverPage;