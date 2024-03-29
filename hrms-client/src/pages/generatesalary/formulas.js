export const getDaysInMonth = (forYear, forMonth ) => {
    //return 30 always 
    //return new Date(forYear, getMonthIndex(forMonth), 0).getDate();
    return 30;
}

export const getMonthIndex = (monthThreeDigitCode) => {
    console.log(monthThreeDigitCode);
    return ['XXX','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].indexOf(monthThreeDigitCode);
    
}

export const calculateActual = ( fullAmount, eligibleDays , forMonth , year ) => {   
    return Math.round( (Number(fullAmount) / getDaysInMonth(year,forMonth)) * Number(eligibleDays) );
}