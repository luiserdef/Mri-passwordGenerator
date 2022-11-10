import { useState, useEffect, useRef } from 'react'
import soundOn from '../assets/images/volume.svg'
import soundOf from '../assets/images/mute.svg'

function Sound ({ passwordStrengthData, passwordGeneratedToggle }) {
  const [isSoundActive, setIsSoundActive] = useState(true)
  const soundBT = isSoundActive ? 'bg-[#5d8899]' : 'bg-[#995d5db0]'
  const soundImg = isSoundActive ? soundOn : soundOf
  const audioRef = useRef()
  const audiosrcRef = useRef()

  function handleSound () {
    setIsSoundActive(lastValue => !lastValue)
  }

  useEffect(() => {
    const actualAudio = audioRef.current.play()
    if (isSoundActive) {
      if (actualAudio !== undefined) {
        actualAudio.then(() => {
          audioRef.current.load()
          audioRef.current.play()
        }).catch(error => {
          console.log('Waiting a click! ' + error)
        })
      }
    } else {
      if (actualAudio !== undefined) {
        actualAudio.then(() => {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }).catch(error => {
          console.log('Ups! ' + error)
        })
      }
    }
  }, [isSoundActive])
  useEffect(() => {
    if (isSoundActive) {
      const actualAudio = audioRef.current.play()
      actualAudio.then(() => {
        audioRef.current.pause()
        audioRef.current.load()
        audioRef.current.play()
      }).catch(error => {
        console.log('Waiting a click! ' + error)
      })
    }
  }, [passwordGeneratedToggle])
  return (
    <div
      onClick={handleSound}
      style={{ backgroundImage: `url('${soundImg}')` }}
      className={`${soundBT} luiserdef-bt-sound bg-no-repeat bg-center bg-[length:25px] cursor-pointer absolute rounded-full h-10 w-10 top-10 right-[-20px]`}
    >
      <audio ref={audioRef}>
        <source ref={audiosrcRef} src={passwordStrengthData.sound} />
      </audio>
    </div>
  )
}
export default Sound
