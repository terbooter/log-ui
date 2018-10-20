import {Component, SyntheticEvent} from "react";
import * as React from "react";
import "./Filter.css";
import * as classNames from "classnames";
import {Model} from "../../model/Model";
import {observer} from "mobx-react";
import {FilterParams} from "../../model/FilterParams";

interface Properties {
    model: Model
}

export interface FilterState {
    text: string;
    campusId: number;
    programId: number;
}

@observer
export class Filter extends Component<Properties, FilterState> {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            campusId: 0,
            programId: 0
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onHostChange = this.onHostChange.bind(this);
        this.onContainerChanged = this.onContainerChanged.bind(this);
        this.onGate = this.onGate.bind(this);
    }

    public async componentDidMount() {
        // this.props.gate.addListener(this.onGate);
        this.props.model.loadHosts();
        this.props.model.loadContainers();
    }

    public async componentWillUnmount() {
        // this.props.gate.removeListener(this.onGate);
    }

    private onGate(data) {
        if (data.majors) {
            this.setState({programId: 0});
        }
    }

    private onChange(e: SyntheticEvent<any>) {
        let target = e.target as HTMLInputElement;
        const {name, value} = target;
        //console.log(`${name} - ${value}`);
        let entry = {};
        entry[target.name] = target.value;
        this.setState(entry);
        /*let filterParams: FilterParameters = {
            selectedClient: this.state.selectedClient,
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        };*/


        /*let filterParams: FilterParameters = {
            ...this.state
        };*/

        //filterParams[target.name] = target.value;

        // this.props.onChange(filterParams);

    }

    private onHostChange(event) {
        let campusId = parseInt(event.target.value);
        this.setState({campusId: campusId});

    }

    private onContainerChanged(event) {
        this.setState({programId: parseInt(event.target.value)});
    }

    private onKeyPress(e) {
        if (e.key === "Enter") {
            this.onClick();
        }
    }

    private onClick() {
        console.log("click");
        let filter: FilterParams = {
            container: "all",
            host: "all",
            text: "local"
        };

        this.props.model.loadLogs(filter)
    }

    public render() {
        let options = this.props.model.hosts.map((item: any, index) => {
            return <option key={index} value={item}>{item}</option>;
        });

        let containerOptions = this.props.model.containers.map((item: any, index) => {
            return <option key={index} value={item}>{item}</option>;
        });
        return (
            <div>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="">Hosts</label>
                        <select name=""
                                className="form-control"
                                disabled={this.props.model.isLoading}
                                onChange={this.onHostChange}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="">Containers</label>
                        <select name=""
                                value={this.state.programId}
                                id="major-dropdown"
                                className="form-control"
                                disabled={this.props.model.isLoading}
                                onChange={this.onContainerChanged}
                        >
                            {containerOptions}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label>Text</label>
                        <input type="text" name="text"
                               className="form-control"
                               onChange={this.onChange.bind(this)}
                               onKeyPress={this.onKeyPress}
                               disabled={this.props.model.isLoading}
                               value={this.state.text}
                        />
                    </div>
                    <div className="col-md-1 d-flex flex-column">
                        <button type="button"
                                onClick={this.onClick.bind(this)}
                                className={classNames(
                                    "btn btn-primary form-control mt-auto button",
                                    {disabled: this.props.model.isLoading}
                                )}>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}