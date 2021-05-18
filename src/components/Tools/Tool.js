import './Tool.css'
import Oscillator from './Oscillator'
import Noise from './Noise'
import Drums from './Drums'
import Microphone from './Microphone'
import Sampler from './Sampler'
import Player from './Player'
import Sequencer from './Sequencer'
import Synth from './Synth'
import MIDI from './MIDI'
import MySounds from './MySounds'
import * as Tone from "tone";

function Init() {
  Tone.context.dispose()
  Tone.setContext(new AudioContext())
}

export default function Tool(props) {

  const name = props.name;

  Init()

  console.log('Instrument set: ' + name)

  switch (name) {
    case 'Oscillator':
      return (
        <Oscillator name={name} />
      );
    case 'Noise':
      return (
        <Noise name={name} />
      );
    case 'Drums':
      return (
        <Drums name={name} />
      );
    case 'Microphone':
      return (
        <Microphone name={name} />
      );
    case 'Sampler':
      return (
        <Sampler name={name} />
      );
    case 'Player':
      return (
        <Player name={name} />
      );
    case 'Sequencer':
      return (
        <Sequencer name={name} />
      );
    case 'MIDI':
      return (
        <MIDI name={name} />
      );
    case 'My sounds':
      return (
        <MySounds name={name} />
      );
    default:
      return (
        <Synth name={name} />
      );
  }
}
