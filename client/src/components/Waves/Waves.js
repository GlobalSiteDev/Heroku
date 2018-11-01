import React from 'react';
import TopWave from '../../assets/images/wave-top.png';
import MiddleWave from '../../assets/images/wave-mid.png';
import BottomWave from '../../assets/images/wave-bot.png';
import styles from './Waves.module.css';

const waves = () => (
    <div className={[styles.waveWrapper, styles.waveAnimation].join(' ')}>
        <div className={[styles.waveWrapperInner, styles.bgTop].join(' ')}>
            <div className={[styles.wave, styles.waveTop].join(' ')}>
                <img src={TopWave} alt="wave" />
            </div>
        </div>
        <div className={[styles.waveWrapperInner, styles.bgMiddle].join(' ')}>
            <div className={[styles.wave, styles.waveMiddle].join(' ')}>
            <img src={MiddleWave} alt="wave" />
            </div>
        </div>
        <div className={[styles.waveWrapperInner, styles.bgBottom].join(' ')}>
            <div className={[styles.wave, styles.waveBottom].join(' ')}>
            <img src={BottomWave} alt="wave" />
            </div>
        </div>
    </div>
)

export default waves;
