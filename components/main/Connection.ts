import type { Socket } from "socket.io-client"

export default class Connection
{

    public constructor(private socket: Socket, private player: YT.Player, private initial: boolean)
    {
        socket.on("play", this.play.bind(this))
        socket.on("pause", this.pause.bind(this))

        player.addEventListener("onStateChange", this.stateChange.bind(this))
    }


    private play(time: number): void
    {
        this.ignore = true

        this.player.seekTo(time, true)
        this.player.playVideo()
    }

    private pause(time: number): void
    {
        this.ignore = true

        this.player.pauseVideo() // It's really important this is first for some reason
        this.player.seekTo(time, true)
    }


    private ignore = true

    private stateChange(event: YT.OnStateChangeEvent): void
    {
        let time = this.player.getCurrentTime()
        switch (event.data)
        {
            case YT.PlayerState.PLAYING:
            {
                if (this.initial) // Initially pause video
                {
                    this.player.pauseVideo()
                    this.player.setVolume(100)

                    this.initial = false
                    return
                }
                
                if (!this.ignore) this.socket.emit("play", time)
                break
            }

            case YT.PlayerState.PAUSED:
            {
                if (!this.ignore) this.socket.emit("pause", time)
                break
            }

            default: return
        }

        this.ignore = false
    }


    public disconnect(): void
    {
        // Disconnect from session
        this.socket.disconnect()
    }
    
}
