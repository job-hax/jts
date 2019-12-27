import React from "react";

import DetailedMetricsGroup from "../Containers/DetailedGroupContainer.jsx";
import SummaryMetricsGroup from "../Containers/SummaryGroupContainer.jsx";
import { axiosCaptcha } from "../../../../utils/api/fetch_api.js";
import { METRICS } from "../../../../utils/constants/endpoints.js";

class UniversityMetrics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genericData: [],
      detailedData: [],
      isInitialRequest: "beforeRequest"
    };
  }

  componentDidMount() {
    if (this.props.cookie("get", "jobhax_access_token") != ("" || null)) {
      this.getData();
    }
  }

  getData() {
    if (
      this.props.cookie("get", "jobhax_access_token") != ("" || null) &&
      this.state.isInitialRequest === "beforeRequest"
    ) {
      this.setState({ isInitialRequest: true });
      let config = { method: "GET" };
      const careerServiceParameter =
        this.props.isStudent === null ? "" : "&student=" + this.props.isStudent;
      axiosCaptcha(
        METRICS(
          "aggregated/generic/?public=" +
            this.props.isPublic +
            careerServiceParameter
        ),
        config
      ).then(response => {
        if (response.statusText === "OK") {
          if (response.data.success) {
            this.data = response.data.data;
            this.setState({
              genericData: this.data
            });
          }
        }
      });
      axiosCaptcha(
        METRICS(
          "aggregated/detailed/?public=" +
            this.props.isPublic +
            careerServiceParameter
        ),
        config
      ).then(response => {
        if (response.statusText === "OK") {
          if (response.data.success) {
            this.data = response.data.data;
            this.setState({
              detailedData: this.data,
              isInitialRequest: false
            });
          }
        }
      });
    }
  }

  generateDetailedMetricsGroup() {
    return (
      <div style={{ margin: "20px 0px", minWidth: "fit-content" }}>
        <div>
          <SummaryMetricsGroup
            cookie={this.props.cookie}
            data={this.state.genericData}
          />
        </div>
        <div>
          <DetailedMetricsGroup
            cookie={this.props.cookie}
            data={this.state.detailedData}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "100%",
          width: "fit-content",
          width: "-moz-fit-content",
          overflowY: "hidden"
        }}
      >
        {this.generateDetailedMetricsGroup()}
      </div>
    );
  }
}

export default UniversityMetrics;
