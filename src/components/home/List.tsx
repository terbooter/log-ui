import * as React from "react";
import {inject, observer} from "mobx-react";
import {Model} from "../../model/Model";
import * as moment from "moment";
import "./List.css";

interface Props {

}

interface InjectedProps {
    model: Model;
}

@inject("model")
@observer
export class List extends React.Component<Props, {}> {

    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render() {

        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" className="date-column">Date</th>
                    <th scope="col">Message</th>
                </tr>
                </thead>
                <tbody>
                {this.injected.model.logs.map((logItem) => {
                    return (
                        <tr key={logItem._id}>
                            <th scope="row">{moment(logItem.created_at).format("DD-MM-YYYY HH:mm:ss")}</th>
                            <td>{logItem.message}</td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
        )
    }
}