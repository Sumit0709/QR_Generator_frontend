import React , {useState} from 'react'
import { getQR } from './api';

let defaulturl = new URL("../img/default.png",import.meta.url);
let errorurl = new URL("../img/error.png",import.meta.url);
const baseURL = "../../qr_img";
const  App = () => {
  
  const [values, setValues] = useState({
    erl: "M",
    dc: "#000000",
    lc: "#FFFFFF",
    ft: "jpeg",
    m: 3,
    w: 500,
    url: "",
    divUrl: defaulturl,
    success: true,
    error: ""
  });

  const {erl, dc, lc, ft, m, w, url,divUrl, success, error} = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:false});

    getQR(erl,dc,lc,ft,m,w,url)
    .then(data=>{
      if(data){
        console.log(data);
        if(data === "error"){
            setValues({
              ...values,
              error: true,
              success: false
            })
        }else{
          setValues({
            ...values,
            divUrl: data,
            error: false,
            success: true
          })
          console.log("ACCEPTED");
        }
      }
      else{
        setValues({
          ...values,
          error: true,
          success: false
        })
      }
    })
    .catch(err => console.log("FAILED"));

  }
  
  const handleChange = (name) => (event) => {
    setValues({...values, error:false, success: true, [name]:event.target.value})
  }

  const myForm = () => {
    return (
      <form className="col-6">
      <div className="form-group">
        <label htmlFor="erl">Error Correction Level</label>
        {/* <input onChange = {handleChange("erl")} value={erl} type="text" className="form-control" id="erl" placeholder="L / M / Q / H"/> */}
        <select onChange = {handleChange("erl")} className="form-control" id="erl">
          <option>Low</option>
          <option>Medium</option>
          <option>Quartile</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="dc">Dark Color</label>
        <input onChange = {handleChange("dc")} type="text" className="form-control" value={dc} id="dc" placeholder="Enter HEX value of dark color"/>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="lc">Light Color</label>
        <input onChange = {handleChange("lc")} type="text" className="form-control" value={lc} id="lc" placeholder="Enter HEX value of light color"/>
      </div>
      <div className="form-group mt-4">
        <label htmlFor="ft">File Type</label>
        {/* <input onChange = {handleChange("ft")} type="text" className="form-control" value={ft} id="ft" placeholder="png/jpeg"/> */}
        <select onChange = {handleChange("ft")} className="form-control" id="ft">
          <option>jpeg</option>
          <option>png</option>
        </select>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="m">Margin</label>
        <input onChange = {handleChange("m")} type="number" className="form-control" value={m} id="m" placeholder="Enter numerical value for margin"/>
      </div>
      <div className="form-group mt-4">
        <label htmlFor="w">Width</label>
        <input onChange = {handleChange("w")} type="number" className="form-control" value={w} id="w" placeholder="Enter numerical value for width"/>
      </div>
      <div className="form-group mt-4">
        <label htmlFor="url">URL</label>
        <input onChange = {handleChange("url")} type="text" className="form-control" value={url} id="url" placeholder="Enter URL to encode in QR Code"/>
      </div>


      <div className="form-group mt-4 text-center">
        <button onClick={onSubmit} className="btn btn-success">Generate QR Code</button>
      </div>
    </form>
    )
  }

  const myQR = () => {

    return (
      <div className='col-6'>
        <h3 className="m-auto text-center">Your QR will appear here</h3>
        {success&&<div className="m-auto mt-3" style={{backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' ,"height":'500px', "width":"500px", "backgroundImage":`url("${divUrl}")`}}>
        </div>}
        {error && <div className="m-auto mt-3" style={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' ,"height":'500px', "width":"500px", "backgroundImage":`url("${errorurl}")`}}>
        </div>}
      </div>
    )

  }

  return (
    <div className="container p-4">
    <div className="row pt-4" >
      {myForm()}
      {myQR()}
    </div>   
    </div>
  )
}

export default App;
