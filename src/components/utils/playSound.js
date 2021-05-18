import * as Tone from 'tone'

export default function playSound(instrument, data, effects) {
    const reverb = new Tone.Reverb().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    switch (instrument) {
        case 'oscillator': {
            const oscillator = new Tone.Oscillator().toDestination()
            oscillator.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            oscillator.connect(pingPong)
            oscillator.connect(reverb)
            oscillator.start()
            oscillator.stop('+0.5')
            break
        }
        case 'noise': {
            const noise = new Tone.Noise().toDestination()
            noise.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            noise.connect(pingPong)
            noise.connect(reverb)
            noise.start()
            noise.stop('+2')
            break
        }
        case 'kick': {
            const drum = new Tone.MembraneSynth().toDestination()
            drum.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            drum.connect(pingPong)
            drum.connect(reverb)
            drum.triggerAttackRelease('C1', '6n')
            break
        }
        case 'cymbal': {
            const drum = new Tone.MetalSynth().toDestination()
            drum.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            drum.connect(pingPong)
            drum.connect(reverb)
            drum.triggerAttackRelease('C1', '6n')
            break
        }
        case 'synth':
            const synth = new Tone.Synth().toDestination();
            synth.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            synth.connect(pingPong)
            synth.connect(reverb)
            synth.triggerAttackRelease('C4', '6n')
            break
        case 'monosynth':
            const monosynth = new Tone.MonoSynth().toDestination();
            monosynth.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            monosynth.connect(pingPong)
            monosynth.connect(reverb)
            monosynth.triggerAttackRelease('C4', '6n')
            break;
        case 'fmsynth':
            const fmsynth = new Tone.Synth().toDestination();
            fmsynth.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            fmsynth.connect(pingPong)
            fmsynth.connect(reverb)
            fmsynth.triggerAttackRelease('C4', '6n')
            break;
        case 'amsynth':
            const amsynth = new Tone.Synth().toDestination();
            amsynth.set(data)
            reverb.set(effects[0]['reverb'])
            pingPong.set(effects[1]['pingPong'])
            amsynth.connect(pingPong)
            amsynth.connect(reverb)
            amsynth.triggerAttackRelease('C4', '6n')
            break;
        default:
    }
}