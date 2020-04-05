import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {
    state = {
        value: "",
        loading: false,
        errorMessage: ""
    };

    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({ loading: true, errorMessage: "" });
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false, value: "" });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event =>
                            this.setState({ value: event.target.value })
                        }
                    />
                </Form.Field>
                <Message
                    error
                    header="Error!"
                    content={this.state.errorMessage}
                />
                <Button loading={this.state.loading} primary>
                    Contribute
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
