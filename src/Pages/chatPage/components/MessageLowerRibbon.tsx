import React from 'react'

import Diamond from '../../../assets/images/diamond.svg'
import Sparkle from '../../../assets/images/sparkles.gif'

// import Diamond from '../../assets/images/diamond.svg'
// import Sparkle from '../../assets/images/sparkles.gif'


const MessageLowerRibbon = () => {
  return (
    <div className="MessageLowerRibbonDiv">
        <img className='leftDiamond' src={Diamond} alt="Bottom diamond" />
        <img className='rightSparkle' src={Sparkle} alt="Bottom diamond" />
    </div>
  )
}

export default MessageLowerRibbon