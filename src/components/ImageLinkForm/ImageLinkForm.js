import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm =({onInputChange,onButtonSubmit}) =>{
    return( 
        <div>
            <p>.....</p>
            <div className='center'>
                <div className ='center form pa4 br3 shadow-5'>
                <input type="text" placeholder="Enter" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib bg-light-purple" onClick={onButtonSubmit}  > 
                Detect</button>
            </div>
           
        
        </div>   
         

        </div>


    );
}

/*onChange={handleDetect}*onClick={handleClick}onInput={handleInput}*/

export default ImageLinkForm;