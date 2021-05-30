import React, { MouseEvent } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import Form from "./Form"

interface State
{
    
    popup: boolean

}

class NewVideo extends React.Component<RouteComponentProps, State>
{

    public state: State =
    {
        popup: false
    }


    private showPopup(): void
    {
        this.setState({ popup: true })
    }

    private hidePopup(): void
    {
        this.setState({ popup: false })
    }

    private stopPropagation(e: MouseEvent): void
    {
        e.stopPropagation()
    }


    private async createSession(id: string): Promise<void>
    {

    }

    private joinSession(code: string): void
    {
        this.props.history.push(`/video?id=${code}`)
    }


    public render(): React.ReactElement
    {
        let popup = this.state.popup

        return (
            <div className="thumbnail">
                <div className="new" onMouseDown={this.showPopup.bind(this)}>
                    <div className="plus"></div>
                </div>
                <div
                    className={"background" + (popup ? "" : " hidden")}
                    onMouseDown={this.hidePopup.bind(this)}
                >
                    <div
                        className={"popup" + (popup ? "" : " popup-hidden")}
                        onMouseDown={this.stopPropagation.bind(this)}
                    >
                        <h2>WATCH A VIDEO</h2>
                        <Form
                            title="Create session"
                            placeholder="Video ID"
                            onSubmit={this.createSession.bind(this)}
                        />
                        <Form
                            title="Join through code"
                            placeholder="Code"
                            onSubmit={this.joinSession.bind(this)}
                        />
                        <span className="info">Create a new video session by entering a YouTube video ID, or join through the code displayed in the bottom-left corner of the client.</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(NewVideo)
