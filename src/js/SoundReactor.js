class SoundReactor {

    constructor() {
        this.ctx
        this.audio
        this.audioSource
        this.analyser
        this.fdata
        this.isPlaying = false;

        this.bind()
    }

    init() {
        if (!this.isPlaying) {
            this.ctx = new AudioContext();
            this.audio = document.querySelector('#audio');
            this.audioSource = this.ctx.createMediaElementSource(this.audio);
            this.analyser = this.ctx.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.8

            this.audioSource.connect(this.analyser);
            this.audioSource.connect(this.ctx.destination);
            this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
            this.audio.currentTime = 200;
            this.audio.play()
            this.isPlaying = true
        }
    }

    update() {
        this.analyser.getByteFrequencyData(this.fdata);

    }

    bind() {
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)

        document.addEventListener('click', this.init)
    }

}

export { SoundReactor as default }