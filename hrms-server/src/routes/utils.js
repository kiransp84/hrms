const findMissingOnes = ( {srcArray , targetArray } ) => {  
    const missing = srcArray.filter(src => !targetArray.find( (e)=> e === src )  );
    return missing.size === 0 ? undefined : missing
  };

  module.exports = {
    findMissingOnes
  }
  