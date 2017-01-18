import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { fromJS } from "immutable";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import * as actions from "../actions/ServiceFormActions";
import Application from "../components/provisionerForm/Application";
import CloudProvider from "../components/provisionerForm/CloudProvider";
import cookie from "react-cookie";
import CreateService from "../components/provisionerForm/CreateService";
import GithubService from "../components/provisionerForm/GithubService";
import Menu from "../components/provisionerForm/Menu";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ProjectName from "../components/provisionerForm/ProjectName";
import RaisedButton from "material-ui/RaisedButton";
import React, { Component, PropTypes } from "react";
import ServiceSummary from "../components/provisionerForm/ServiceSummary";
import SSHKeys from "../components/provisionerForm/SSHKeys";
import FontIcon from "material-ui/FontIcon";
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const provisionFormOptionsApi = require("../api/provisionFormOptionsApi");

const style = {
  button: {
    margin: 12,
  },
  toolbar: {
    margin: "-1em -1em 3em -1em",
  },
  toolbarTitle: {
    marginLeft: "1em"
  }
};

export class ServiceForm extends Component {
  componentWillMount() {
    if (!cookie.load("user_session"))
      browserHistory.push("/login");
  }
  render() {
    if(!this.props.userAppState.get("user_session") && cookie.load("user_session")){
      this.props.actions.setUserSesion(fromJS({"user_session": cookie.load("user_session")
      }));
      this.props.actions.requestRefreshUserSession(fromJS({"authorization": cookie.load("user_session").token
      }));
    }
    return (
      <MuiThemeProvider>
        <div className="small-12 medium-12 large-12 large-centered columns">
          <div className="container">
            <Paper zDepth={4}>
              <Menu userAppState={this.props.userAppState} />
              <div className="card">
                <Toolbar style={style.toolbar}>
                  <ToolbarGroup firstChild>
                    <FontIcon className="icon icon-project"/>
                    <ToolbarTitle
                        style={style.toolbarTitle}
                        text="Create New Project"
                    />
                  </ToolbarGroup>
                  <ToolbarGroup>
                    <ToolbarTitle text="Options" />
                    <ToolbarSeparator />
                    <RaisedButton
                        href={"#"}
                        icon={<FontIcon className="icon icon-edit" />}
                        label={"Edit"}
                        primary
                        style={style.button}
                    />
                    <RaisedButton
                        href={"#"}
                        icon={<FontIcon className="icon icon-deploy" />}
                        label={"Deploy"}
                        primary
                        style={style.button}
                    />
                    <RaisedButton
                        href={"#"}
                        icon={<FontIcon className="icon icon-cloud-download" />}
                        label={"Download"}
                        primary
                        style={style.button}
                    />
                  </ToolbarGroup>
                </Toolbar>
                <ProjectName
                    projectNameAppState={this.props.projectNameAppState}
                    setProjectName={this.props.actions.setProjectName}
                />
                <div className="row">
                  <GithubService
                      repositoryAppState={this.props.repositoryAppState}
                      requestRepositoryAccess={this.props.actions.requestRepositoryAccess}
                      requestUserRepositories={this.props.actions.requestUserRepositories}
                      setIntegracion={this.props.actions.setIntegracion}
                      setRepository={this.props.actions.setRepository}
                      setShowRepositories={this.props.actions.setShowRepositories}
                      userAppState={this.props.userAppState}
                  />
                  <div className="small-12 medium-6 large-6 columns">
                    <Card>
                      <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        actAsExpander={true}
                        showExpandableButton={true}
                      />
                      <CardActions>
                        <FlatButton label="Connect" />
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
            {/* <div className="row">
              <div className="large-10 columns">
                <h1><i className="step fi-clipboard-notes" />
                  {"Create a Service"}
                </h1>
                <ProjectName
                    projectNameAppState={this.props.projectNameAppState}
                    setProjectName={this.props.actions.setProjectName}
                />
                <div className="row">
                  <h2>
                    <i className="step fi-share" />
                    {"Connect Service(s)"}
                  </h2>
                  {(provisionFormOptionsApi.getProvisionFormOptions()[0]) ?
                    provisionFormOptionsApi.getProvisionFormOptions()[0].services.map((value) =>
                      (value.identifier =="github") ?
                        <GithubService
                            key = {value.identifier}
                            repositoryAppState={this.props.repositoryAppState}
                            requestRepositoryAccess={this.props.actions.requestRepositoryAccess}
                            requestUserRepositories={this.props.actions.requestUserRepositories}
                            setIntegracion={this.props.actions.setIntegracion}
                            setRepository={this.props.actions.setRepository}
                            setShowRepositories={this.props.actions.setShowRepositories}
                            userAppState={this.props.userAppState}
                        />
                      :"")
                    :""}
                  <CloudProvider
                      clearCloudProviderSSHKeys={this.props.actions.clearCloudProviderSSHKeys}
                      cloudProviderAppState={this.props.cloudProviderAppState}
                      requestCloudProviderAccess={this.props.actions.requestCloudProviderAccess}
                      setCloudProvider={this.props.actions.setCloudProvider}
                      userAppState={this.props.userAppState}
                  />
                </div>
                <Application
                    applicationAppState={this.props.applicationAppState}
                    applicationsOptions={(provisionFormOptionsApi.getProvisionFormOptions()[0]) ?  provisionFormOptionsApi.getProvisionFormOptions()[0].application :""}
                    setApplication={this.props.actions.setApplication}
                />
                <SSHKeys
                    cloudProviderAppState={this.props.cloudProviderAppState}
                    deleteSSHKey={this.props.actions.deleteSSHKey}
                    enableSSHKey={this.props.actions.enableSSHKey}
                    requestPostCloudProviderSSHKey={this.props.actions.requestPostCloudProviderSSHKey}
                    setSSHKey={this.props.actions.setSSHKey}
                    setSSHKeyContent={this.props.actions.setSSHKeyContent}
                    setSSHKeyTitle={this.props.actions.setSSHKeyTitle}
                    showSSHKey={this.props.actions.showSSHKey}
                    userAppState={this.props.userAppState}
                />
                <CreateService
                    applicationAppState={this.props.applicationAppState}
                    cloudProviderAppState={this.props.cloudProviderAppState}
                    projectNameAppState={this.props.projectNameAppState}
                    repositoryAppState={this.props.repositoryAppState}
                    requestPostUserProject={this.props.actions.requestPostUserProject}
                    userAppState={this.props.userAppState}
                />
              </div>
              <div className="large-2 columns hide-for-small-only hide-for-medium-only">
                <ServiceSummary
                    applicationAppState={this.props.applicationAppState}
                    cloudProviderAppState={this.props.cloudProviderAppState}
                    projectNameAppState={this.props.projectNameAppState}
                    repositoryAppState={this.props.repositoryAppState}
                    requestPostUserProject={this.props.actions.requestPostUserProject}
                    userAppState={this.props.userAppState}
                />
              </div>
            </div> */}
            {/* <div className="row">
              <footer>
                <div className="row">
                  <div className="large-12 large-centered medium-12 medium-centered small-12 small-centered columns">
                    <p className="copyright">
                      {"© 2015, Inc. All rights reserved."}
                    </p>
                  </div>
                </div>
              </footer>
            </div> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

ServiceForm.propTypes = {
  actions: PropTypes.object.isRequired,
  cloudProviderAppState: PropTypes.object.isRequired,
  projectNameAppState: PropTypes.object.isRequired,
  applicationAppState: PropTypes.object.isRequired,
  repositoryAppState: PropTypes.object.isRequired,
  userAppState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cloudProviderAppState: state.cloudProviderAppState,
    projectNameAppState: state.projectNameAppState,
    applicationAppState: state.applicationAppState,
    repositoryAppState: state.repositoryAppState,
    userAppState: state.userAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceForm);
