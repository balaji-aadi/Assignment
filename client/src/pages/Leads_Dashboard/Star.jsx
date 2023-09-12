import React from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

const Star = ({stars}) => {
    const ratingStar = Array.from({length : 5}, (elem,index) => {
        return (
            <span key={index}>
                {
                  stars >= index + 1 ? (<StarIcon/>) : (<StarOutlineIcon/>) 
                }
            </span>
        )
    })
  return (
    <div>
      <div style={{color: "yellow"}}>
        {ratingStar}
      </div>
    </div>
  )
}

export default Star
