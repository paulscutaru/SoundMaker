import './Instrument.css'
import { Oscillator, Noise, Player, Microphone, Synth} from "./InstrumentsData"

export default function Instrument(props) {

  const name = props.name;

  switch (name) {
    case 'Oscillator':
      return (
        <Oscillator name={name} />
      );
    case 'Noise':
      return (
        <Noise name={name} />
      );
    case 'Player':
      return (
        <Player name={name} />
      );
    case 'Microphone':
      return (
        <Microphone name={name} />
      );
    default:
      return (
        <Synth name={name} />
      );
  }
}
