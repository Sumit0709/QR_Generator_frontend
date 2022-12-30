export const getQR = (errorCorrectionLevel,dark, light, type, margin, width, url) => {

    margin = margin.toString();
    width = width.toString();

    const finalURL = "http://localhost:8000/base_url/createqr"
    console.log(finalURL);

    return fetch(finalURL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"   
        },
        body: JSON.stringify({
            errorCorrectionLevel,
            dark,
            light, 
            type, 
            margin, 
            width, 
            url
        })
    })
    .then(response => {

        if(!response.ok){
            
            return false;
        }
        else{
            // console.log("response file" + response)
            return response.blob();
        }
    })
    .then(blob => {
        if(blob){
            console.log("BLOB = "+blob);
            const objectURL = URL.createObjectURL(blob);
            console.log("objectURL= "+objectURL);
            return objectURL;
        }
        return "error";
    })
    .catch(err => console.log(err));

}