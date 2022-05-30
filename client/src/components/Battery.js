import React from "react";

function Battery(prop) {
  let batlvl = prop.batlvl
  let device = prop.device
  // batlvl = 40
  let btnStyle = {
    'background': 'orange',
    'width': "calc(" + batlvl + "% * 0.73)"
  };
  if (batlvl >= 80) {
    btnStyle.background = 'DarkGreen'
  } else if (batlvl < 80 && batlvl > 50) {
    btnStyle.background = 'DarkSeaGreen'
  } else if (batlvl < 25) {
    btnStyle.background = 'red'
  }else{
    btnStyle.background = 'orange'
  }
  return (
    <div>
      {/* <i class="fa fa-battery-empty font-20px fa-battery-filling" aria-hidden="true">
        <span id="result" style="width:calc(10% * 0.73)"></span>
      </i> */}
      Fitbit {device}
      <i className="fa fa-battery-empty font-50px fa-battery-filling" aria-hidden="true">
        <span className="font-20px" style={btnStyle} >{batlvl} </span>
      </i>

      {/* <i class="fa fa-battery-empty font-70px fa-battery-filling" aria-hidden="true">
        <span id="result3" style="width:calc(10% * 0.73)"></span>
      </i> */}
    </div>
  )
}
export default Battery;