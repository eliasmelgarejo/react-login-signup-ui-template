import React, { Component } from "react";

class home extends Component {
    handleGoDashboard() {
        //window.location.href = "/dashboard";
    }

    render() {
        return (
            <div>
                <h1>WELCOME TO home</h1>

                <a
                    href="javascript:void(0);"
                    onClick={this.handleGoDashboard}
                    className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                    <i className="ti-power-off mR-10"></i>
                    <span style={{ color: "black" }}>Dashboard</span>
                </a>
            </div>
        );
    }
}
export default home;