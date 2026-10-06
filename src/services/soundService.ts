/**
 * Sound synthesis service using Web Audio API
 * Provides soothing Tibetan bowl chime, gentle tactile bell, and ambient white/pink rain tone.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Resonant Tibetan singing bowl chime
   */
  public playTibetanBowl(fundamental: number = 216) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonics for a singing bowl: fundamental, 2.76x, 5.4x, 8.9x
    const harmonics = [
      { freq: fundamental, gain: 0.45, decay: 4.8 },
      { freq: fundamental * 2.76, gain: 0.22, decay: 3.6 },
      { freq: fundamental * 5.4, gain: 0.12, decay: 2.4 },
      { freq: fundamental * 8.9, gain: 0.05, decay: 1.5 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Micro vibrato for natural warmth
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(3.2, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + decay);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  /**
   * Soft water drop or gentle breath transition chime
   */
  public playSoftChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now); // Solfeggio 528Hz Love/Healing frequency
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  /**
   * Toggle gentle rain / forest stream ambient noise
   */
  public toggleAmbientRain(): boolean {
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbientRain();
      return false;
    }

    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink / warm rain noise generator
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter for gentle mist/rain sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.ambientSource = noise;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopAmbientRain() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          (this.ambientSource as AudioBufferSourceNode)?.stop();
          this.ambientSource = null;
        } catch {
          // ignore
        }
      }, 900);
    }
    this.isAmbientPlaying = false;
  }
}

export const soundService = new SoundService();
