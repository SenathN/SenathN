import React from 'react'

const Footer :React.FC<{patternColor? :string, className? :string}> = ({patternColor = 'red', className}) => {
    const styles = {
        backgroundColor: 'transparent',
        opacity: '0.2',
        backgroundImage: 'radial-gradient(red 0.95px, transparent 1.95px)',
        backgroundSize: '35px 35px',
    }

    return (
        <div className={`${className} min-h-[10em] pt-[2em] relative border border-top border-red-300 `}>
            <div className='z-2'>
                <h2 className='text-center' style={{letterSpacing: '1em'}}>Find me.</h2>
            </div>
            <div className='w-full h-full absolute top-0 z-10' style={styles}></div>
        </div>
    )
}

export default Footer