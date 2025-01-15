import React from 'react'

const Footer :React.FC<{patternColor? :string}> = ({patternColor = 'red'}) => {
    const styles = {
        'background-color': 'transparent',
        'opacity': '0.2',
        'background-image': 'radial-gradient(red 1.9500000000000002px, transparent 3.9500000000000002px)',
        'background-size': '25px 25px',
    }

    return (
        <div className='min-h-[10em] pt-[2em] relative border border-top border-red-300 '>
            <div className='z-2'>
                <h2 className='text-center' style={{letterSpacing: '1em'}}>Find me.</h2>
            </div>
            <div className='w-full h-full absolute top-0 z-10' style={styles}></div>
        </div>
    )
}

export default Footer