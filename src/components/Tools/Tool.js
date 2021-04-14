import './Tool.css'
import { Oscillator, Noise, Player, Microphone, Synth, Sampler, Sequencer } from "./ToolsData"

export default function Tool(props) {

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
    default:
      return (
        <Synth name={name} />
      );
  }
}
