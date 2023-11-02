import React from 'react'

const Description = (props) => {

    const {data,title,icon,unit}=props;

  return (
    <div className="col1"  >

      <div className="title">
        {icon}
        <p style={{display:"inline-block"}}>{title}</p>
      </div>
      <div className="data">
        <h1>{`${data} ${unit} `}</h1>
      </div>
    </div>
  )
}

export default Description
