import React , {useState} from 'react';

import {AlertPanel} from '../../../components/common/alerts/AlertPanel';

import FilterPanel from '../panels/FilterPanel';
import DetailsPanel from '../panels/DetailsPanel';


export default () => {
    const [shouldDisplay,setShouldDisplay] = useState(false);
    const [filter,setFilter] = useState('');
    const [message,setMessage] = useState('');
    const fetchDetails = ( filter ) => {
        setFilter(filter);
        setShouldDisplay(true);
    }

    const clear=() =>{
        setShouldDisplay(false);
    }

    const afterSaveFn=(message) =>{
        clear();
        setMessage(message);
    }


    return (<>
        <FilterPanel fetchDetails={fetchDetails} clearDetails={clear} />
        {shouldDisplay ? (<><DetailsPanel masterType={filter}  afterSaveFn={afterSaveFn} /></>) : null }
        {message ? (<AlertPanel message={message} />) : null }
        </>
    );
}

