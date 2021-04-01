const TONES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = ['2','3', '4', '5','6'];

export default OCTAVES.reduce((notes, octave) => {
  const notesInOctave = TONES.map(tone => `${tone}${octave}`);
  return [...notes, ...notesInOctave];
}, []);