import React from 'react';
const RenderDownloadLink = ({response,fileName,fileExt,linkName}) =>{
    return (<a href={window.URL.createObjectURL(response.data)} download={`${fileName}.${fileExt}`}>{linkName}</a> )
}

export default RenderDownloadLink;