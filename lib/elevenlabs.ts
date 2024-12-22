export const AVAILABLE_VOICES = [
  { id: "3gsg3cxXyFLcGIfNbM6C", name: "Raju" },
  { id: "90ipbRoKi4CpHXvKVtl0", name: "Anika" },
] as const;

export type VoiceId = typeof AVAILABLE_VOICES[number]['id']; 