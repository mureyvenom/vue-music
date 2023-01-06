import { defineStore } from 'pinia';
import type { StoredSong } from '@/utils/types';
import { Howl } from 'howler';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    playing: false,
    currentSong: {} as StoredSong,
    sound: {} as Howl,
    duration: 0,
    currentPosition: 0,
    progressBar: '0%',
  }),
  actions: {
    async newSong(song: StoredSong) {
      if (song.docId === this.currentSong.docId) {
        this.togglePlay();
        return;
      }
      if (this.currentSong.docId) {
        this.sound.stop();
      }
      this.currentSong = song;
      const sound = new Howl({
        src: song.url,
        html5: true,
        onend: () => {
          this.playing = false;
          this.sound.seek(0);
        },
        onload: () => {
          this.duration = this.sound.duration();
        },
        onplay: () => {
          requestAnimationFrame(this.progress);
        },
      });
      this.sound = sound;
      this.sound.play();
      this.playing = true;
    },
    togglePlay() {
      if (this.playing) {
        this.sound.pause();
        this.playing = false;
      } else {
        this.sound.play();
        this.playing = true;
      }
    },
    progress() {
      this.currentPosition = this.sound.seek();
      this.progressBar = `${(this.currentPosition / this.duration) * 100}%`;
      if (this.playing) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event: MouseEvent) {
      if (!this.currentSong?.docId) {
        return;
      }
      const { x, width } = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;
      this.sound.seek(seconds);
      this.currentPosition = seconds;
      requestAnimationFrame(this.progress);
    },
  },
});
