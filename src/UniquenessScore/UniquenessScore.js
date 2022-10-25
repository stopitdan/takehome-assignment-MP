import { useState, useRef } from 'react';
import chroma from 'chroma-js';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import { Info } from '@mui/icons-material';
import './UniquenessScore.css'

const colorScale = chroma.scale(['red', 'gold', 'yellowgreen', 'green', 'green']); // 2 greens at end since uniqueness never really reaches 100, so it would never be suoper green

const UniquenessScore = ({ score }) => {
  const [hoveringInfo, setHoveringInfo] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveringInfo(true)
    }, 1000);
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHoveringInfo(false)
  }

  const handleClick = () => {
    setHoveringInfo(!hoveringInfo);
  }

  if (!score) return null;
  return (
    <div className="uniqueness-wrapper">
      <div className="uniqueness-title" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Overall Uniqueness Score
        <Info onClick={handleClick} className="uniqueness-help-icon" />
        <MouseTooltip offsetX={12} offsetY={-30}>
          <div className={`uniqueness-info-box ${hoveringInfo ? 'showing' : ''}`}>
            Color is determined by Overall Uniqueness
            <div className="color-gradient-box"><span>0</span><span>100</span></div>
          </div>
        </MouseTooltip>
      </div>
      <div className="uniqueness-score" style={{ color: `${colorScale(score/100)}` }}>{score}</div>
    </div>
  )
}

export default UniquenessScore;
