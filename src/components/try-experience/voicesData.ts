// Exactly 26 unique voice names as specified by user instructions
export const EXACT_26_VOICES = [
  'Aarav', 'Amit', 'Arushi', 'Diya', 'Gargi', 'Kabir', 'Kavita',
  'Neeraj', 'Neha', 'Nila', 'Rahul', 'Rehan', 'Riya', 'Rohan',
  'Sagar', 'SagarM', 'Samar', 'Sana', 'Seema', 'Shailika',
  'Shreeraj', 'Tarini', 'Tripti', 'Vikas', 'Vikram', 'Zara'
] as const;

export type VoiceName = typeof EXACT_26_VOICES[number];

