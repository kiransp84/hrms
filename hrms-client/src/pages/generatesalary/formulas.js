export const getDaysInMonth = (forYear, forMonth ) => {
    return new Date(forYear, getMonthIndex(forMonth), 0).getDate();
}

export const getMonthIndex = (monthThreeDigitCode) => {
    console.log(monthThreeDigitCode);
    return ['XXX','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].indexOf(monthThreeDigitCode);
    
}

export const calculateActual = ( fullAmount, eligibleDays , forMonth , year ) => {   
    return ( fullAmount / getDaysInMonth(year,forMonth)  ) * eligibleDays  
}